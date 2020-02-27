const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let physicalSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"users"
       },
       title : {
        type:String,
        required:true 
       },
       physical : {
           type : [String],
           required : true
       }
})
module.exports = physicalSchema = mongoose.model("physicalSchema",physicalSchema);