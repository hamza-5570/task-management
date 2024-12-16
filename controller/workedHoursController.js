import messageUtil from "../utils/messageUtil.js";
import Response from "../utils/response.js";
import WorkedHoursServices from "../services/WorkedHoursService.js";

class WorkedHoursController {
    createWorkedHours = async (req, res) => {
        try {
            const workedHours = await WorkedHoursServices.createWorkedHours(req.body);
            if (!workedHours) {
                return Response.serverError(res, messageUtil.FAILED_TO_CREATE_WORKEDHOURS);
            }
            return Response.success(res, messageUtil.WORKEDHOURS_CREATED, workedHours);
        } catch (error) {
            return Response.serverError(res, error);
        }
    }
    getTaskWorkedHours = async (req, res) => {
        const { taskId } = req.query
        try {
            const workedHours = await WorkedHoursServices.getWorkedHoursForTask({ task: taskId });
            if (!workedHours) {
                return Response.serverError(res, messageUtil.FAILED_TO_FETCH_WORKEDHOURS);
            }
            return Response.success(res, messageUtil.WORKEDHOURS_FETCHED, workedHours);
        } catch (error) {
            return Response.serverError(res, error);
        }
    }

    updateWorkedHours = async (req, res) => {
        try {
            const workedHours = await WorkedHoursServices.updateWorkedHours({ _id: req.params.id }, req.body);
            if (!workedHours) {
                return Response.serverError(res, messageUtil.FAILED_TO_UPDATE_WORKEDHOURS);
            }
            return Response.success(res, messageUtil.WORKEDHOURS_UPDATED, workedHours);
        } catch (error) {
            return Response.serverError(res, error);
        }
    }

    deleteWorkedHours = async (req, res) => {
        try {
            const workedHours = await WorkedHoursServices.deleteWorkedHours({ _id: req.params.id });
            if (!workedHours) {
                return Response.serverError(res, messageUtil.FAILED_TO_DELETE_WORKEDHOURS);
            }
            return Response.success(res, messageUtil.WORKEDHOURS_DELETED, workedHours);
        } catch (error) {
            return Response.serverError(res, error);
        }
    }
}

export default new WorkedHoursController();
