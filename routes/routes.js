import express from "express"
const router = express.Router();
import userRoutes from "./userRoute.js";
import imageRoutes from "./imageRoute.js"; 
import projectRoutes from "./projectRoutes.js";
import taskRoutes from "./tasksRoutes.js";
import invoiceRoutes from "./invoiceRoutes.js";
import scheduleRoutes from "./scheduleRoutes.js";

router.use("/user", userRoutes);
router.use("/image", imageRoutes);
router.use("/project", projectRoutes);
router.use("/task", taskRoutes);
router.use("/invoice", invoiceRoutes);
router.use("/schedule", scheduleRoutes);

export default router