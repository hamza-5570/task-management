import Joi from "joi";
import messageUtil from "../utils/messageUtil.js";
import Response from "../utils/response.js";

class UserValidation {
    createUser = (req, res, next) => {
        try {
            const schema = Joi.object({
                first_name: Joi.string().required().messages({
                    "string.empty": messageUtil.FIRST_NAME_REQUIRED,
                    "any.required": messageUtil.FIRST_NAME_REQUIRED
                }),
                last_name: Joi.string().required().messages({
                    "string.empty": messageUtil.LAST_NAME_REQUIRED,
                    "any.required": messageUtil.LAST_NAME_REQUIRED
                }),
                email: Joi.string().required().messages({
                    "string.empty": messageUtil.EMAIL_REQUIRED,
                    "any.required": messageUtil.EMAIL_REQUIRED
                }),
                password: Joi.string().required().messages({
                    "string.empty": messageUtil.PASSWORD_REQUIRED,
                    "any.required": messageUtil.PASSWORD_REQUIRED
                }),
                role: Joi.string().messages({
                    "string.empty": messageUtil.ROLE_REQUIRED
                }),
                phoneNumber: Joi.string().required().messages({
                    "string.empty": messageUtil.PHONE_NUMBER_REQUIRED,
                    "any.required": messageUtil.PHONE_NUMBER_REQUIRED
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

export default new UserValidation();
