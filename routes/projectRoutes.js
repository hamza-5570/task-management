import projectController from "../controller/projectController.js";
import express from "express";
const router = express.Router();
import isAuthenticated from "../middleware/auth.js";


router.post("/create", isAuthenticated.isAuthenticated, projectController.createProject);
router.get("/:id", projectController.findProject);
router.get("/all/projects", isAuthenticated.isAuthenticated, projectController.getProjects);
router.get("/get/unbilled", isAuthenticated.isAuthenticated, projectController.getUnBilledProjects);
router.put("/update/:id", projectController.updateProject);
router.delete("/delete/:id", projectController.deleteProject);


export default router