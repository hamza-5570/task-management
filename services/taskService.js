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

    getTasksByUserId = async (userId, page, limit) => {
        const skip = (page - 1) * limit;

        const tasks = await Task.find({ created_by: userId })
        .skip(skip)
        .limit(limit)
        .exec();

        const totalCount = await Task.countDocuments({ created_by: userId });
        console.log(totalCount)

        return { tasks, totalCount };
    }
    updateTask = async (query, data) => {
        return await Task.findOneAndUpdate(query, data, { new: true });
    }
    deleteTask = async (query) => {
        return await Task.findOneAndDelete(query);
    }
}

export default new TaskService()