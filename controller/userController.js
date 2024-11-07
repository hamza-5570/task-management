import jwtHelper from "../utils/jwt.js";
import Response from "../utils/response.js";
import messageUtil from "../utils/messageUtil.js";
import userService from "../services/userServices.js";
import { bcryptHash, comparePassword } from "../utils/password.js";

class UserConroller {
  SignUp = async (req, res) => {
    try {
      let user = await userService.findByEmail(req.body.email);

      if (user) return Response.ExistallReady(res, messageUtil.ALL_READY_EXIST);

      user = await userService.createUser({
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
}

export default new UserConroller();
