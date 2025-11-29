const { validationResult } = require("express-validator");
const authorsService = require("../services/authors.service");

const handleValidation = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error(errors.array().map((e) => e.msg).join(", "));
    err.status = 400;
    throw err;
  }
};

const authorsController = {
  list: async (req, res) => {
    const data = await authorsService.listAuthors();
    res.json(data);
  },

  get: async (req, res) => {
    handleValidation(req);
    const author = await authorsService.getAuthor(req.params.id);
    res.json(author);
  },

  create: async (req, res) => {
    handleValidation(req);
    const author = await authorsService.createAuthor(req.body);
    res.status(201).json(author);
  },

  update: async (req, res) => {
    handleValidation(req);
    const author = await authorsService.updateAuthor(req.params.id, req.body);
    res.json(author);
  },

  remove: async (req, res) => {
    handleValidation(req);
    await authorsService.deleteAuthor(req.params.id);
    res.status(204).send();
  }
};

module.exports = authorsController;
