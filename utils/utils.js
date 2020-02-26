//  工具类函数 
const isEmpty = require('../validation/is-empty')

class utils {
    passwordCompare(password1,password2){
        var p1 = password1.toString().trim()
        var p2 = password2.toString().trim()
        return new Promise((resolve,reject)=>{
           if(p1.length!==p2.length){
               reject && reject({callmsg:true,discribtion : "密码长度错误"})
           }
           for(let i = 0;i<p1.length;i++){
               if(p1[i]!==p2[i]){
                reject && reject({callmsg:true,discribtion : "密码不一致"})  
            }
        }
        resolve && resolve({callmsg:true,discribtion : "密码正确"})
        })
        }
}


module.exports  = new utils()