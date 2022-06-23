import { Router } from "express";
//import models, { Student } from "../models" // models 의 파일 실행
//import models, { Emails } from "../models" // models 의 파일 실행
import Posts from "./posts";
import Auth from "./auth";


const bcrypt = require('bcrypt');
const { verifyToken } = require('./middlewares');
const app = Router();

app.use("/posts", Posts);
app.use("/auth", Auth);

//app.use("/models", models);


//Create 아래 코드 auth나 posts로 과제 지시대로 옮겨줘야함



/*

models.create({
    name: 'b',
    number: "2",
});

//Read select * from student
Student.findAll({});


//SELECT name, age FROM User WHERE married = 1 AND age > 30;


//Update
Student.update({
    name: '바꿀 내용',
}, {
    where: { id: 1},
});

//Delete
Student.destroy({
    where: { id: 2},
});
*/


export default app;