import express from "express";
import * as BeehiveController from "../controllers/BeehiveController";
import checkAuth from "../utils/checkAuth";
import {canGetBeehive} from "../utils/canGetBeehive";
import {beehiveCreateValidation} from "../validations/beehive";
import handleValidationErrors from "../utils/handleValidationErrors";

const router = express.Router({mergeParams: true})


router.post('/beehive', checkAuth, canGetBeehive, beehiveCreateValidation, handleValidationErrors, BeehiveController.create)

router.get('/beehive', checkAuth, canGetBeehive, BeehiveController.getAll)

router.get('/beehive/:beehiveId', checkAuth, canGetBeehive, BeehiveController.getOne)

router.patch('/beehive/:beehiveId', checkAuth, canGetBeehive, beehiveCreateValidation, handleValidationErrors, BeehiveController.update)

router.delete('/beehive/:beehiveId', checkAuth, canGetBeehive, BeehiveController.remove)


export default router;