import scheduleServices from "../services/scheduleServices.js";
import messageUtil from "../utils/messageUtil.js";
import Response from "../utils/response.js";


class ScheduleController {
    createSchedule = async (req, res) => {
        const { userId } = req;
        try {
            const schedule = {
                ...req.body,
                user: userId
            }
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
        try {
            const schedules = await scheduleServices.getSchedules();
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
            const schedule = await scheduleServices.findSchedule({ _id: req.params.id });
            if (!schedule) return Response.notFound(res, messageUtil.SCHEDULE_NOT_FOUND);
            return Response.success(res, messageUtil.OK, schedule);
        } catch (error) {
            return Response.serverError(res, error);
        }
    };

    updateSchedule = async (req, res) => {
        try {    
            const schedule = await scheduleServices.updateSchedule({ _id: req.params.id }, req.body);
            if (!schedule) return Response.notFound(res, messageUtil.SCHEDULE_NOT_FOUND);
            return Response.success(res, messageUtil.SCHEDULE_UPDATED, schedule);
        } catch (error) {
            return Response.serverError(res, error);
        }
    };

    deleteSchedule = async (req, res) => {
        try {
            const schedule = await scheduleServices.deleteSchedule({ _id: req.params.id });
            if (!schedule) return Response.notFound(res, messageUtil.SCHEDULE_NOT_FOUND);
            return Response.success(res, messageUtil.SCHEDULE_DELETED, schedule);
        } catch (error) {
            return Response.serverError(res, error);
        }
    };
}

export default new ScheduleController();