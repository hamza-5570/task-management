import express from "express";
const router = express.Router();
import taskController from "../controller/taskController.js";
import isAuthenticated from "../middleware/auth.js";

router.post("/create", isAuthenticated.isAuthenticated, taskController.createTask);
router.get("/all/tasks/:projectId", taskController.getTasks);
router.get("/user/tasks", isAuthenticated.isAuthenticated, taskController.getTasksByUserId);
router.get("/:id", taskController.findTask);
router.put("/update/:id", taskController.updateTask);
router.delete("/delete/:id", taskController.deleteTask);

export default router