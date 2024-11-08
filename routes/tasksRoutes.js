import express from "express";
const router = express.Router();
import taskController from "../controller/taskController.js";

router.post("/create", taskController.createTask);
router.get("/all/tasks", taskController.getTasks);
router.get("/:id", taskController.findTask);
router.put("/update/:id", taskController.updateTask);
router.delete("/delete/:id", taskController.deleteTask);

export default router