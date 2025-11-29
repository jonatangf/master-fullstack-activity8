const authorsModel = require("../models/authors.model");

const log = (...args) => console.log("[AuthorsService]", ...args);

const CREATE_FIELDS = ["name", "email", "image"];
const UPDATE_FIELDS = ["name", "email", "image"];

const pickFields = (payload, keys) => {
  const result = {};
  for (const key of keys) {
    if (payload[key] !== undefined) {
      result[key] = payload[key];
    }
  }
  return result;
};

const listAuthors = async () => {
  log("Fetching all authors");
  return authorsModel.findAll();
};

const getAuthor = async (id) => {
  log("Fetching author", { id });
  const author = await authorsModel.findById(id);
  if (!author) {
    const err = new Error("Autor no encontrado");
    err.status = 404;
    throw err;
  }
  return author;
};

const createAuthor = async (payload) => {
  const fields = pickFields(payload, CREATE_FIELDS);

  if (!fields.name || !fields.email) {
    const err = new Error("name y email son obligatorios");
    err.status = 400;
    throw err;
  }

  const existing = await authorsModel.findByEmail(fields.email);
  if (existing) {
    const err = new Error("Ya existe un autor con ese email");
    err.status = 409;
    throw err;
  }

  log("Creating author", { email: fields.email });
  const insertId = await authorsModel.create(fields);
  return authorsModel.findById(insertId);
};

const updateAuthor = async (id, payload) => {
  const fields = pickFields(payload, UPDATE_FIELDS);

  if (Object.keys(fields).length === 0) {
    const err = new Error("No hay campos para actualizar");
    err.status = 400;
    throw err;
  }

  if (fields.email) {
    const existing = await authorsModel.findByEmail(fields.email);
    if (existing && existing.id !== id) {
      const err = new Error("Ya existe otro autor con ese email");
      err.status = 409;
      throw err;
    }
  }

  log("Updating author", { id });
  const affected = await authorsModel.update(id, fields);
  if (!affected) {
    const err = new Error("Autor no encontrado");
    err.status = 404;
    throw err;
  }

  return authorsModel.findById(id);
};

const deleteAuthor = async (id) => {
  log("Deleting author", { id });
  const affected = await authorsModel.remove(id);
  if (!affected) {
    const err = new Error("Autor no encontrado");
    err.status = 404;
    throw err;
  }
  return true;
};

module.exports = {
  listAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor
};
