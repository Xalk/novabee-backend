import express from 'express'
import * as UserController from "../controllers/UserController"
import {loginValidation, registerValidation} from "../validations/auth";
import handleValidationErrors from "../utils/handleValidationErrors";
import checkAuth from "../utils/checkAuth";

const router = express.Router()

router.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);

router.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);

router.get('/auth/me', checkAuth, UserController.getMe);


export default router;