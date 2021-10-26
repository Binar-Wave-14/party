require("dotenv").config();

const path = require("path");
const express = require("express");
const userRouter = require("./routes/route")

const app = express();
const PORT = process.env.PORT;

app.set ("view engine", "ejs")
app.use (userRouter)



app.use(express.json());

app.listen(PORT, () => {
  console.log(`server load with port : ${PORT}`);
});
