import express from "express"
const router = express.Router();
import userRoutes from "./userRoute.js";
import imageRoutes from "./imageRoute.js"; 
import projectRoutes from "./projectRoutes.js";

router.use("/user", userRoutes);
router.use("/image", imageRoutes);
router.use("/project", projectRoutes);

export default router