import Joi from "joi";
import messageUtil from "../utils/messageUtil.js";
import Response from "../utils/response.js";
import task from "../model/task.js";

class ScheduleValidation {
    createSchedule = (req, res, next) => {
        try {
            const schema = Joi.object({
                task: Joi.string().required().messages({
                    "string.empty": messageUtil.TASK_REQUIRED,
                    "any.required": messageUtil.TASK_REQUIRED
                }),
                from: Joi.string().required().messages({
                    "string.empty": messageUtil.FROM_REQUIRED,
                    "any.required": messageUtil.FROM_REQUIRED
                }),
                to: Joi.string().required().messages({
                    "string.empty": messageUtil.TO_REQUIRED,
                    "any.required": messageUtil.TO_REQUIRED
                }),
                date: Joi.string().required().messages({
                    "string.empty": messageUtil.DATE_REQUIRED,
                    "any.required": messageUtil.DATE_REQUIRED
                })
            });

            const { error } = schema.validate(req.body);
            if (error) {
                return Response.badRequest(res, error.details[0].message);
            }
            next();
        } catch (error) {
            return Response.serverError(res, error);
        }
    }
}

export default new ScheduleValidation();
