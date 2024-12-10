import TaskName from "../model/taskName.js";

class TaskNameService {
    createTaskName = async (taskName) => {
        return await TaskName.create(taskName);
    }
    getAllTaskName = async (query) => {
        const GeneraltaskNames = await TaskName.find({ status: "General" });
        const SpecifictaskNames = await TaskName.find({ status: "Specific", created_by: query });
        return [...GeneraltaskNames, ...SpecifictaskNames];
    }
    updateTaskName = async (query, data) => {
        return await TaskName.findOneAndUpdate(query, data, { new: true });
    }
    deleteTaskName = async (query) => {
        return await TaskName.findOneAndDelete(query);
    }
}

export default new TaskNameService();
