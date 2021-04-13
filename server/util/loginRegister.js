const express = require('express')
const user = require('../model/user')
const md5 = require('md5')
const creator = require('../model/creator')
const router = express()
const song = require('../model/songs')
const songSheet = require('../model/songSheet')
const ZhenzismsClient = require('../db/zhenzisms')
var ObsClient = require('esdk-obs-nodejs');
const Jwt = require('./jwt')
const code =require('../model/code')
var client = new ZhenzismsClient('sms_developer.zhenzikj.com', '106884', 'ODY4NzhjNzAtMThmNC00NDdmLWE0YzUtMDgwMGQzOGM1NDY2');
var obsClient = new ObsClient({
    access_key_id: 'RZHGLYWRGMEBBGEW4ZY2',
    secret_access_key: 'zdtoScdPlireNnMvIWdTcezM6rpLVBqibeGDAziQ',
    server: 'https://ycmusic.obs.cn-southwest-2.myhuaweicloud.com'
});
//中间件获取req.body中的数据
// var multipart = require('connect-multiparty')
// var multipartMiddleware = multipart()
// router.use(bodyParser.json)
var registerCode= []
//注册
router.post('/register'/*, multipartMiddleware*/, async (req, res) => {
    console.log(req.body)
    let { U_tel, U_name, U_password, re_password, C_backgroundUrl, U_code } = req.body
    const telReg = /^1[3|4|5|7|8][0-9]{9}$/
    const nameReg = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,12}$/
    const passwordReg = /^(\w){6,20}$/
    if (!telReg.test(U_tel)) {
        console.log(U_tel)
        res.send({
            status: 200,
            msg: '101',

        })
    } else if (!nameReg.test(U_name)) {
        res.send({
            status: 200,
            msg: '102'
        })//验证昵称是否合法
    } else if (!passwordReg.test(U_password)) {
        res.send({
            status: 200,
            msg: '103'
        })//验证密码是否合法
    } else if (U_password !== re_password) {
        res.send({
            status: 200,
            msg: '104'
        })
        验证确认密码是否一致
    } else if (U_code !== code) {
        res.send({
            status: 200,
            msg: '105'
        })
    } else {
        try {
            let findResult = await user.findOne({ U_tel })
            if (findResult) {
                res.send({
                    status: 200,
                    msg: '106'
                })//手机号已被注册
                console.log(`用户${U_tel}已被注册`)
            } else {

                await user.create({ U_tel, U_name, U_password: md5(U_password), U_type: 'user' })
                res.send('106')//注册成功
                console.log(`用户${U_tel}注册成功`)
                await creator.create({ C_username: U_name, C_backgroundUrl, C_u_id: U_tel })
            }
        } catch (err) {
            console.log(err)
            res.send('网络不稳定')
        }
    }
})
//登录
router.post('/login'/*, multipartMiddleware*/, async (req, res) => {
    let { U_tel, U_password } = req.body
    console.log(req.body)
    console.log(req.query)
    const telReg = /^1[3|4|5|7|8][0-9]{9}$/
    const passwordReg = /^(\w){6,20}$/
    if (!telReg.test(U_tel)) {
        res.send({
            status: 200,
            msg: '101',
        })
    } else if (!passwordReg.test(U_password)) {
        res.send({
            status: 200,
            msg: '102'
        })//验证密码是否合法
    } else {
        try {
            let findResult = await user.findOne({ U_tel, U_password: md5(U_password) })
            if (findResult) {
                let find = await creator.findOne({ C_u_id: U_tel })
                let _id = findResult._id
                let jwt = new Jwt(_id);
                let token = jwt.generateToken();
                res.send({
                    status: 200,
                    msg: '103',
                    token: token,
                    creator: find,
                })//登录成功    
                console.log(`用户${U_tel}登录`)
            } else {
                res.send({
                    status: 200,
                    msg: '104'
                })//账号或密码不正确

            }
        } catch (err) {
            console.log(err)
            res.send('网络不稳定')
        }
    }
})
//修改密码
router.post('/update'/*, multipartMiddleware*/, async (req, res) => {
    let { U_tel, U_password } = req.body
    const telReg = /^1[3|4|5|7|8][0-9]{9}$/
    const passwordReg = /^(\w){6,20}$/
    if (!telReg.test(U_tel)) {
        res.send({
            status: 200,
            msg: '101'
        })
    } else if (!passwordReg.test(U_password)) {
        res.send({
            status: 200,
            msg: '102'
        })//验证昵称是否合法
    } else {
        try {
            let findResult = await user.findOne({ U_tel, U_password: md5(U_password) })
            if (findResult) {
                res.send({
                    status: 200,
                    msg: '101'
                })//登录成功
                console.log(`用户${U_tel}登录`)
            } else {
                res.send({
                    status: 200,
                    msg: '102'
                })//账号或密码不正确

            }
        } catch (err) {
            console.log(err)
            res.send('网络不稳定')
        }
    }
})
//发送验证码
router.post('/code', async (req, res) => {
    let { U_tel } = req.body
    console.log(U_tel)
    console.log(req.body)
    const telReg = /^1[3|4|5|7|8][0-9]{9}$/
    if (!telReg.test(U_tel)) {
        res.send('101')
    } else {
        try {
            let findResult = await user.findOne({ U_tel })
            if (findResult) {
                res.send('105')//手机号已被注册
                console.log(`用户${U_tel}已被注册`)
            } else {
                var code = "";
                for (var i = 1; i <= 6; i++) {
                    const num = Math.floor(Math.random() * 10);
                    code += num;
                }
                var params = {};
                params.templateId = '2237';
                params.number = U_tel;
                params.templateParams = [code, "5"];
                var res = client.send(params);
                await code.create({C_code:code,C_tel:U_tel})
            }
        } catch (err) {
            console.log(err)
        }
    }
})
router.post('/codem', async (req, res) => {
    let { U_tel, U_code } = req.body
    
    console.log(num)
    console.log(U_code)
    const telReg = /^1[3|4|5|7|8][0-9]{9}$/
    if (!telReg.test(U_tel)) {
        res.send('101')
    } else{
       const findResult = await code.find({C_code:U_code,C_tel:U_tel})
    }
})
//查找歌曲
router.get('/find/song', async (req, res) => {
    let { So_name } = req.query
    var str = So_name + ".*$"
    var reg = new RegExp(str)
    console.log(So_name)
    console.log(123)
    let findResult = await song.find({ So_name: { $regex: reg, $options: 'i' } })
    res.send(findResult)


})
//查找歌手
router.get('/find/singer', async (req, res) => {
    let { Sname } = req.query
    var str = Sname + ".*$"
    var reg = new RegExp(str)
    console.log(Sname)
    let findResult = await two.find({ ar: { $regex: reg, $options: 'i' } })
    res.send(findResult)
    console.log(findResult)
})
//查找歌单
router.get('/find/songSheet', async (req, res) => {
    let { Sname } = req.query
    var str = ".*" + Sname + ".*$"
    var reg = new RegExp(str)
    console.log(Sname)
    let findResult = await songSheet.find({ So_text: { $regex: reg, $options: 'i' } })
    res.send(findResult)
    this.$axios.
        console.log(findResult)
})
//上传歌单
router.post('/upload/songSheet', async (req, res) => {
    let { Sl_name, Sl_coverImgUrl, Sl_tags, Sl_creator, Sl_tracks } = req.body
    await songSheet.create(Sl_name, Sl_coverImgUrl, Sl_tags, Sl_creator, Sl_tracks)
})
router.get('/mm', async (req, res) => {
    res.send({
        status: '200',
        url: 'https://ycmusic.obs.cn-southwest-2.myhuaweicloud.com:443/sing/100001.mp3?AccessKeyId=RZHGLYWRGMEBBGEW4ZY2&Expires=1617007522&Signature=0I2rbmT/xfi4sOIXdJQDUxHbQ2U%3D'
    })
    console.log('被调用了')
})
router.post('/m', async (req, res) => {
    res.send({
        msg:req.body

    })
})
// router.get('/g',async(req,res)=>{
//   const data  = await axios.get("https://ycmusic.obs.cn-southwest-2.myhuaweicloud.com:443/lrc/100006.lrc?AccessKeyId=RZHGLYWRGMEBBGEW4ZY2&Expires=1633087077&Signature=WR%2BeV983s/%2BS/sLS3XpR2r2KB40%3D"
//     )

//     console.log( data.data)
//     res.send(data)
// })

module.exports = router