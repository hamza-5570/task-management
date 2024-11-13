import scheduleServices from "../services/scheduleServices.js";
import messageUtil from "../utils/messageUtil.js";
import Response from "../utils/response.js";

class ScheduleController {
  createSchedule = async (req, res) => {
    const { userId } = req;
    try {
      const { date, from, to, task } = req.body;

      const formatDateToString = (date, time) => {
        const [hours, minutes] = time.split(":");
        const formattedDate = new Date(date);

        formattedDate.setHours(hours, minutes, 0, 0);

        const formattedTime =
          formattedDate.getFullYear() +
          "-" +
          String(formattedDate.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(formattedDate.getDate()).padStart(2, "0") +
          "T" +
          String(formattedDate.getHours()).padStart(2, "0") +
          ":" +
          String(formattedDate.getMinutes()).padStart(2, "0");

        return formattedTime;
      };

      const formattedFromDate = formatDateToString(date, from);
      const formattedToDate = formatDateToString(date, to);

      const schedule = {
        task,
        user: userId,
        from: formattedFromDate,
        to: formattedToDate,
      };

      const newSchedule = await scheduleServices.createSchedule(schedule);

      if (!newSchedule) {
        return Response.serverError(res, messageUtil.FAILED_TO_CREATE_SCHEDULE);
      }

      return Response.success(res, messageUtil.SCHEDULE_CREATED, newSchedule);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  getSchedules = async (req, res) => {
    const { userId } = req;
    try {
      const schedules = await scheduleServices.getSchedules(userId);
      if (!schedules) {
        return Response.serverError(res, messageUtil.FAILED_TO_FETCH_SCHEDULES);
      }
      return Response.success(res, messageUtil.OK, schedules);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  findSchedule = async (req, res) => {
    try {
      const schedule = await scheduleServices.findSchedule({
        _id: req.params.id,
      });
      if (!schedule)
        return Response.notFound(res, messageUtil.SCHEDULE_NOT_FOUND);
      return Response.success(res, messageUtil.OK, schedule);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  updateSchedule = async (req, res) => {
    try {
      const schedule = await scheduleServices.updateSchedule(
        { _id: req.params.id },
        req.body
      );
      if (!schedule)
        return Response.notFound(res, messageUtil.SCHEDULE_NOT_FOUND);
      return Response.success(res, messageUtil.SCHEDULE_UPDATED, schedule);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  deleteSchedule = async (req, res) => {
    try {
      const schedule = await scheduleServices.deleteSchedule({
        _id: req.params.id,
      });
      if (!schedule)
        return Response.notFound(res, messageUtil.SCHEDULE_NOT_FOUND);
      return Response.success(res, messageUtil.SCHEDULE_DELETED, schedule);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  getOneDaySchedule = async (req, res) => {
    const { userId } = req;
    try {
      const schedules = await scheduleServices.getOneDaySchedule(userId);
      if (!schedules) {
        return Response.serverError(res, messageUtil.FAILED_TO_FETCH_SCHEDULES);
      }
      return Response.success(res, messageUtil.OK, schedules);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  getWeeklySchedule = async (req, res) => {
    const { userId } = req;
    try {
      const schedules = await scheduleServices.getWeeklySchedule(userId);
      if (!schedules) {
        return Response.serverError(res, messageUtil.FAILED_TO_FETCH_SCHEDULES);
      }
      return Response.success(res, messageUtil.OK, schedules);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  getMonthlySchedule = async (req, res) => {
    const { userId } = req;
    try {
      const schedules = await scheduleServices.getMonthlySchedule(userId);
      if (!schedules) {
        return Response.serverError(res, messageUtil.FAILED_TO_FETCH_SCHEDULES);
      }
      return Response.success(res, messageUtil.OK, schedules);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  getYearlySchedule = async (req, res) => {
    const { userId } = req;
    try {
      const schedules = await scheduleServices.getYearlySchedule(userId);
      if (!schedules) {
        return Response.serverError(res, messageUtil.FAILED_TO_FETCH_SCHEDULES);
      }
      return Response.success(res, messageUtil.OK, schedules);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  getSchedulesByDate = async (req, res) => {
    const { date } = req.body;
    const { userId } = req;
    try {
      const schedules = await scheduleServices.getSchedulesByDate(userId, date);
      if (!schedules) {
        return Response.serverError(res, messageUtil.FAILED_TO_FETCH_SCHEDULES);
      }
      return Response.success(res, messageUtil.OK, schedules);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };
}

export default new ScheduleController();
