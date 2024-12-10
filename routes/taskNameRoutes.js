import express from "express"
const router = express.Router()
import TaskNameController from "../controller/taskNameController.js"
import isAutherticated from "../middleware/auth.js"


router.post("/create/taskName", isAutherticated.isAuthenticated, TaskNameController.createTaskName);
router.get("/all", isAutherticated.isAuthenticated, TaskNameController.getAllTaskNames);
router.put("/update/:id", isAutherticated.isAuthenticated, TaskNameController.updateTaskName);
router.delete("/delete/:id", isAutherticated.isAuthenticated, TaskNameController.deleteTaskName);

export default router