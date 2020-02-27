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

// 获取所有数据接口 

router.get('/all',(req,res)=>{
    swimSchema.find({}).then((result)=>{
      res.json(result)
    }).catch((err)=>{
       res.status(400).json({msg:"数据获取失败"}) 
    })
})

// 增 
// 历史接口  反正 指挥取第一条数据

router.post('/history',(req,res)=>{
    const {title,content} = req.body
  swimSchema.find({title}).then((result)=>{
    if(result[0].his){
       result[0].his.unshift(content)
    }
    swimSchema.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
  })
})
// 增 
// 基础技能接口
router.post('/basic',(req,res)=>{
    const {title,content} = req.body
  swimSchema.find({title}).then((result)=>{
    if(result[0].baseSkill){
        result[0].baseSkill.push(content)
    }
    swimSchema.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
  })
})
// 增 
// 进阶技能接口
router.post('/senior',(req,res)=>{
    const {title,content} = req.body
  swimSchema.find({title}).then((result)=>{
    if(result[0].senior){
        result[0].senior.push(content)
    }
    swimSchema.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
  })
})

// 增 
//竞赛技能接口
router.post('/competition',(req,res)=>{
    const {title,content} = req.body
  swimSchema.find({title}).then((result)=>{
    if(result[0].competition){
        result[0].competition.push(content)
    }
    swimSchema.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
  })
})
// 删 
// 基础技能接口
router.post('/deleteBasic',(req,res)=>{
    const {title,index} = req.body
    swimSchema.find({title}).then((result)=>{
        if(result[0].baseSkill){
            result[0].baseSkill.splice(index,1)
        }

        swimSchema.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
      })
})
// 删 高级 
router.post('/deleteSenior',(req,res)=>{
    const {title,index} = req.body
    swimSchema.find({title}).then((result)=>{
        if(result[0].senior){
            result[0].senior.splice(index,1)
        }

        swimSchema.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
      })
})

router.post('/deleteHistory',(req,res)=>{
    const {title,index} = req.body
    swimSchema.find({title}).then((result)=>{
        if(result[0].his){
            result[0].his.splice(index,1)
        }

        swimSchema.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
      })
})

router.post('/deleteCompetition',(req,res)=>{
    const {title,index} = req.body
    swimSchema.find({title}).then((result)=>{
        if(result[0].competition){
            result[0].competition.splice(index,1)
        }

        swimSchema.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
      })
})
// 删除 所有数据接口 

router.post('/deleteAllCompetition',(req,res)=>{
    const {title} = req.body
    swimSchema.find({title}).then((result)=>{
        if(result[0].competition){
            result[0].competition = []
        }

        swimSchema.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
      })
})



router.post('/deleteAllBasic',(req,res)=>{
    const {title} = req.body
    swimSchema.find({title}).then((result)=>{
        if(result[0].baseSkill){
            result[0].baseSkill = []
        }

        swimSchema.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
      })
})


router.post('/deleteAllSenior',(req,res)=>{
    const {title} = req.body
    swimSchema.find({title}).then((result)=>{
        if(result[0].senior){
            result[0].senior = []
        }

        swimSchema.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
      })
})


router.post('/deleteAllHistory',(req,res)=>{
    const {title} = req.body
    swimSchema.find({title}).then((result)=>{
        if(result[0].his){
            result[0].his = []
        }

        swimSchema.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
      })
})


// 改 

router.post('/findhistory',(req,res)=>{
  const {title,content,newContent} = req.body
swimSchema.find({title}).then((result)=>{
  if(result[0].his){
     const index =result[0].his.findIndex((item)=>{
       return item === content
        
     })
    result[0].his.splice(index,1,newContent)
  }
  swimSchema.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
})
})

router.post('/findcompetition',(req,res)=>{
  const {title,content,newContent} = req.body
swimSchema.find({title}).then((result)=>{
  if(result[0].competition){
     const index =result[0].competition.findIndex((item)=>{
       return item === content
        
     })
    result[0].competition.splice(index,1,newContent)
  }
  swimSchema.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
})
})

router.post('/findbasic',(req,res)=>{
  const {title,content,newContent} = req.body
  console.log(newContent);
  
swimSchema.find({title}).then((result)=>{
  if(result[0].baseSkill){
     const index =result[0].baseSkill.findIndex((item)=>{
       return item === content
        
     })
     console.log(index);
     
    result[0].baseSkill.splice(index,1,newContent)
  }
  swimSchema.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
})
})

router.post('/findsenior',(req,res)=>{
  const {title,content,newContent} = req.body
swimSchema.find({title}).then((result)=>{
  if(result[0].senior){
     const index =result[0].senior.findIndex((item)=>{
       return item === content
        
     })
    result[0].senior.splice(index,1,newContent)
  }
  swimSchema.findOneAndUpdate({title},{$set:result[0]},{new : true}).then((callback=>res.json(callback)))
})
})

module.exports = router