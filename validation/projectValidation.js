import Joi from "joi";
import messageUtil from "../utils/messageUtil.js";
import Response from "../utils/response.js";

class ProjectValidation {
    createProject = (req, res, next) => {
        try {
            const schema = Joi.object({
                project_name: Joi.string().required().messages({
                    "string.empty": messageUtil.PROJECT_NAME_REQUIRED,
                    "any.required": messageUtil.PROJECT_NAME_REQUIRED
                }),
                company: Joi.string().required().messages({
                    "string.empty": messageUtil.COMPANY_NAME_REQUIRED,
                    "any.required": messageUtil.COMPANY_NAME_REQUIRED
                }),
                project_description: Joi.string().required().messages({
                    "string.empty": messageUtil.PROJECT_DESCRIPTION_REQUIRED,
                    "any.required": messageUtil.PROJECT_DESCRIPTION_REQUIRED
                }),
                pointof_contact: Joi.string().required().messages({
                    "string.empty": messageUtil.POINT_OF_CONTACT_REQUIRED,
                    "any.required": messageUtil.POINT_OF_CONTACT_REQUIRED
                }),
                email: Joi.string().required().messages({
                    "string.empty": messageUtil.EMAIL_REQUIRED,
                    "any.required": messageUtil.EMAIL_REQUIRED
                }),
                due_date: Joi.date().required().messages({
                    "date.base": messageUtil.DUE_DATE_TYPE,
                    "any.required": messageUtil.DUE_DATE_REQUIRED
                }),
                phoneNumber: Joi.string().required().messages({
                    "string.empty": messageUtil.PHONE_NUMBER_REQUIRED,
                    "any.required": messageUtil.PHONE_NUMBER_REQUIRED
                }),
                Attorney: Joi.string().required().messages({
                    "string.empty": messageUtil.ATTORNEY_REQUIRED,
                    "any.required": messageUtil.ATTORNEY_REQUIRED
                }),
                Confilictof_interest: Joi.string().required().messages({
                    "string.empty": messageUtil.CONFLICT_OF_INTEREST_REQUIRED,
                    "any.required": messageUtil.CONFLICT_OF_INTEREST_REQUIRED
                }),
                Examinee: Joi.string().required().messages({
                    "string.empty": messageUtil.EXAMINEE_REQUIRED,
                    "any.required": messageUtil.EXAMINEE_REQUIRED
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

export default new ProjectValidation();
