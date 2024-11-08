import Project from "../model/project.js";

class ProjectService{
    createProject = async (project) => {
        return await Project.create(project);
    };

    findProject = async (query) => {
        return await Project.findOne(query).populate("tasks");
    };

    getProjects = async (userId) => {
        console.log(userId)
        return await Project.find({created_by: userId}).populate("tasks");
    };

    getUnBilledProjects = async (userId) => {
        return await Project.find({invoice: null, status: "Completed", created_by: userId}).populate("tasks");
    };

    updateProject = async (query, data) => {
        return await Project.findOneAndUpdate(query, data, { new: true });
    };

    deleteProject = async (query) => {
        return await Project.findOneAndDelete(query);
    };
}

export default new ProjectService();