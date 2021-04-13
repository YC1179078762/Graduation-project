let mongoose = require('mongoose')
//创建约束
let Schema = mongoose.Schema
//约束条件
let codeSchema = new Schema({
    C_code: {
        type: String,
        required: true,
    },
    C_tel: {
        type: String,
        required: true,
    },
    C_time: {
        type: Date,
        default: Date.now
    },
})
module.exports = mongoose.model('code', codeSchema)