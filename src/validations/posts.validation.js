const { body, param, query } = require("express-validator");

const idParamValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("id debe ser un entero positivo")
    .toInt()
];

const authorIdParamValidation = [
  param("authorId")
    .isInt({ min: 1 })
    .withMessage("authorId debe ser un entero positivo")
    .toInt()
];

const listPostsValidation = [
  query("category")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("category máximo 100 caracteres"),
  query("authorId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("authorId debe ser un entero positivo")
    .toInt()
];

const createPostValidation = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("title es obligatorio (máx 200 caracteres)"),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .withMessage("description es obligatorio"),
  body("category")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("category es obligatorio (máx 100 caracteres)"),
  body("authorId")
    .isInt({ min: 1 })
    .withMessage("authorId es obligatorio y debe ser un entero positivo")
    .toInt()
];

const updatePostValidation = [
  ...idParamValidation,
  body("title")
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("title debe tener entre 1 y 200 caracteres"),
  body("description")
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage("description no puede estar vacío"),
  body("category")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("category debe tener entre 1 y 100 caracteres"),
  body("authorId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("authorId debe ser un entero positivo")
    .toInt()
];

module.exports = {
  idParamValidation,
  authorIdParamValidation,
  listPostsValidation,
  createPostValidation,
  updatePostValidation
};
