import projectService from "../services/projectService.js";
import Response from "../utils/response.js"
import messageUtil from "../utils/messageUtil.js"


class ProjectController {
    createProject = async (req, res) => {
        try {
            const project = await projectService.createProject(req.body);
           return Response.success(res, messageUtil.PROJECT_CREATED, project);
        } catch (error) {
            return Response.serverError(res, error);
        }
    }

    findProject = async (req, res) => {
        try {
            const project = await projectService.findProject({ _id: req.params.id });
            if (!project) return Response.notFound(res, messageUtil.PROJECT_NOT_FOUND);
            return Response.success(res, messageUtil.OK, project);
        } catch (error) {
            return Response.serverError(res, error);
        }
    }

    findProjects = async (req, res) => {
        
        try {
            const projects = await projectService.findProjects();
            return Response.success(res, messageUtil.OK, projects);
        } catch (error) {
            return Response.serverError(res, error);
        }
    }

    updateProject = async (req, res) => {
        try {
            const project = await projectService.updateProject({ _id: req.params.id }, req.body);
            if (!project) return Response.notFound(res, messageUtil.PROJECT_NOT_FOUND);
            return Response.success(res, messageUtil.PROJECT_UPDATED, project);
        } catch (error) {
            return Response.serverError(res, error);
        }
    }

    deleteProject = async (req, res) => {
        try {
            const project = await projectService.deleteProject({ _id: req.params.id });
            if (!project) return Response.notFound(res, messageUtil.PROJECT_NOT_FOUND);
            return Response.success(res, messageUtil.PROJECT_DELETED, project);
        } catch (error) {
            return Response.serverError(res, error);
        }
    }
}

export default new ProjectController();