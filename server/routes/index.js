const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");
const uploadController = require("../controllers/upload_controller");
const upload = require("../multer.js");
const cloudinary = require("../config/cloudinary");

// Require our controllers.
router.get("/", homeController.home);
router.post("/upload", upload.array("image"), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, "Images");

  console.log("This is req", req.files);

  if (req.method === "POST") {
    const urls = [];
    const files = req.files;
    console.log("This is files", files);
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      console.log("This is new path", newPath);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    console.log("This is data", urls);
    res.status(200).json({
      message: "Images uploaded successfully",
      data: urls,
    });
  } else {
    res.status(405).json({
      err: "Images not uploaded successfully",
    });
  }
});

module.exports = router;
