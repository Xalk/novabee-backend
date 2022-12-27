import express from "express";
import * as QueenController from "../controllers/QueenController"
import checkAuth from "../utils/checkAuth";
import {canGetBeehive} from "../utils/canGetBeehive";


const router = express.Router({mergeParams: true})


router.post('/queen', checkAuth, canGetBeehive, QueenController.create)

router.get('/queen', checkAuth, canGetBeehive,  QueenController.getOne)

router.patch('/queen', checkAuth, canGetBeehive, QueenController.update)

router.delete('/queen', checkAuth, canGetBeehive, QueenController.remove)


export default router;