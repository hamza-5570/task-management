import express from "express"
const router = express.Router()
import scheduleController from "../controller/scheduleController.js"
import isAutherticated from "../middleware/auth.js"


router.post("/create", isAutherticated.isAuthenticated, scheduleController.createSchedule);
router.get("/all/schedules", isAutherticated.isAuthenticated, scheduleController.getSchedules);
router.get("/weekly/schedules", isAutherticated.isAuthenticated, scheduleController.getWeeklySchedule);
router.get("/monthly/schedules", isAutherticated.isAuthenticated, scheduleController.getMonthlySchedule);
router.get("/yearly/schedules", isAutherticated.isAuthenticated, scheduleController.getYearlySchedule);
router.get("/:id", scheduleController.findSchedule);
router.put("/update/:id", scheduleController.updateSchedule);
router.delete("/delete/:id", scheduleController.deleteSchedule);

export default router