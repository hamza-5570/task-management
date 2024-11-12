import Project from "../model/project.js";

class ProjectService{
    createProject = async (project) => {
        return await Project.create(project);
    };

    findProject = async (query) => {
        return await Project.findOne(query).populate("tasks");
    };

     getProjects = async (userId, page, limit) => {
        console.log(userId, page, limit)
        const skip = (page - 1) * limit;

        const projects = await Project.find({ created_by:userId })
            .skip(skip)
            .limit(limit)
            .exec();

        const totalCount = await Project.countDocuments({ created_by: userId });
    
        return { projects, totalCount };
    }
    

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