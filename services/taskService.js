import Task from "../model/task.js";


class TaskService {
    createTask = async (task) => {
        return await Task.create(task);
    }
    findTask = async (query) => {
        return await Task.findOne(query);
    }
    getTasks = async (project) => {
        return await Task.find({ project: project });
    }
    getTasksByUserId = async (userId, page, limit, status, due_date, month, year) => {
        const query = { created_by: userId };
        let startDate, endDate;

        if (status) {
            query.status = status;
        }
        if (due_date) {
            const startOfDay = new Date(due_date);
            startOfDay.setUTCHours(0, 0, 0, 0);
            const endOfDay = new Date(due_date);
            endOfDay.setUTCHours(23, 59, 59, 999);
            query.due_date = { $gte: startOfDay, $lt: endOfDay };
        }
        if (month) {
            const currentYear = new Date().getFullYear();
            year = year || currentYear;

            startDate = new Date(year, month - 1, 1);
            startDate.setUTCHours(0, 0, 0, 0);

            endDate = new Date(year, month, 0);
            endDate.setUTCHours(23, 59, 59, 999);

            query.due_date = { $gte: startDate, $lt: endDate };
        }

        try {
            let tasks;
            let totalCount;
            if (page && limit) {
                const skip = (page - 1) * limit;
                tasks = await Task.find(query).populate({
                    path: "project",
                    select: "project_name",
                }).skip(skip).limit(limit).exec();
                totalCount = await Task.countDocuments(query);
            } else {
                tasks = await Task.find(query).populate({
                    path: "project",
                    select: "project_name",
                }).exec();
                totalCount = tasks.length;
            }

            return { tasks, totalCount };
        } catch (error) {
            console.error("Error fetching tasks:", error);
            throw new Error("Failed to fetch tasks.");
        }
    };
    updateTask = async (query, data) => {
        console.log(query, data)
        const task = await Task.findOneAndUpdate(query, data, { new: true });
        return task
    }
    deleteTask = async (query) => {
        return await Task.findOneAndDelete(query);
    }
}

export default new TaskService()