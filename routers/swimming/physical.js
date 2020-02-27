const express = require('express')
const router = express.Router()
const Physical = require('../../models/physical')
const User = require('../../models/users')
const passwordCompare = require('../../utils/utils').passwordCompare
// 测试接口 

router.get('/',(req,res)=>{
 res.send({message : "physical working ......"})
})

// 更新
router.post('/save', async (req,res)=>{
    const _id  = (await User.find({}))[0].id
    let templateSwim = {}
    templateSwim.physical = []
    templateSwim.user = _id;
    if(req.body.title) templateSwim.title = req.body.title;
    if(req.body.content)  templateSwim.physical.push(req.body.content)
    const title = req.body.title
    //  数据表中   先查 
    let isFind =  await Physical.findOne({title})
    if(isFind){
     // 更新 
     Physical.findOneAndUpdate({title}, { $set: templateSwim }, { new: true }).then(swimschema => res.json(swimschema));
    }
    else{
        // 无信息 直接插入
     new Physical(templateSwim).save().then(swimschema=>res.json(swimschema))
    }
 })
 // 增加 
 router.post('/add',(req,res)=>{
    const {title,content} = req.body
    Physical.find({title}).then((result)=>{
    if(result[0].physical){
       result[0].physical.unshift(content)
    }
    Physical.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
  })
})
// 全部数据接口
router.get('/all',(req,res)=>{
    Physical.find({}).then((result)=>{
      res.json(result)
    }).catch((err)=>{
       res.status(400).json({msg:"数据获取失败"}) 
    })
})

router.post('/deletePhysical',(req,res)=>{
    const {title,index} = req.body
    Physical.find({title}).then((result)=>{
        if(result[0].physical){
            result[0].physical.splice(index,1)
        }

        Physical.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
      })
})

// 改
router.post('/findphysical',(req,res)=>{
    const {title,content,newContent} = req.body
    Physical.find({title}).then((result)=>{
    if(result[0].physical){
       const index =result[0].physical.findIndex((item)=>{
         return item === content
          
       })
      result[0].physical.splice(index,1,newContent)
    }
    Physical.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
  })
  })
module.exports = router