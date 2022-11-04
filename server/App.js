const express = require("express");

const upload = require("./multer.js");
const cloudinary = require("./config/cloudinary");

const fs = require("fs");

const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", require("./routes"));

app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
