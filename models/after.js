const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let afterSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"users"
       },
       title : {
        type:String,
        required:true 
       },
       after : {
           type : [String],
           required : true
       }
})
module.exports = afterSchema = mongoose.model("afterSchema",afterSchema);