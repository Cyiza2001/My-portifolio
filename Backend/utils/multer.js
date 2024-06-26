const multer = require("multer");
const path = require("path");
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".JPG" &&
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".JPEG" &&
      ext !== ".png" &&
      ext !== ".PNG"
    ) {
      cb(new Error("File is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
