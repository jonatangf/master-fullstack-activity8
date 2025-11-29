const { validationResult } = require("express-validator");
const postsService = require("../services/posts.service");

const handleValidation = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error(errors.array().map((e) => e.msg).join(", "));
    err.status = 400;
    throw err;
  }
};

const postsController = {
  list: async (req, res) => {
    handleValidation(req);
    const filters = {};
    if (req.query.category) filters.category = req.query.category;
    if (req.query.authorId) filters.authorId = req.query.authorId;

    const data = await postsService.listPosts(filters);
    res.json(data);
  },

  get: async (req, res) => {
    handleValidation(req);
    const post = await postsService.getPost(req.params.id);
    res.json(post);
  },

  getByAuthor: async (req, res) => {
    handleValidation(req);
    const result = await postsService.getPostsByAuthor(req.params.authorId);
    res.json(result);
  },

  create: async (req, res) => {
    handleValidation(req);
    const payload = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      author_id: req.body.authorId
    };
    const post = await postsService.createPost(payload);
    res.status(201).json(post);
  },

  update: async (req, res) => {
    handleValidation(req);
    const payload = {};
    if (req.body.title !== undefined) payload.title = req.body.title;
    if (req.body.description !== undefined) payload.description = req.body.description;
    if (req.body.category !== undefined) payload.category = req.body.category;
    if (req.body.authorId !== undefined) payload.author_id = req.body.authorId;

    const post = await postsService.updatePost(req.params.id, payload);
    res.json(post);
  },

  remove: async (req, res) => {
    handleValidation(req);
    await postsService.deletePost(req.params.id);
    res.status(204).send();
  }
};

module.exports = postsController;
