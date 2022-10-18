import checkAuth from "../utils/checkAuth";
import {apiaryCreateValidation} from "../validations/apiary";
import handleValidationErrors from "../utils/handleValidationErrors";
import * as ApiaryController from "../controllers/ApiaryController";
import express from "express";
import BeehiveRouter from "./beehiveRouter";

const router = express.Router()


router.use('/apiary/:apiaryId', BeehiveRouter);


router.post('/apiary', checkAuth, apiaryCreateValidation, handleValidationErrors, ApiaryController.create);

router.get('/apiary', checkAuth, ApiaryController.getAll);

router.get('/apiary/:apiaryId', checkAuth, ApiaryController.getOne);

router.delete('/apiary/:apiaryId', checkAuth, ApiaryController.remove);

router.patch('/apiary/:apiaryId', checkAuth, apiaryCreateValidation, ApiaryController.update);


export default router;