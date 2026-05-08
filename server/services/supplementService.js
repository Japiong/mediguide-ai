const db = require('../db');

const getAllSupplements = async () => {
  const result = await db.query(
    `SELECT * FROM supplements ORDER BY name`
  );
  return result.rows;
};

const getSupplementById = async (id) => {
  const result = await db.query(
    `SELECT * FROM supplements WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
};

module.exports = { getAllSupplements, getSupplementById };
