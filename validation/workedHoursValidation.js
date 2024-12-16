import Joi from "joi";
import messageUtil from "../utils/messageUtil.js";
import Response from "../utils/response.js";

class WorkedHoursValidation {
    createWorkedHours = (req, res, next) => {
        try {
            const schema = Joi.object({
                user: Joi.string().required().messages({
                    "string.empty": messageUtil.USER_REQUIRED,
                    "any.required": messageUtil.USER_REQUIRED
                }),
                task: Joi.string().required().messages({
                    "string.empty": messageUtil.TASK_REQUIRED,
                    "any.required": messageUtil.TASK_REQUIRED
                }),
                workedHours: Joi.number().required().messages({
                    "number.empty": messageUtil.WORKED_HOURS_REQUIRED,
                    "any.required": messageUtil.WORKED_HOURS_REQUIRED
                }),
                date: Joi.date().required().messages({
                    "date.base": messageUtil.DATE_TYPE,
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

export default new WorkedHoursValidation();
