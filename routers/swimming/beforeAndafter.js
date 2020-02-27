const express = require('express')
const router = express.Router()
const Before  = require('../../models/before')
const After  = require('../../models/after')
const User = require('../../models/users')
// 测试接口 

router.get('/',(req,res)=>{
 res.send({message : "ba working ......"})
})
// 泳前 
router.post('/saveB', async (req,res)=>{
    const _id  = (await User.find({}))[0].id
    let templateSwim = {}
    templateSwim.physical = []
    templateSwim.user = _id;
    if(req.body.title) templateSwim.title = req.body.title;
    if(req.body.content)  templateSwim.physical.push(req.body.content)
    const title = req.body.title
    //  数据表中   先查 
    let isFind =  await Before.findOne({title})
    if(isFind){
     // 更新 
     Before.findOneAndUpdate({title}, { $set: templateSwim }, { new: true }).then(swimschema => res.json(swimschema));
    }
    else{
        // 无信息 直接插入
     new Before(templateSwim).save().then(swimschema=>res.json(swimschema))
    }
 })

// 更新
router.post('/saveA', async (req,res)=>{
    const _id  = (await User.find({}))[0].id
    let templateSwim = {}
    templateSwim.physical = []
    templateSwim.user = _id;
    if(req.body.title) templateSwim.title = req.body.title;
    if(req.body.content)  templateSwim.physical.push(req.body.content)
    const title = req.body.title
    //  数据表中   先查 
    let isFind =  await After.findOne({title})
    if(isFind){
     // 更新 
     After.findOneAndUpdate({title}, { $set: templateSwim }, { new: true }).then(swimschema => res.json(swimschema));
    }
    else{
        // 无信息 直接插入
     new After(templateSwim).save().then(swimschema=>res.json(swimschema))
    }
 })
//  // 增加 
 router.post('/addA',(req,res)=>{
    const {title,content} = req.body
    After.find({title}).then((result)=>{
    if(result[0].after){
       result[0].after.unshift(content)
    }
    After.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
  })
})
router.post('/addB',(req,res)=>{
    const {title,content} = req.body
    Before.find({title}).then((result)=>{
    if(result[0].before){
       result[0].before.unshift(content)
    }
    Before.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
  })
})
// // 全部数据接口
router.get('/allB',(req,res)=>{
    Before.find({}).then((result)=>{
      res.json(result)
    }).catch((err)=>{
       res.status(400).json({msg:"数据获取失败"}) 
    })
})

router.get('/allA',(req,res)=>{
    After.find({}).then((result)=>{
      res.json(result)
    }).catch((err)=>{
       res.status(400).json({msg:"数据获取失败"}) 
    })
})

router.post('/deleteBefore',(req,res)=>{
    const {title,index} = req.body
    Before.find({title}).then((result)=>{
        if(result[0].before){
            result[0].before.splice(index,1)
        }

        Before.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
      })
})

router.post('/deleteAfter',(req,res)=>{
    const {title,index} = req.body
    After.find({title}).then((result)=>{
        if(result[0].after){
            result[0].after.splice(index,1)
        }

        After.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
      })
})

// // 改
router.post('/findbefore',(req,res)=>{
    const {title,content,newContent} = req.body
    Before.find({title}).then((result)=>{
    if(result[0].before){
       const index =result[0].before.findIndex((item)=>{
         return item === content
          
       })
      result[0].before.splice(index,1,newContent)
    }
    Before.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
  })
  })
  router.post('/findafter',(req,res)=>{
    const {title,content,newContent} = req.body
    After.find({title}).then((result)=>{
    if(result[0].after){
       const index =result[0].after.findIndex((item)=>{
         return item === content
          
       })
      result[0].after.splice(index,1,newContent)
    }
    After.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
  })
  })
module.exports = router