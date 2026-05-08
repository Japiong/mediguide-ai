const db = require('../db');

const searchAll = async (q) => {
  if (!q || q.trim().length < 1) return { drugs: [], supplements: [] };

  const searchTerm = `%${q.trim().toLowerCase()}%`;

  const drugsResult = await db.query(
    `SELECT id, name, category, description, side_effects, warnings
     FROM drugs
     WHERE LOWER(name) LIKE $1 OR LOWER(category) LIKE $1 OR LOWER(description) LIKE $1
     ORDER BY
       CASE WHEN LOWER(name) LIKE $2 THEN 0 ELSE 1 END,
       name
     LIMIT 20`,
    [searchTerm, `${q.trim().toLowerCase()}%`]
  );

  const supplementsResult = await db.query(
    `SELECT id, name, benefits, warnings
     FROM supplements
     WHERE LOWER(name) LIKE $1 OR LOWER(benefits) LIKE $1
     ORDER BY name
     LIMIT 10`,
    [searchTerm]
  );

  return {
    drugs: drugsResult.rows,
    supplements: supplementsResult.rows,
    total: drugsResult.rows.length + supplementsResult.rows.length
  };
};

module.exports = { searchAll };
