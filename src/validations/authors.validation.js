const { body, param } = require("express-validator");

const idParamValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("id debe ser un entero positivo")
    .toInt()
];

const createAuthorValidation = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("name es obligatorio (máx 100 caracteres)"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("email debe tener un formato válido")
    .normalizeEmail()
    .isLength({ max: 150 })
    .withMessage("email máximo 150 caracteres"),
  body("image")
    .optional({ nullable: true })
    .trim()
    .isURL()
    .withMessage("image debe ser una URL válida")
    .isLength({ max: 255 })
    .withMessage("image máximo 255 caracteres")
];

const updateAuthorValidation = [
  ...idParamValidation,
  body("name")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("name debe tener entre 1 y 100 caracteres"),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("email debe tener un formato válido")
    .normalizeEmail()
    .isLength({ max: 150 })
    .withMessage("email máximo 150 caracteres"),
  body("image")
    .optional({ nullable: true })
    .trim()
    .isURL()
    .withMessage("image debe ser una URL válida")
    .isLength({ max: 255 })
    .withMessage("image máximo 255 caracteres")
];

module.exports = {
  idParamValidation,
  createAuthorValidation,
  updateAuthorValidation
};
