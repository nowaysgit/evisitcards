import express from 'express';
import {config} from "dotenv";
config();
import sequelize from "./db";
import cors from "cors";
import fileUpload from "express-fileupload";
const models = require("./models/models");
const app = express();
const port = process.env.PORT || 5000;
import router from "./routes/index";
import path from "path";
import ErrorMiddleware from "./middleware/ErrorHandlingMiddleware";
import cookieParser from "cookie-parser";
import UserDto from "./dtos/UserDto";

declare global {
  namespace Express {
    interface Request {
      user: UserDto
    }
  }
}

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(ErrorMiddleware)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(port, () => {
      return console.log(`server is listening on ${port}`);
    });
  } catch (e) {
    console.log(e)
  }
};

start().then(r => {console.log(`Started`);});