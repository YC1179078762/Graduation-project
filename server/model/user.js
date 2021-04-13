let mongoose = require('mongoose')
let Schema = mongoose.Schema
        //约束条件
        let userSchema = new Schema({
            U_tel: {
                type: Number,
                required: true,
                unique: true,
            },
            U_name:{
                type:String,
                required: true,
            },
            U_password: {
                type: String,
                required: true,
            },
            U_type:{
                type:String,
                required:true,
            },
            U_time:{             
                    type:Date,
                    default:Date.now
            }
            
        })
module.exports = mongoose.model('user', userSchema)