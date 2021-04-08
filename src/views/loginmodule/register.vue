<template>
  <div>
    <head-top headTitle="登录"> </head-top>
    <van-field
      type="tel"
      class="inputbtn"
      v-model="U_tel"
      label="账号"
      clearable
      @click="telcode"
      @keyup="codeNumber"
      placeholder="手机号"
      label-width="1.4rem"
      maxlength="11"
    />
    <van-field
      type="text"
      class="inputbtn"
      v-model="U_username"
      label="账号"
      clearable
      @click="telcode"
      @keyup="codeNumber"
      placeholder="手机号"
      label-width="1.4rem"
      maxlength="11"
    />
    <van-field
    type="password"
      clearable
      class="inputbtn"
      v-model="U_password"
      label="密码"
      maxlength="16"
      placeholder="密码"
      label-width="1.4rem"
    />
    <van-field
    type="password"
      clearable
      class="inputbtn"
      v-model="Re_password"
      label="密码"
      maxlength="16"
      placeholder="密码"
      label-width="1.4rem"
    />
    <div class="msgBox" >
      <span> {{msg}}</span>
    </div>
    <div > 
      <button class="loginBtn" @click="loginCode" >
           登录
      </button>
  </div>
      <loginBtn class="loginRouter"></loginBtn>
  </div>
</template>

<script>
import { Toast } from 'vant'
import headTop from "../../components/common/head-top";
import  loginBtn  from '../../components/common/login-btn'
export default {
  components: {
    headTop,
    loginBtn
  },
  data() {
    return {
      U_password: 'yc123456780',
      U_tel: '15338526500',
      U_username:'杰拉奥拉',  
      Re_password:'yc123456780',
      msg:''
    };
  },
  methods: {
    telcode(){
      this.msg = ''
    },
    codeNumber() {
      var self = this;
      self.U_tel = self.U_tel.replace(/[^\d]/g, "");
    },
    async loginCode(){
      var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      var U_tel = this.U_tel
      var U_password = this.U_password
      var U_username = this.U_username
      var Re_password = this.Re_password
      if(U_tel===''){
        this.msg = '手机号不能为空'
      }else if(U_tel.length!=11 || !reg.test(U_tel)){
        this.msg = "请输入正确的手机号";
      }else{
        let data = await this.$axios.post('http://localhost:3000/register',{
          U_tel:U_tel,
          U_name:U_username,
          U_password:U_password,
          re_password:Re_password,
        })
        console.log(data)
      }

  },
}
}
</script>
<style lang="less" scoped >
.inputbtn {
  background-color: #f1f4f6;
  border-radius: 40px;
  width: 90%;
  left: 5%;
  height: 50px;
  font-size: 14px;
  line-height: 30px;
  margin-top: 12px;
}
.msgBox{
  color: red;
  height: 14px;
  font-size: 12px;
  margin-top: 5px;
  margin-left: 5%;
}
.loginBtn{
    border: 0px;
    width: 90%;
    margin-left: 5%;
    font-size: 14px;
    margin-top: 15px;
    height: 40px;
    border-radius: 40px;
    color:#fff;
    background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
    opacity:0.7;
    text-align: center;
    line-height: 40px;
}
.loginRouter{
  margin-top:20px;
}
</style>