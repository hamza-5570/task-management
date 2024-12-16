import express from "express"
const router = express.Router();
import userRoutes from "./userRoute.js";
import imageRoutes from "./imageRoute.js";
import projectRoutes from "./projectRoutes.js";
import taskRoutes from "./tasksRoutes.js";
import invoiceRoutes from "./invoiceRoutes.js";
import scheduleRoutes from "./scheduleRoutes.js";
import taskName from "./taskNameRoutes.js";
import workedHoursRoutes from "./workedHoursRoutes.js";

router.use("/user", userRoutes);
router.use("/image", imageRoutes);
router.use("/project", projectRoutes);
router.use("/task", taskRoutes);
router.use("/invoice", invoiceRoutes);
router.use("/schedule", scheduleRoutes);
router.use("/taskName", taskName);
router.use("/workedHours", workedHoursRoutes);

export default router