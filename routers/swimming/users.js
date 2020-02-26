const express = require('express')
const router = express.Router()
const User = require('../../models/users')
const passwordCompare = require('../../utils/utils').passwordCompare
// 测试接口 

router.get('/',(req,res)=>{
 res.send({message : "users working ......"})
})


// 存入一条数据  不对外开放的接口 但是 没有设置私有 
router.post('/save',async (req,res)=>{
    const {name} = req.body
    const users = new User({
      name
    })
  let response =  await users.save()
  res.send({callback:true})
})

// 登录接口  对外开发 数据库中只有一条数据
router.post('/login', async (req,res)=>{
    const {email,password} = req.body
       User.findOne({email}).then((user)=>{
    if (!user) {
        return res.json({ msg : false, email: '用户不存在!' });
      }
      passwordCompare(password,user.password)
      .then((result)=>{
      if(result.callmsg){
        res.json({msg : true, discribtion: result.discribtion})
      }
      })
      .catch((err)=>{
       res.json({msg :  err.discribtion})
      })
  })
})
module.exports = router