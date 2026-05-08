const request = require('supertest');
const app = require('../index');

// DB availability probe (cached per test run)
let _dbAvailable = null;
const dbAvailable = async () => {
  if (_dbAvailable !== null) return _dbAvailable;
  const res = await request(app).get('/api/drugs?limit=1').catch(() => ({ statusCode: 503 }));
  _dbAvailable = res.statusCode !== 503;
  return _dbAvailable;
};

// Run fn only when DB is up
const withDb = (fn) => async () => {
  if (!(await dbAvailable())) {
    console.warn('    ⚠  No DB – skipping');
    return;
  }
  await fn();
};

describe('MediGuide AI API Tests', () => {

  describe('GET /api/health', () => {
    it('returns OK', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('OK');
      expect(res.body.timestamp).toBeDefined();
    });
  });

  describe('GET /api/search – validation', () => {
    it('400 when no query', async () => {
      const res = await request(app).get('/api/search');
      expect(res.statusCode).toBe(400);
    });
    it('400 when blank query', async () => {
      const res = await request(app).get('/api/search?q=');
      expect(res.statusCode).toBe(400);
    });
    it('returns drug/supplement arrays with DB', withDb(async () => {
      const res = await request(app).get('/api/search?q=ibuprofen');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.drugs)).toBe(true);
      expect(Array.isArray(res.body.supplements)).toBe(true);
    }));
    it('empty arrays for unknown term', withDb(async () => {
      const res = await request(app).get('/api/search?q=xyznotadrug999abc');
      expect(res.statusCode).toBe(200);
      expect(res.body.drugs).toHaveLength(0);
    }));
  });

  describe('GET /api/drugs/:id – validation', () => {
    it('400 for non-numeric id', async () => {
      expect((await request(app).get('/api/drugs/abc')).statusCode).toBe(400);
    });
    it('400 for zero id', async () => {
      expect((await request(app).get('/api/drugs/0')).statusCode).toBe(400);
    });
    it('404 for non-existent id', withDb(async () => {
      expect((await request(app).get('/api/drugs/99999')).statusCode).toBe(404);
    }));
    it('full drug fields for id=1', withDb(async () => {
      const res = await request(app).get('/api/drugs/1');
      expect(res.statusCode).toBe(200);
      ['name','category','description','uses','side_effects'].forEach(f =>
        expect(res.body).toHaveProperty(f)
      );
    }));
  });

  describe('GET /api/supplements', () => {
    it('returns supplement array', withDb(async () => {
      const res = await request(app).get('/api/supplements');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.supplements)).toBe(true);
    }));
  });

  describe('POST /api/interactions/check – validation', () => {
    it('400 when body empty', async () => {
      expect((await request(app).post('/api/interactions/check').send({})).statusCode).toBe(400);
    });
    it('400 when only 1 drug', async () => {
      expect((await request(app).post('/api/interactions/check').send({ drugIds:[1] })).statusCode).toBe(400);
    });
    it('400 when drugIds not array', async () => {
      expect((await request(app).post('/api/interactions/check').send({ drugIds:'bad' })).statusCode).toBe(400);
    });
    it('400 when > 10 drugs', async () => {
      expect((await request(app).post('/api/interactions/check')
        .send({ drugIds:[1,2,3,4,5,6,7,8,9,10,11] })).statusCode).toBe(400);
    });
    it('returns interactions + summary with DB', withDb(async () => {
      const res = await request(app).post('/api/interactions/check').send({ drugIds:[1,2] });
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.interactions)).toBe(true);
      expect(res.body).toHaveProperty('summary');
    }));
  });

  describe('POST /api/ai/chat – validation', () => {
    it('400 when message missing', async () => {
      expect((await request(app).post('/api/ai/chat').send({})).statusCode).toBe(400);
    });
    it('400 when message is whitespace', async () => {
      expect((await request(app).post('/api/ai/chat').send({ message:'   ' })).statusCode).toBe(400);
    });
    it('400 when message exceeds 1000 chars', async () => {
      expect((await request(app).post('/api/ai/chat').send({ message:'a'.repeat(1001) })).statusCode).toBe(400);
    });
  });

  describe('Unknown routes', () => {
    it('404 for undefined endpoint', async () => {
      expect((await request(app).get('/api/doesnotexist')).statusCode).toBe(404);
    });
  });

});
