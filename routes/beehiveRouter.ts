import express from "express";
import * as BeehiveController from "../controllers/BeehiveController";
import checkAuth from "../utils/checkAuth";

const router = express.Router({mergeParams: true})


router.post('/beehive', checkAuth, BeehiveController.create)

router.get('/beehive', checkAuth, BeehiveController.getAll)

router.get('/beehive/:beehiveId', checkAuth, BeehiveController.getOne)

router.patch('/beehive/:beehiveId', checkAuth, BeehiveController.update)

router.delete('/beehive/:beehiveId', checkAuth, BeehiveController.remove)


export default router;