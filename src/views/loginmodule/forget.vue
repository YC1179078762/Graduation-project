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
      type="password"
      clearable
      class="inputbtn"
      v-model="U_password"
      label="密码"
      maxlength="16"
      placeholder="密码"
      label-width="1.4rem"
    />
    <div class="msgBox">
      <span> {{ msg }}</span>
    </div>
    <div>
      <button class="loginBtn" @click="Code">获取验证码</button>
    </div>
    <div>
      <button class="loginBtn" @click="login">登录</button>
    </div>
    <loginBtn class="loginRouter"></loginBtn>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import headTop from "../../components/common/head-top";
import loginBtn from "../../components/common/login-btn";
export default {
  components: {
    headTop,
    loginBtn,
  },
  data() {
    return {
      U_password: "yc123456780",
      U_tel: "15338526500",
      msg: "",
      ceshi: "",
    };
  },
  computed: {
    ...mapGetters(["token"]),
  },
  mounted() {},
  methods: {
    telcode() {
      this.msg = "";
    },
    codeNumber() {
      var self = this;
      self.U_tel = self.U_tel.replace(/[^\d]/g, "");
    },
    async Code() {
      const data = await this.$axios.post("http://192.168.0.174:3000/code", 
        {
          U_tel : this.U_tel
        },
    );
      console.log(data);
    },
    async login() {
      const data = await this.$axios.post("http://192.168.0.174:3000/codem",{
       U_tel: this.U_tel,
       U_code:'463625'
      });
      console.log(data)
    },
    // async loginCode() {
    //   var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    //   var U_tel = this.U_tel;
    //   var U_password = this.U_password;
    //   if (U_tel === "") {
    //     this.msg = "手机号不能为空";
    //   } else if (U_tel.length != 11 || !reg.test(U_tel)) {
    //     this.msg = "请输入正确的手机号";
    //   } else {
    //     let data = await this.$axios.post("http://192.168.0.174:3000/login", {
    //       U_tel: U_tel,
    //       U_password: U_password,
    //     });
    //     console.log(data.data);
    //     var a = parseInt(data.data.msg);
    //     switch (a) {
    //       case 103:
    //         localStorage.setItem("token", data.data.token);
    //         console.log(localStorage.getItem("token"))
    //         localStorage.setItem("user_tel", U_tel);
    //         localStorage.setItem("user_pwd", U_password);
    //         localStorage.setItem("username", data.data.creator.C_username);
    //         localStorage.setItem("u_id", data.data.creator.C_u_id);
    //         localStorage.setItem("creator", data.data.creator);
    //         var a = localStorage.getItem("creator")
    //         console.log(a)
    //         localStorage.setItem(
    //           "backgroundUrl",
    //           data.data.creator.C_backgroundUrl
    //         );
    //         this.$store.commit("setToken", localStorage.getItem("token"));
    //         this.$store.commit(
    //           "setUserC_backgroundUrl",
    //           localStorage.getItem("backgroundUrl")
    //         );
    //         this.$store.commit(
    //           "setUserC_username",
    //           localStorage.getItem("username")
    //         );
    //         this.$store.commit("setUserC_u_id", localStorage.getItem("u_id"));
    //         this.$store.commit("setLogin", true);
    //         this.$router.push("/");
    //         break;
    //       default:
    //         this.msg = "账号或密码不正确";
    //         break;
    //     }
    //   }
    // },
  },
};
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
.msgBox {
  color: red;
  height: 14px;
  font-size: 12px;
  margin-top: 5px;
  margin-left: 5%;
}
.loginBtn {
  border: 0px;
  width: 90%;
  margin-left: 5%;
  font-size: 14px;
  margin-top: 15px;
  height: 40px;
  border-radius: 40px;
  color: #fff;
  background: linear-gradient(
    -90deg,
    rgba(63, 205, 235, 1),
    rgba(188, 226, 158, 1)
  );
  opacity: 0.7;
  text-align: center;
  line-height: 40px;
}
.loginRouter {
  margin-top: 20px;
}
</style>