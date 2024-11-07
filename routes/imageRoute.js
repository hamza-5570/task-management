import express from "express"
const router = express.Router();
import imageController from "../controller/imageController.js"


router.post("/upload", imageController.UploadImage);

export default router