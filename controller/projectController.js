import projectService from "../services/projectService.js";
import Response from "../utils/response.js"
import messageUtil from "../utils/messageUtil.js"


class ProjectController {
    createProject = async (req, res) => {
        const {userId} = req;
        const {body: {project_name, company, project_description, pointof_contact, email, due_date, phoneNumber, Attorney, Confilictof_interest, Examinee}} = req;

        const data = {
            project_name, 
            company, 
            project_description, 
            pointof_contact, 
            email, 
            due_date, 
            phoneNumber, Attorney, 
            Confilictof_interest, 
            Examinee,
            created_by: userId
        }
        try {
            const project = await projectService.createProject(data);
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

    getProjects = async (req, res) => {
        try { 
            const {userId} = req;
            const projects = await projectService.getProjects(userId);
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

    getUnBilledProjects = async (req, res) => {
        const {userId} = req;
        try {
            const projects = await projectService.getUnBilledProjects(userId);
            return Response.success(res, messageUtil.OK, projects);
        } catch (error) {
            return Response.serverError(res, error);
        }
    }
}

export default new ProjectController();