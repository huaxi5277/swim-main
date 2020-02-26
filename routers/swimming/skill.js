const express = require('express')
const router = express.Router()
const swimSchema = require('../../models/skill')
const User = require('../../models/users')
// 测试接口 

router.get('/',(req,res)=>{
    res.send({message : "skill working ......"})
})

// 创建数据接口  蛙泳 自由泳 蝶泳 仰泳 
router.post('/save', async (req,res)=>{
   const _id  = (await User.find({}))[0].id
   let templateSwim = {}
   templateSwim.user = _id;
   if(req.body.title) templateSwim.title = req.body.title;
   if(req.body.depiction) templateSwim.depiction = req.body.depiction;
   if (typeof req.body.love !== "undefined") {
    templateSwim.love = req.body.love.split(",");
   }
   templateSwim.botIntro = {}
   if(req.body.his) templateSwim.botIntro.his = req.body.his
   if(req.body.baseSkill) templateSwim.botIntro.baseSkill = req.body.baseSkill
   if(req.body.senior)  templateSwim.botIntro.senior = req.body.senior
   if(req.body.competition) templateSwim.botIntro.competition = req.body.competition
   
   const title = req.body.title
   //  数据表中   先查 
   let isFind =  await swimSchema.findOne({title})
   if(isFind){
    // 更新 
    swimSchema.findOneAndUpdate({title}, { $set: templateSwim }, { new: true }).then(swimschema => res.json(swimschema));
   }
   else{
       // 无信息 直接插入
    new swimSchema(templateSwim).save().then(swimschema=>res.json(swimschema))
   }
})


module.exports = router