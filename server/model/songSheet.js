let mongoose = require('mongoose')
//创建约束
let Schema = mongoose.Schema
//约束条件
let songSheetSchema = new Schema({
    Sl_name: {
        type: String,
        required: true,
    },
    Sl_id: {
        type: String,
        required: true,
        unique: true,
    },
    Sl_coverImgUrl: {
        type: String,
        required: true,
    },  
    Sl_tags: {
        type: String,
        required: true,
    },
    Sl_creator:{
        type: String,
        required: true,
    },
    Sl_tracks:{
        type: String,
        required:true,
    }
})
module.exports = mongoose.model('songSheet', songSheetSchema)