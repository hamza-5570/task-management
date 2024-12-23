import Project from "../model/project.js";
import WorkedHoursService from "./WorkedHoursService.js";

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


        const projects = await Project.find(query)
            .populate("tasks")
            .skip(skip)
            .limit(limit)
            .exec();

        const totalCount = await Project.countDocuments(query);

        return { projects, totalCount };
    }

    getUnBilledProjects = async (userId) => {
        const projects = await Project.find({ invoice: null, status: "Completed", created_by: userId }).populate("tasks");
        const getWorkedHoursForSpecificProject = await Promise.all(projects.map(async (project) => {
            const tasks = project.tasks;
            let totalHours = 0;
            for (const task of tasks) {
                const { totalHours: taskHours } = await WorkedHoursService.getWorkedHoursForTask({ task: task._id });
                totalHours += taskHours;
            }
            return { ...project.toObject(), totalHours };
        }));
        return getWorkedHoursForSpecificProject;
    };
    updateProject = async (query, data) => {
        return await Project.findOneAndUpdate(query, data, { new: true });
    };

    deleteProject = async (query) => {
        return await Project.findOneAndDelete(query);
    };
}

export default new ProjectService();