const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name : {
      type : String,
      required:true
  },
  email:{
    type:String,
    default: 'xiaobo@qq.com'
  },
  password:{
    type:String,
     default : 'xxxxxx'
  },
})

module.exports = User = mongoose.model("users",UserSchema);