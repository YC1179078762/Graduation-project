router.post('/register', multipartMiddleware, async (req, res) => {
    let { U_tel, U_name, U_password, re_password, U_code} = req.body
    const telReg = /^1[3|4|5|7|8][0-9]{9}$/
    const nameReg = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,12}$/
    const passwordReg = /^(\w){6,20}$/
    if (!telReg.test(U_tel)) {
        res.send('101')
        // res.send('101')//验证U_tel是否合法
    } else if (!nameReg.test(U_name)) {
        res.send('102')//验证昵称是否合法
    } else if (!passwordReg.test(U_password)) {
        res.send('103')//验证密码是否合法
    } else if (U_password !== re_password) {
        res.send('104')//验证确认密码是否一致
    } else if(U_code!==code){
    } else {
        try {
            let findResult = await user.findOne({ U_tel })
            if (findResult) {
                res.send('105')//手机号已被注册
                console.log(`用户${U_tel}已被注册`)
            } else {
                // var code = "";
                // for (var i = 1; i <= 6; i++) {
                //     const num = Math.floor(Math.random() * 10);
                //     code += num;
                // }
                // var params = {};
                // params.templateId = '3615';
                // params.number = U_tel;
                // params.templateParams = [num, "5"];
                // var res = client.send(params);
                await user.create({ U_tel, U_name, U_password: md5(U_password) })
                res.send('106')//注册成功
                console.log(`用户${U_tel}注册成功`)

            }
        } catch (err) {
            console.log(err)
            res.send('网络不稳定')
        }
    }
})
router.post('/code', async (req, res) => {
    let { U_tel } = req.body
    const telReg = /^1[3|4|5|7|8][0-9]{9}$/
    if (!telReg.test(U_tel)) {
        res.send('101')
    } else {
        try {
            let findResult = await user.findOne({ U_tel })
            if (findResult) {
                res.send('105')//手机号已被注册
                console.log(`用户${U_tel}已被注册`)
            }else{
                var code = "";
                for (var i = 1; i <= 6; i++) {
                    const num = Math.floor(Math.random() * 10);
                    code += num;
                }
                var params = {};
                params.templateId = '3615';
                params.number = U_tel;
                params.templateParams = [code, "5"];
                var res = client.send(params);

            }
        } catch (err) {
            console.log(err)
        }
    }
})