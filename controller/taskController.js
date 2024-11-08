import taskService from "../services/taskService.js";
import messageUtil from "../utils/messageUtil.js";
import Response from "../utils/response.js";
import projectServices from "../services/projectService.js";


class TaskController {
    createTask = async (req, res) => {
       try {
        const task = req.body;

        const newTask = await taskService.createTask(task);
        if(!newTask) {
            return Response.serverError(res, messageUtil.FAILED_TO_CREATE_TASK);
        }
        const project = await projectServices.findProject({ _id: task.project });
        console.log(project);
        if(!project) {
            return Response.serverError(res, messageUtil.PROJECT_NOT_FOUND);
        }
        project.tasks.push(newTask._id);
        await project.save();
        
        return Response.success(res, messageUtil.TASK_CREATED, newTask);
       } catch (error) {
        return Response.serverError(res, error);
       }
    };

    getTasks = async (req, res) => {
       try {
        const tasks = await taskService.getTasks();
        if(!tasks) {
            return Response.serverError(res, messageUtil.FAILED_TO_FETCH_TASKS);
        }
        return Response.success(res, messageUtil.OK, tasks);
       } catch (error) {
        return Response.serverError(res, error);
       }
    };

    findTask = async (req, res) => {
      try {
        const task = await taskService.findTask({ _id: req.params.id });
        if(!task) {
            return Response.serverError(res, messageUtil.TASK_NOT_FOUND);
        }
        return Response.success(res, messageUtil.TASK_FETCHED, task);
      } catch (error) {
        return Response.serverError(res, error);
      }
    };

    updateTask = async (req, res) => {
       try {
        const task = req.body;
        const updatedTask = await taskService.updateTask({ _id: req.params.id }, task);
        if(!updatedTask) {
            return Response.serverError(res, messageUtil.FAILED_TO_UPDATE_TASK);
        }
        return Response.success(res, messageUtil.TASK_UPDATED, updatedTask);
       } catch (error) {
        return Response.serverError(res, error);
       }
    };

    deleteTask = async (req, res) => {
        try {
        const deletedTask = await taskService.deleteTask({ _id: req.params.id });
        if(!deletedTask) {
           return Response.serverError(res, messageUtil.FAILED_TO_DELETE_TASK);
        }
           return Response.success(res, messageUtil.TASK_DELETED, deletedTask);
        } catch (error) {
            return Response.serverError(res, error);
        }
    };

}

export default new TaskController();