let mongoose = require('mongoose')
//创建约束
let Schema = mongoose.Schema
//约束条件
let creatorSchema = new Schema({
    C_username: {
        type: String,
        required: true,
    },
    C_backgroundUrl: {
        type: String,
        required: true,
    },
    C_u_id: {
        type: String,
        required: true,
        unique: true,
    },
})
module.exports = mongoose.model('creator',creatorSchema)