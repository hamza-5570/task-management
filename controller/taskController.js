import taskService from "../services/taskService.js";
import messageUtil from "../utils/messageUtil.js";
import Response from "../utils/response.js";
import projectServices from "../services/projectService.js";
import WorkedHoursServices from "../services/WorkedHoursService.js";

class TaskController {
  createTask = async (req, res) => {
    try {
      const { userId } = req;
      const task = {
        ...req.body,
        created_by: userId,
      };

      const newTask = await taskService.createTask(task);
      if (!newTask) {
        return Response.serverError(res, messageUtil.FAILED_TO_CREATE_TASK);
      }
      const project = await projectServices.findProject({ _id: task.project });
      if (!project) {
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
    const {
      params: { projectId },
    } = req;


    try {
      const tasks = await taskService.getTasks(projectId);
      if (!tasks) {
        return Response.serverError(res, messageUtil.FAILED_TO_FETCH_TASKS);
      }
      return Response.success(res, messageUtil.OK, tasks);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  getTasksByUserId = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { status, due_date } = req.query;

    const { userId } = req;
    try {
      const { tasks, totalCount } = await taskService.getTasksByUserId(
        userId, page, limit, status, due_date
      );

      if (!tasks) {
        return Response.serverError(res, messageUtil.FAILED_TO_FETCH_TASKS);
      }

      // [total worked hours]
      const tasksWithWorkedHours = await Promise.all(
        tasks.map(async (task) => {
          const { totalHours } = await WorkedHoursServices.getWorkedHoursForTask({ task: task._id });
          return {
            ...task.toObject(),
            totalWorkedHours: totalHours || 0,
          };
        })
      );

      const totalPages = Math.ceil(totalCount / limit);

      const response = {
        tasks: tasksWithWorkedHours,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: totalCount,
          totalPages,
        },
      };

      return Response.success(res, messageUtil.OK, response);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  findTask = async (req, res) => {
    try {
      const task = await taskService.findTask({ _id: req.params.id });
      if (!task) {
        return Response.serverError(res, messageUtil.TASK_NOT_FOUND);
      }
      return Response.success(res, messageUtil.TASK_FETCHED, task);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  updateTask = async (req, res) => {
    const { body: {
      project, client, task_name, due_date,
      time, status, assigned_to,
      task_description, date, hours
    } } = req;
    const { userId } = req
    try {
      const task = {
        project, client, task_name,
        due_date, time, status, assigned_to, task_description
      };
      const updatedTask = await taskService.updateTask(
        { _id: req.params.id },
        task
      );
      if (!updatedTask) {
        return Response.serverError(res, messageUtil.FAILED_TO_UPDATE_TASK);
      }
      const workhours = await WorkedHoursServices.createWorkedHours({
        user: userId,
        task: req.params.id,
        date,
        workedHours: hours
      })
      if (!workhours) {
        return Response.serverError(res, messageUtil.FAILED_TO_CREATE_WORKEDHOURS);
      }
      return Response.success(res, messageUtil.TASK_UPDATED, updatedTask);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  deleteTask = async (req, res) => {
    try {
      const deletedTask = await taskService.deleteTask({ _id: req.params.id });
      if (!deletedTask) {
        return Response.serverError(res, messageUtil.FAILED_TO_DELETE_TASK);
      }
      return Response.success(res, messageUtil.TASK_DELETED, deletedTask);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };
}

export default new TaskController();
