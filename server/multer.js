const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // console.log("I am in this");
    // console.log(
    // "This is new",
    // new Date().toISOString().replace(/:/g, "-")
    // new Date().toISOString() + "-" + file.originalname
    // );
    console.log("This si file in multer", file);
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  console.log("I am in tbat");
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    console.log("I am in fac");
    cb(null, true);
  } else {
    cb({ message: "Unsupported file type" }, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024,
  },
  fileFilter: fileFilter,
});

module.exports = upload;
