const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoute");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.POST || 5000;
app.listen(5000, console.log(`Server started on PORT ${PORT}`));
