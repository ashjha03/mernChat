const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/data");

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const id = req.params.id;
  const chat = chats.find((ele) => ele._id === id);
  res.send(chat);
});

const PORT = process.env.POST || 5000;
app.listen(5000, console.log(`Server started on PORT ${PORT}`));
