import Joi from "joi";
import messageUtil from "../utils/messageUtil.js";
import Response from "../utils/response.js";

class TaskValidation {
    createTask = (req, res, next) => {
        try {
            const schema = Joi.object({
                project: Joi.string().required().messages({
                    "string.empty": messageUtil.PROJECT_REQUIRED,
                    "any.required": messageUtil.PROJECT_REQUIRED
                }),
                client: Joi.string().required().messages({
                    "string.empty": messageUtil.CLIENT_REQUIRED,
                    "any.required": messageUtil.CLIENT_REQUIRED
                }),
                task_name: Joi.string().required().messages({
                    "string.empty": messageUtil.TASK_NAME_REQUIRED,
                    "any.required": messageUtil.TASK_NAME_REQUIRED
                }),
                due_date: Joi.date().required().messages({
                    "date.base": messageUtil.DUE_DATE_TYPE,
                    "any.required": messageUtil.DUE_DATE_REQUIRED
                }),
                time: Joi.string().required().messages({
                    "string.empty": messageUtil.TIME_REQUIRED,
                    "any.required": messageUtil.TIME_REQUIRED
                }),
                status: Joi.string().messages({
                    "string.empty": messageUtil.STATUS_REQUIRED,
                    "any.required": messageUtil.STATUS_REQUIRED
                }),
                assigned_to: Joi.string().messages({
                    "string.empty": messageUtil.ASSIGNED_TO_REQUIRED,
                    "any.required": messageUtil.ASSIGNED_TO_REQUIRED
                }),
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

export default new TaskValidation();
