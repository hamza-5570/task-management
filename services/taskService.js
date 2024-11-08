import Task from "../model/task.js";


class TaskService {
    createTask = async (task) => {
        return await Task.create(task);
    }
    findTask = async (query) => {
        return await Task.findOne(query);
    }
    getTasks = async () => {
        return await Task.find();
    }
    updateTask = async (query, data) => {
        return await Task.findOneAndUpdate(query, data, { new: true });
    }
    deleteTask = async (query) => {
        return await Task.findOneAndDelete(query);
    }
}

export default new TaskService()