import { body } from "express-validator";

export const registerValidation = [
  body("email").isEmail().withMessage("Не вірний формат пошти"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Пароль повинен бути більше 5 символів"),
  body("fullName")
    .isLength({ min: 2 })
    .withMessage("Довжина ім'я не менше 2 букв"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Не вірний формат пошти"),
  body("password")
      .isLength({ min: 5 })
      .withMessage("Пароль повинен бути більше 5 символів"),
];
