const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let swimSchema = new Schema({
   user:{
    type:Schema.Types.ObjectId,
    ref:"users"
   },
   title : {
    type:String,
    required:true
   },
   depiction : {
    type:String,
    required:true 
   },
   love : {
    type:[String],
   },
   botIntro :{
        his:{
            type:String,
            required:true
        },
        baseSkill : {
            type:String,
            required:true 
        },
        senior : {
            type:String,
            required:true 
        },
        competition : {
            type:String,
            required:true 
        }
    },
    his : {
        type:[String],
        required:true
    },
    baseSkill : {
        type:[String],
        required:true  
    },
    senior : {
        type:[String],
        required:true 
    },
    competition : {
        type:[String],
        required:true 
    },
    date:{
        type:Date,
        default:Date.now
      }
})
module.exports = swimSchema = mongoose.model("swimSchema",swimSchema);
