const profileRouter = require("express").Router();
const profileController = require("../controller/profile");
const { isLogin } = require("../middleware/isLogin");
const cloud = require("../middleware/cloudinary");
const { memoryStorageUploadProfile } = require("../middleware/multer");
const allowedRole = require("../middleware/allowedRole");

profileRouter.get(
  "/",
  isLogin,
  allowedRole("customer", "admin"),
  profileController.getProfile
);
profileRouter.get(
  "/all/",
  isLogin,
  allowedRole("admin"),
  profileController.getAllUser
);
profileRouter.patch(
  "/edit",
  isLogin,
  allowedRole("customer", "admin"),
  memoryStorageUploadProfile,
  cloud.uploaderProfile,
  profileController.editProfile
);
profileRouter.patch(
  "/ban/:id",
  isLogin,
  allowedRole("admin"),
  profileController.banUser
);

module.exports = profileRouter;
