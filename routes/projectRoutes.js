import projectController from "../controller/projectController.js";
import express from "express";
const router = express.Router();


router.post("/create", projectController.createProject);
router.get("/:id", projectController.findProject);
router.get("/all/projects", projectController.getProjects);
router.put("/update/:id", projectController.updateProject);
router.delete("/delete/:id", projectController.deleteProject);


export default router