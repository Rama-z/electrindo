const profileRouter = require("express").Router();
const profileController = require("../controller/profile");
const { isLogin } = require("../middleware/isLogin");
const cloud = require("../middleware/cloudinary");
const { memoryStorageUploadProfile } = require("../middleware/multer");

profileRouter.get("/", isLogin, profileController.getProfile);
profileRouter.get("/all/", isLogin, profileController.getAllUser);
profileRouter.patch(
  "/edit",
  isLogin,
  memoryStorageUploadProfile,
  cloud.uploaderProfile,
  profileController.editProfile
);
profileRouter.patch("/ban/:id", isLogin, profileController.banUser);

module.exports = profileRouter;
