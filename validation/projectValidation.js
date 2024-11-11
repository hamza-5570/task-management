import Joi from "joi"
import messageUtil from "../utils/messageUtil.js"
import Response from "../utils/response.js"

class ProjectValidation {
    createProject = (req, res, next) => {
        try {
            const schema = Joi.object({
                project_name: Joi.string().required().message({
                    "string.required": messageUtil.PROJECT_NAME_REQUIRED,
                    "string.base": messageUtil.PROJECT_NAME_REQUIRED,
                    "string.empty": messageUtil.PROJECT_NAME_REQUIRED
                }),
                company: Joi.string().required().message({
                    "string.required": messageUtil.COMPANY_NAME_REQUIRED,
                    "string.base": messageUtil.COMPANY_NAME_TYPE,
                    "string.empty": messageUtil.COMPANY_NAME_REQUIRED
                }),
                project_description: Joi.string().required().message({
                    "string.required": messageUtil.PROJECT_DESCRIPTION_REQUIRED,
                    "string.base": messageUtil.PROJECT_DESCRIPTION_TYPE,
                    "string.empty": messageUtil.PROJECT_DESCRIPTION_REQUIRED
                }),
                pointof_contact: Joi.string().required().message({
                    "string.required": messageUtil.POINT_OF_CONTACT_REQUIRED,
                    "string.base": messageUtil.POINT_OF_CONTACT_TYPE,
                    "string.empty": messageUtil.POINT_OF_CONTACT_REQUIRED
                }),
                email: Joi.string().required().message({
                    "string.required": messageUtil.EMAIL_REQUIRED,
                    "string.base": messageUtil.EMAIL_TYPE,
                    "string.empty": messageUtil.EMAIL_REQUIRED
                }),
                due_date: Joi.date().required().message({
                    "date.required": messageUtil.DUE_DATE_REQUIRED,
                    "date.base": messageUtil.DUE_DATE_TYPE,
                    "date.empty": messageUtil.DUE_DATE_REQUIRED
                }),
                phoneNumber: Joi.string().required().message({
                    "string.required": messageUtil.PHONE_NUMBER_REQUIRED,
                    "string.base": messageUtil.PHONE_NUMBER_TYPE,
                    "string.empty": messageUtil.PHONE_NUMBER_REQUIRED
                }),
                Attorney: Joi.string().required().message({
                    "string.required": messageUtil.ATTORNEY_REQUIRED,
                    "string.base": messageUtil.ATTORNEY_TYPE,
                    "string.empty": messageUtil.ATTORNEY_REQUIRED
                }),
                Confilictof_interest: Joi.string().required().message({
                    "string.required": messageUtil.CONFLICT_OF_INTEREST_REQUIRED,
                    "string.base": messageUtil.CONFLICT_OF_INTEREST_TYPE,
                    "string.empty": messageUtil.CONFLICT_OF_INTEREST_REQUIRED
                }),
                Examinee: Joi.string().required().message({
                    "string.required": messageUtil.EXAMINEE_REQUIRED,
                    "string.base": messageUtil.EXAMINEE_TYPE,
                    "string.empty": messageUtil.EXAMINEE_REQUIRED
                }),
                
            })

            const { error } = schema.validate(req.body);
            if (error) {
                return Response.badRequest(res, error.message);
            }
            next();
        } catch (error) {
            return Response.serverError(res, error);
        }
    }
}

export default new ProjectValidation();