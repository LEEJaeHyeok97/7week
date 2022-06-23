import { Router } from "express";
import models, { Emails } from "../models" // models 의 파일 실행
const router = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

var corsOptions = {
    origin: 'http://localhost:3001',
    Credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  
  /*var corsOptions = {
    origin: function (origin, callback) {
      // db.loadOrigins is an example call to load
      // a list of origins from a backing database
      db.loadOrigins(function (error, origins) {
        callback(error, origins)
      })
    }
  }*/

router.get('/get', cors(), async(req, res)=>{
    return res.json({
        data: 'res'
    })
});

//회원가입
//7주차 과제 1 단방향 암호화 -> 성공
router.post('/register', cors(), async(req, res) => {
    const { email } = req.body;
    const { password } = req.body;

    // async await 으로 이것 먼저 처리하게 함 
    const user1 =  await Emails.findOne({ where: { email, password }});
    if(user1){
        return res.json({
            "error": "User already exist"
        });
    }

    const hashed = await bcrypt.hash(password, 10);
    //user.create 전부 promise임 -> await 써야됨
    const email_list = await Emails.create({
        email,
        //password,
        password: hashed,
    });



    
    return res.json({
        "data" : {
            user: {
                id: email_list.id
            }
        }
    });

});


//로그인
router.post('/login', async(req, res) => {
    const { email, password } = req.body;
    //findOne으로 했을때 password를 찾을 수 없었고 findAll 시 password를 제대로 찾게됨
    const user = await Emails.findAll({ where: { email }});

    //토큰 발급
    //데이터베이스에서 아이디를 찾았을때 id, 토큰 출력
    if(user[0]) {
        
        
        if(user[0]){
            const compares = bcrypt.compareSync(password, user[0].password);
            if(compares){

            const newUserToken = jwt.sign({
                id: user[0].id,
                email: req.body.email,
                password: req.body.password,
            }, process.env.JWT_SECRET, {
                expiresIn : '10m',
                issuer: 'nodebird',
            });
        
        return res.status(200).json({msg: "로그인 성공 토큰이 발급되었습니다. 유효기간 10분", newUserToken});
        }

        }
        else
        //아이디를 데이터베이스에서 못찾았을때
            return res.status(404).json({msg : "로그인 실패"});
        
}

    else
        return res.status(400).json('아이디 없음');
});




export default router;

