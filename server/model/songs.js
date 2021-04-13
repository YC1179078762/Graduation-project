let mongoose = require('mongoose')
let Schema = mongoose.Schema
//约束条件
let songSchema = new Schema({
    So_id: {
        type: String,
        unique:true,
    },
    So_name: {
        type: String,  
    },
    So_singer:{
        type: String,
      
    },
    So_lyc: {
        type: String,
     
    },
    So_iurl:{
        type: String,
      
    },
    So_murl: {
        type: String,
    },
    So_tags:{
        type:String,
    }
})
module.exports = mongoose.model('song', songSchema)