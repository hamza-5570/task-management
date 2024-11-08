import Project from "../model/project.js";

class ProjectService{
    createProject = async (project, userId) => {
        return await Project.create(project, {created_by: userId});
    };

    findProject = async (query) => {
        return await Project.findOne(query).populate("tasks");
    };

    getProjects = async () => {
        return await Project.find().populate("tasks");
    };

    updateProject = async (query, data) => {
        return await Project.findOneAndUpdate(query, data, { new: true });
    };

    deleteProject = async (query) => {
        return await Project.findOneAndDelete(query);
    };
}

export default new ProjectService();