const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageinp");
const messageContainer = document.querySelector(".container");
var audio = new Audio("../../audio/ting.mp3");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "left") {
    audio.play();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});

const name = prompt("Enter Your name to join");
socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  console.log("This is append", append, name);
  append(`${name} joined the chat`, "right");
});

socket.on("receive", (data) => {
  append(`${data.name} : ${data.message}`, "left");
});

socket.on("left", (name) => {
  append(`${name} left the chat`, "left");
});
