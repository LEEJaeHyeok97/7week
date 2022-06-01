import { Router } from "express";
import { verify } from "jsonwebtoken";
import { Posts } from "../models";
import { verifyToken } from "./middlewares";

const router = Router();


let index = 1;


// tokenVerify
router.post('/info', verifyToken, (req, res) => {
    const {id, password} = req.decoded;
   //토큰이 유효하지 않거나 무언가 안되면 middlewares 에서 컷, 여기까지 안옴
    res.json({
      id,
      password
    })
  })

//정보 요청시 → jwt전송 → jwt 확인 → 정보전송

//글 목록 조회
router.get('/', async(req, res) => {
    const {id, password} = req.body;
    //const { content } = req.body;

    const postDatas = await Posts.findAll({});
    
        return res.json({
            data: postDatas
        });
    

});


//글 개별 항목 조회   !대충 짜놔서 글 생성 코드 만들고 실행하면서 로직을 다시 생각해 보아야함 
router.get('/:postid', async(req, res) => {
    const {id, password} = req.decoded;
    const { postid } = req.params;
    //params로 id값을 받아옴
    const a = await Posts.findOne({ where: {id} });

    if(a) {
        return res.json({
            data: Posts[id]
        });
    }

    return res.json({
        "error": "Post not exist"
    });



});

//글 생성
router.post('/', async(req, res) => {
    //const t = parseInt(req.header("X-User-Id")); //user-Id headers < 복수 === 배열로 만들어짐 , headers 배열이 parseInt 불가능!
    const t = req.decoded.id;
    console.log(t)
    const post_list = await Posts.create({
        content : req.body.content,
        writer : t
        // index++말고 id로 받아오는 방법을 고민 해보았으나 오류가 났음 -> 수정함
    });

    return res.json({
        data: {
            post: {
                //post_list.id 이거 리스트 인덱스값이 출력됨
                id: post_list.id
            }
        }
    });
});


//특정 글 수정  
router.put('/:postId', async(req, res) => {
    //const userId = parseInt(req.header("X-User-Id"));
    const userId = req.decoded.id;
    const { userX } = req.params;
    const { newContent } = req.body.content; 


    const exist = await Posts.findOne({ where : { id : userX , writer : userId }});


    if(exist){
        await Posts.update({
            content : newContent
        }, {
            where: { id: userX, writer : exist.id }
        });

        return res.json({
            data: {
                id: exist.id
            }
        });
    }

    return req.json({
        "error" : "Cannot modify post"
    });


});


//특정 글 삭제
router.delete('/:postId', async(req, res) => {
    const { user } = req.params;
    //console.log(typeof(user), "asdasdaddad")
    const userId = req.decoded.id;
    
    const a = await Posts.findOne({where: { id : user }});

    if(a) {
        await Posts.destroy({
            where: { id : user },
        });
        return res.json({
            data: "Successfully deleted"
        });
    }

    return res.json({
        "error" : "Cannot delete post"
    });
});









export default router;