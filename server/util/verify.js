const jwt = require('jsonwebtoken')
const setting = require('../setting')

const verify = {
	// 设置token
    setToken(email,_id){
        return new Promise(resolve => {
            let token = jwt.sign(
            	// 存储数据，自定义
                { email,_id },
                // 密钥
                setting.token.signKey,
                // 过期时间
                { expiresIn: setting.token.signTime}
            )
            resolve(token)
        })
    },
    getToken(token){
        return new Promise((res, rej) => {
        	// 判断token是否存在，这里是根据空格分割
            if(!token.split(' ').length){
                rej({error: 'The token value is empty'})
            }else{
            	// 解密token并返回数据
                let data = jwt.verify(token.split(' ')[1],setting.token.signKey)
                res(data)
            }
        })
    }
}

module.exports = verify