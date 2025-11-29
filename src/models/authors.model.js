const db = require("../config/db");

const columns = "id, name, email, image, created_at, updated_at";

const findAll = async () => {
  const [rows] = await db.query(`SELECT ${columns} FROM authors ORDER BY id DESC`);
  return rows;
};

const findById = async (id) => {
  const [rows] = await db.query(`SELECT ${columns} FROM authors WHERE id = ?`, [id]);
  return rows[0] || null;
};

const findByEmail = async (email) => {
  const [rows] = await db.query(`SELECT ${columns} FROM authors WHERE email = ?`, [email]);
  return rows[0] || null;
};

const create = async (fields) => {
  const entries = Object.entries(fields).filter(([, value]) => value !== undefined);
  const cols = entries.map(([key]) => key);
  const values = entries.map(([, value]) => value);
  const placeholders = entries.map(() => "?").join(", ");

  const [result] = await db.query(
    `INSERT INTO authors (${cols.join(", ")}) VALUES (${placeholders})`,
    values
  );
  return result.insertId;
};

const update = async (id, fields) => {
  const entries = Object.entries(fields).filter(([, value]) => value !== undefined);
  if (entries.length === 0) return 0;

  const setClause = entries.map(([key]) => `${key} = ?`).join(", ");
  const values = entries.map(([, value]) => value);
  values.push(id);

  const [result] = await db.query(
    `UPDATE authors SET ${setClause} WHERE id = ?`,
    values
  );
  return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await db.query("DELETE FROM authors WHERE id = ?", [id]);
  return result.affectedRows;
};

module.exports = {
  findAll,
  findById,
  findByEmail,
  create,
  update,
  remove
};
