const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data");
const colors = require("colors");
const connectDB = require("./config/db");

dotenv.config({ path: "./.env" });
connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("The API is runing.. ");
});

app.get("/api/chats", (req, res) => {
  res.send(chats);
});

app.get("/api/chats/:id", (req, res) => {
  const chat = chats.find((el) => el._id === req.params.id);
  res.send(chat);
});

app.listen(process.env.PORT, () => {
  console.log(
    `The server i listning at port:- ${process.env.PORT}`.yellow.bold
  );
});
