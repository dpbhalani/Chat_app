const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require("./Routes/userRoute");

dotenv.config({ path: "./.env" });
connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("The API is runing.. ");
});

app.get("/api/chats", (req, res) => {
  res.send(chats);
});

app.use("/api/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `The server i listning at port:- ${process.env.PORT}`.yellow.bold
  );
});
