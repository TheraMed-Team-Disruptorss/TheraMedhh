const express = require("express");
const app = express();
const http= require("http");
const socketio=require("socket.io");
const server=http.createServer(app);
const io=socketio(server)

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require('express-session');
dotenv.config();
const passport = require("passport");
const { loginCheck } = require("./auth/passport");
loginCheck(passport);

// Mongo DB conncetion
const database = process.env.MONGOLAB_URI;
mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("e don connect"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/views'));


//BodyParsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));
  

app.use(passport.initialize());
app.use(passport.session());
//Routes
app.use("/", require("./routes/PatientRoutes"));

const PORT = process.env.PORT || 4111;

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
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
});
})
const { v4: uuidV4 } = require('uuid')

// app.set('view engine', 'ejs')
// app.use(express.static('public'))

app.get('/video', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/video:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

server.listen(PORT, console.log("Server has started at port " + PORT));




// const io = require("socket.io")(8000, {
//   cors: {
//     origin: "*",
//   },
// });

// const users = {};

// io.on("connection", (socket) => {
//   socket.on("new-user-joined", (name) => {
//     console.log("New user", name);
//     users[socket.id] = name;
//     socket.broadcast.emit("user-joined", name);
//   });

//   socket.on("send", (message) => {
//     socket.broadcast.emit("receive", {
//       message: message,
//       name: users[socket.id],
//     });
//   });

//   socket.on("disconnect", (message) => {
//     socket.broadcast.emit("left", users[socket.id]);
//     delete users[socket.id];
//   });
// });
