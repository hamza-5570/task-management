import Project from "../model/project.js";

class ProjectService {
    createProject = async (project) => {
        return await Project.create(project);
    };

    findProject = async (query) => {
        return await Project.findOne(query).populate("tasks");
    };

    getProjects = async (userId, page, limit, isArchived) => {
        const skip = (page - 1) * limit;

        let query = {};

        if (userId) {
            query.created_by = userId;
        }

        if (isArchived !== undefined) {
            query.isArchived = isArchived;
        }

        console.log("query", query);

        const projects = await Project.find(query)
            .populate("tasks")
            .skip(skip)
            .limit(limit)
            .exec();

        const totalCount = await Project.countDocuments({ created_by: userId });

        return { projects, totalCount };
    }


    getUnBilledProjects = async (userId) => {
        return await Project.find({ invoice: null, status: "Completed", created_by: userId }).populate("tasks");
    };

    updateProject = async (query, data) => {
        return await Project.findOneAndUpdate(query, data, { new: true });
    };

    deleteProject = async (query) => {
        return await Project.findOneAndDelete(query);
    };
}

export default new ProjectService();