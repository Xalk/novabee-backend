import checkAuth from "../utils/checkAuth";
import {apiaryCreateValidation} from "../validations/apiary";
import handleValidationErrors from "../utils/handleValidationErrors";
import * as ApiaryController from "../controllers/ApiaryController";
import express from "express";

const router = express.Router()

router.post('/apiary', checkAuth, apiaryCreateValidation, handleValidationErrors, ApiaryController.create);

router.get('/apiary', ApiaryController.getAll);

router.get('/apiary/:id', ApiaryController.getOne);

router.delete('/apiary/:id', checkAuth, ApiaryController.remove);

router.patch('/apiary/:id', checkAuth, apiaryCreateValidation, ApiaryController.update);


export default router;