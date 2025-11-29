const db = require("../config/db");

const postColumns = "p.id, p.title, p.description, p.category, p.author_id, p.created_at, p.updated_at";
const authorColumns = "a.id AS author_id, a.name AS author_name, a.email AS author_email, a.image AS author_image";

const findAll = async (filters = {}) => {
  const conditions = [];
  const params = [];

  if (filters.category) {
    conditions.push("p.category LIKE ?");
    params.push(`%${filters.category}%`);
  }

  if (filters.authorId) {
    conditions.push("p.author_id = ?");
    params.push(filters.authorId);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const [rows] = await db.query(
    `SELECT ${postColumns}, ${authorColumns}
     FROM posts p
     INNER JOIN authors a ON p.author_id = a.id
     ${whereClause}
     ORDER BY p.id DESC`,
    params
  );

  return rows.map(formatPostWithAuthor);
};

const findById = async (id) => {
  const [rows] = await db.query(
    `SELECT ${postColumns}, ${authorColumns}
     FROM posts p
     INNER JOIN authors a ON p.author_id = a.id
     WHERE p.id = ?`,
    [id]
  );

  if (rows.length === 0) return null;
  return formatPostWithAuthor(rows[0]);
};

const findByAuthorId = async (authorId) => {
  const [rows] = await db.query(
    `SELECT ${postColumns}, ${authorColumns}
     FROM posts p
     INNER JOIN authors a ON p.author_id = a.id
     WHERE p.author_id = ?
     ORDER BY p.id DESC`,
    [authorId]
  );

  return rows.map(formatPostWithAuthor);
};

const create = async (fields) => {
  const entries = Object.entries(fields).filter(([, value]) => value !== undefined);
  const cols = entries.map(([key]) => key);
  const values = entries.map(([, value]) => value);
  const placeholders = entries.map(() => "?").join(", ");

  const [result] = await db.query(
    `INSERT INTO posts (${cols.join(", ")}) VALUES (${placeholders})`,
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
    `UPDATE posts SET ${setClause} WHERE id = ?`,
    values
  );
  return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await db.query("DELETE FROM posts WHERE id = ?", [id]);
  return result.affectedRows;
};

const formatPostWithAuthor = (row) => ({
  id: row.id,
  title: row.title,
  description: row.description,
  category: row.category,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  author: {
    id: row.author_id,
    name: row.author_name,
    email: row.author_email,
    image: row.author_image
  }
});

module.exports = {
  findAll,
  findById,
  findByAuthorId,
  create,
  update,
  remove
};
