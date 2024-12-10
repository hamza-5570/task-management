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

    getTasksByUserId = async (userId, page, limit, status, due_date) => {
        const skip = (page - 1) * limit;
        const query = { created_by: userId };
        if (status) {
            query.status = status;
        }
        if (due_date) {
            query.due_date = new Date(due_date)
        }
        console.log(query)

        try {
            const tasks = await Task.find(query).skip(skip).limit(limit).exec();
            const totalCount = await Task.countDocuments(query);

            return { tasks, totalCount };
        } catch (error) {
            console.error("Error fetching tasks:", error);
            throw new Error("Failed to fetch tasks.");
        }
    };

    updateTask = async (query, data) => {
        return await Task.findOneAndUpdate(query, data, { new: true });
    }
    deleteTask = async (query) => {
        return await Task.findOneAndDelete(query);
    }
}

export default new TaskService()