import jwtHelper from "../utils/jwt.js";
import Response from "../utils/response.js";
import messageUtil from "../utils/messageUtil.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return Response.notFound(res, messageUtil.TOKEN_EMPTY);
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return Response.notFound(res, messageUtil.TOKEN_EMPTY);
    }

    const isVerified = jwtHelper.verify(token);

    if (!isVerified) {
      return res.status(401).json({
        success: false,
        message: "Token is not valid",
        missingParameters: ["login_token"],
      });
    }

    req.userId = isVerified._id;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default { isAuthenticated };
