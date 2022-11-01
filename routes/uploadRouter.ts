import express, {Response, Request} from "express";
import checkAuth from "../utils/checkAuth";
import {upload} from "../config/uploadStorage";

const router = express.Router()

router.post('/upload', checkAuth, upload.single('image'), (req: Request, res: Response) => {
    res.json({
        url: `/uploads/${req.file?.originalname}`
    })
})


export default router;