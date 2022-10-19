import { body } from 'express-validator';

export const queenCreateValidation = [
    body('name').isLength({ min: 3 }).withMessage('Назва повинна бути більше 3 символів'),
    body('description').isLength({ min: 3 }).withMessage('Опис повинен бути більше 3 символів'),
    body('introducedFrom').isDate().withMessage('Невірний формат дати'),
];
