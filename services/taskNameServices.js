import TaskName from "../model/taskName.js";

class TaskNameService {
    createTaskName = async (taskName) => {
        return await TaskName.create(taskName);
    }
    getAllTaskName = async () => {
        return await TaskName.find();
    }
    updateTaskName = async (query, data) => {
        return await TaskName.findOneAndUpdate(query, data, { new: true });
    }
    deleteTaskName = async (query) => {
        return await TaskName.findOneAndDelete(query);
    }
}

export default new TaskNameService();
