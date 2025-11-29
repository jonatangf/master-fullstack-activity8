const postsModel = require("../models/posts.model");
const authorsModel = require("../models/authors.model");

const log = (...args) => console.log("[PostsService]", ...args);

const CREATE_FIELDS = ["title", "description", "category", "author_id"];
const UPDATE_FIELDS = ["title", "description", "category", "author_id"];

const pickFields = (payload, keys) => {
  const result = {};
  for (const key of keys) {
    if (payload[key] !== undefined) {
      result[key] = payload[key];
    }
  }
  return result;
};

const listPosts = async (filters = {}) => {
  log("Fetching posts", { filters });
  return postsModel.findAll(filters);
};

const getPost = async (id) => {
  log("Fetching post", { id });
  const post = await postsModel.findById(id);
  if (!post) {
    const err = new Error("Post no encontrado");
    err.status = 404;
    throw err;
  }
  return post;
};

const getPostsByAuthor = async (authorId) => {
  log("Fetching posts by author", { authorId });

  const author = await authorsModel.findById(authorId);
  if (!author) {
    const err = new Error("Autor no encontrado");
    err.status = 404;
    throw err;
  }

  const posts = await postsModel.findByAuthorId(authorId);
  return { author, posts };
};

const createPost = async (payload) => {
  const fields = pickFields(payload, CREATE_FIELDS);

  if (!fields.title || !fields.description || !fields.category || !fields.author_id) {
    const err = new Error("title, description, category y author_id son obligatorios");
    err.status = 400;
    throw err;
  }

  const author = await authorsModel.findById(fields.author_id);
  if (!author) {
    const err = new Error("El autor especificado no existe");
    err.status = 400;
    throw err;
  }

  log("Creating post", { title: fields.title, authorId: fields.author_id });
  const insertId = await postsModel.create(fields);
  return postsModel.findById(insertId);
};

const updatePost = async (id, payload) => {
  const fields = pickFields(payload, UPDATE_FIELDS);

  if (Object.keys(fields).length === 0) {
    const err = new Error("No hay campos para actualizar");
    err.status = 400;
    throw err;
  }

  if (fields.author_id) {
    const author = await authorsModel.findById(fields.author_id);
    if (!author) {
      const err = new Error("El autor especificado no existe");
      err.status = 400;
      throw err;
    }
  }

  log("Updating post", { id });
  const affected = await postsModel.update(id, fields);
  if (!affected) {
    const err = new Error("Post no encontrado");
    err.status = 404;
    throw err;
  }

  return postsModel.findById(id);
};

const deletePost = async (id) => {
  log("Deleting post", { id });
  const affected = await postsModel.remove(id);
  if (!affected) {
    const err = new Error("Post no encontrado");
    err.status = 404;
    throw err;
  }
  return true;
};

module.exports = {
  listPosts,
  getPost,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost
};
