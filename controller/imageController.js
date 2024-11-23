import cloudnary from "cloudinary";
import Response from "../utils/response.js";
import messageUtil from "../utils/messageUtil.js";

class ImageController {
    UploadImage = async (req, res) => {
      console.log("Hello World")
        try {
          cloudnary.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUDNARY_API_KEY,
            api_secret: process.env.CLOUDNARY_API_SECRECT,
          });
          if (!req.file)
            return Response.badRequest(res, messageUtil.FILENOTUPLOADED);
          const fileBase64 = `data:${
            req.file.mimetype
          };base64,${req.file.buffer.toString("base64")}`;
          let result = await cloudnary.uploader.upload(fileBase64);
    
          return Response.success(res, messageUtil.OK, { url: result.secure_url });
        } catch (error) {
          return Response.serverError(res, JSON.stringify(error));
        }
      };
}

export default new ImageController();