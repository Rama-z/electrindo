const DatauriParser = require("datauri/parser");
const path = require("path");
const cloudinary = require("../config/cloudinary");

module.exports = {
  uploaderProfile: async (req, res, next) => {
    const { file } = req;
    if (!file) return next();
    const parser = new DatauriParser();
    const buffer = file.buffer;
    const ext = path.extname(file.originalname).toString();
    const datauri = parser.format(ext, buffer);
    let random = (Math.random() + 1).toString(36).substring(7);
    const filename = `${random.replace(" ", "_")}_${random}`;
    const cloudinaryOpt = {
      public_id: filename,
      folder: "BlendMedia",
    };
    try {
      const result = await cloudinary.uploader.upload(
        datauri.content,
        cloudinaryOpt
      );
      req.file = result;
      next();
    } catch (err) {
      res.status(err).json({
        msg: err,
        msg2: "Internal Server Error Middleware Cloudinary",
      });
    }
  },
};
