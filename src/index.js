import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "morgan";
import mongoose from "mongoose";
import { handleError } from "./utils/error";
import userRouter from "./routes/userRouter";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(logger("dev"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to node js & Express" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening...`);
});

app.use("/user", userRouter);

app.use((err, req, res, next) => {
  console.log(err);
  handleError(err, res);
});

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Mongo database is running!");
    }
  }
);
