const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.uploads = (file, folder) => {
  // console.log("This is file name", file);
  // console.log("This is folder name", folder);
  file = file.slice(8, file.length);
  // console.log("This is file name is", file);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        // console.log("This is result", result);
        resolve({
          url: result.url,
          id: result.public_id,
        });
        reject({
          message: "Error in uploading",
        });
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};
