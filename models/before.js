const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let beforeSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"users"
       },
       title : {
        type:String,
        required:true 
       },
       before : {
           type : [String],
           required : true
       }
})
module.exports = beforeSchema = mongoose.model("beforeSchema",beforeSchema);