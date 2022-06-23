import express from "express";
import api from "./api";
import { config } from 'dotenv';
import cors from "cors";


const app = express();
const port = 3000;


const corsOptions = {
  origin : "http://localhost:3000/api/posts"
}

app.use(cors(corsOptions));


config();


const { sequelize } = require("./models");

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api", api);


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});