import jwtHelper from "../utils/jwt.js";
import Response from "../utils/response.js";
import messageUtil from "../utils/messageUtil.js";
import userService from "../services/userServices.js";
import { bcryptHash, comparePassword } from "../utils/password.js";
import transporter from "../middleware/transporter.js"
import User from "../model/user.js"; 

class UserConroller {
  SignUp = async (req, res) => {
    try {
      let existingUser = await User.findOne({email: req.body.email});

      if (existingUser) return Response.ExistallReady(res, messageUtil.ALL_READY_EXIST);

      const user = await userService.createUser({
        ...req.body,
        password: await bcryptHash(req.body.password),
      });
      user.password = await bcryptHash(req.body.password);
      user.save();
      const token = await jwtHelper.issue({ _id: user._id });
      return Response.success(res, messageUtil.USER_CREATED, user, token);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  Login = async (req, res) => {
    try {
      let user = await userService.findByEmail({ email: req.body.email });
      if (!user) return Response.notFound(res, messageUtil.USER_NOT_FOUND);
      const isMatch = await comparePassword(req.body.password, user.password);
      if (!isMatch)
        return Response.authorizationError(res, messageUtil.INCORRECT_PASSWORD);
      const token = await jwtHelper.issue({ _id: user._id });
      return Response.success(res, messageUtil.LOGIN_SUCCESS, user, token);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  UpdateUser = async (req, res) => {
    try {
      let user = await userService.findUser(req.userId);
      if (!user) return Response.notFound(res, messageUtil.USER_NOT_FOUND);
      user = await userService.updateUser(user._id, req.body);
      if (!user) return Response.notFound(res, messageUtil.USER_NOT_FOUND);
      return Response.success(res, messageUtil.OK, user);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  getUserDetails = async (req, res) => {
    try {
      const { userId } = req;
      const user = await userService.findUser(userId);
      if (!user) return Response.notFound(res, messageUtil.USER_NOT_FOUND);
      return Response.success(res, messageUtil.USER_DETAILS_FETCHED, user);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  ForgotPasswordEmail = async (req, res) => {
    const {
      body: { email },
    } = req;
    try {
      const user = await userService.forgotPasswordEmail(email);
      if (!user) {
        return Response.notFound(res, messageUtil.USER_NOT_FOUND);
      }

      const token = jwtHelper.issue({ id: user._id });
      const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
      const mailOptions = {
        from: process.env.HOST_EMAIL,
        to: email,
        subject: "Reset Password",
        html: `<div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #ddd;">
              <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px; color: #333;">
              To reset your password, please click the following link:
              </p>

                <a href="${resetLink}" style="display: inline-block; font-size: 16px; color: #ffffff; background-color: #3076B1; padding: 12px 20px; text-decoration: none; border-radius: 4px; margin-bottom: 20px;">
                  Reset Password
                </a>

                <p style="font-size: 14px; line-height: 1.5; margin-top: 20px; color: #555;">
                  If you did not request a password reset, please ignore this email.
                </p>

                <p style="font-size: 14px; color: #777; margin-top: 30px;">
                  Thank you,<br>
                  Task Management
                </p>
              </div>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error);
        } else {
          console.log("Email sent: ", info.response);
        }
      });

      return Response.success(res, messageUtil.FORGOT_PASSWORD_EMAIL_SENT);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  ResetPassword = async (req, res) => {
    try {
      const {
        body: { password },
        params: { token },
      } = req;
      const { id } = jwtHelper.verify(token);
      const user = await userService.resetPassword(
        id,
        { password: await bcryptHash(password) },
        { new: true }
      );
      if (!user) {
        return Response.notFound(res, messageUtil.USER_NOT_FOUND);
      }
      return Response.success(res, messageUtil.PASSWORD_RESET_SUCCESS);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  DeleteUser = async (req, res) => {
    const {
      params: { userId },
    } = req;
    try {
      let user = await userService.findUser({ _id: userId });
      if (!user) return Response.notFound(res, messageUtil.USER_NOT_FOUND);
      user = await userService.deleteUser({ _id: userId });

      return Response.success(res, messageUtil.OK, user);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  logout = async (req, res) => {
    try {
      res.clearCookie("token");
      return Response.success(res, messageUtil.LOGOUT_SUCCESS);
    } catch (error) {
      return Response.serverError(res, error);
    }
  }
}

export default new UserConroller();
