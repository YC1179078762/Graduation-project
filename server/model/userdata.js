let mongoose = require('mongoose')
let Schema = mongoose.Schema
//约束条件
let userSchema = new Schema({
    U_id: {
        type: Number,
        required: true,
        unique: true,
    },
    U_name: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    U_userImg: {
        type: String,
        required: true,
    },
})
module.exports = mongoose.model('userdata', userSchema)