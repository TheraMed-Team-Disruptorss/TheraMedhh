const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const ejs = require("ejs");
var messagebird = require("messagebird")("xD37ehYHHIcMLlyUbTsbgzSvG");

app.engine("ejs", ejs.renderFile);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("step1");
});

app.post("/step2", (req, res) => {
  console.log("This is req.body", req.body);
  var number = req.body.number;

  messagebird.verify.create(
    number,
    {
      template: "Your verification code is %token.",
    },
    function (err, response) {
      if (err) {
        console.log("There is an error", err);
        res.render("step1", { error: err.errors[0].description });
      } else {
        console.log("This is response ", response);
        res.render("step2", {
          id: response.id,
        });
      }
    }
  );
});

app.post("/step3", (req, res) => {
  var id = req.body.id;
  var token = req.body.token;

  messagebird.verify.verify(id, token, function (err, response) {
    if (err) {
      res.render("step2", {
        id: id,
        error: err.errors[0].description,
      });
    } else {
      res.render("step3");
    }
  });
});

// const fast2sms = require("fast-two-sms");

// var options = {
//   authorization:
//     "zFfLNwrAonbMi7tk3uplTa1ZYVcKOj9syxHEqGPedR2g6SUhJCuFVDe2QhIqPybWJ7grSjU0TtLOXfav",
//   message: "This is a test message",
//   numbers: ["9560945571"],
// };
// fast2sms
//   .sendMessage(options)
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const server = http.createServer(app);
const io = socketio(server);

const upload = require("./multer.js");
const cloudinary = require("./config/cloudinary");

const fs = require("fs");

const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", require("./routes"));

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    console.log("New user", name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });

  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
  });
});

server.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
