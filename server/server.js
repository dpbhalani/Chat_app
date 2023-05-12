const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const chats = require("./data");

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
  console.log(`The server i listning at port:- ${process.env.PORT}`);
});
