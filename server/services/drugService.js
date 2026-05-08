const db = require('../db');

const getDrugById = async (id) => {
  const result = await db.query(
    `SELECT * FROM drugs WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
};

const getAllDrugs = async (limit = 50, offset = 0) => {
  const result = await db.query(
    `SELECT id, name, category, description, warnings
     FROM drugs
     ORDER BY name
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  return result.rows;
};

const getDrugsByCategory = async (category) => {
  const result = await db.query(
    `SELECT id, name, category, description, warnings
     FROM drugs
     WHERE LOWER(category) LIKE $1
     ORDER BY name`,
    [`%${category.toLowerCase()}%`]
  );
  return result.rows;
};

const getCategories = async () => {
  const result = await db.query(
    `SELECT DISTINCT category FROM drugs WHERE category IS NOT NULL ORDER BY category`
  );
  return result.rows.map(r => r.category);
};

module.exports = { getDrugById, getAllDrugs, getDrugsByCategory, getCategories };
