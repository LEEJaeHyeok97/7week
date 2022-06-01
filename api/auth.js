import { Router } from "express";
import models, { Emails } from "../models" // models 의 파일 실행
const router = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//회원가입
//7주차 과제 1 단방향 암호화 -> 성공
router.post('/register', async(req, res) => {
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
    const user = await Emails.findOne({ where: { email, password }});

    //토큰 발급
    //데이터베이스에서 아이디를 찾았을때 id, 토큰 출력
    if(user) {
        const isEqualPw = Emails.findOne({where: {email, password}});
        // 이거 애먹었는데 처음엔 findOne으로 안하고 compare로 했는데 오류뜸 생각해보니 findOne으로도 될거같아서 해보니 진짜 됨 -> 해결
        //토큰 발급 -> 성공
        
        if(isEqualPw){
            const newUserToken = jwt.sign({
                email: req.body.email,
                password: req.body.password,
            }, process.env.JWT_SECRET, {
                expiresIn : '1m',
                issuer: 'nodebird',
            });
        

        return res.status(200).json({msg: "로그인 성공", newUserToken});
        }

    
    else
    //아이디를 데이터베이스에서 못찾았을때
        
        return res.status(404).json({msg : "로그인 실패"});
        
}

else
    return res.status(400).json('아이디 없음');
});




export default router;

