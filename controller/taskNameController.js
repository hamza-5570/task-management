import TaskNameService from "../services/taskNameServices.js";
import messageUtil from "../utils/messageUtil.js";
import Response from "../utils/response.js";
import projectServices from "../services/projectService.js";

class TaskNameController {
    createTaskName = async (req, res) => {
        try {
            const task = { ...req.body };
            const newTaskName = await TaskNameService.createTaskName(task);
            if (!newTaskName) {
                return Response.serverError(res, messageUtil.FAILED_TO_CREATE_TASKNAME);
            }
            return Response.success(res, messageUtil.TASKNAME_CREATED, newTaskName);
        } catch (error) {
            return Response.serverError(res, error);
        }
    }

    getAllTaskNames = async (req, res) => {
        try {
            const taskNames = await TaskNameService.getAllTaskName();
            return Response.success(res, messageUtil.TASKNAME_FETCHED, taskNames);
        } catch (error) {
            return Response.serverError(res, error);
        }
    }

    updateTaskName = async (req, res) => {
        try {
            const query = { _id: req.params.id };
            const data = { ...req.body };
            const updatedTaskName = await TaskNameService.updateTaskName(query, data);
            if (!updatedTaskName) {
                return Response.serverError(res, messageUtil.FAILED_TO_UPDATE_TASKNAME);
            }
            return Response.success(res, messageUtil.TASKNAME_UPDATED, updatedTaskName);
        } catch (error) {
            return Response.serverError(res, error);
        }
    }

    deleteTaskName = async (req, res) => {
        try {
            const query = { _id: req.params.id };
            const deletedTaskName = await TaskNameService.deleteTaskName(query);
            if (!deletedTaskName) {
                return Response.serverError(res, messageUtil.FAILED_TO_DELETE_TASKNAME);
            }
            return Response.success(res, messageUtil.TASKNAME_DELETED, deletedTaskName);
        } catch (error) {
            return Response.serverError(res, error);
        }
    }
}

export default new TaskNameController();
