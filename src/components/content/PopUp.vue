<template>
  <div>
    <div class="kong"></div>
    <div class="popup-search">
      <van-search
        shape="round"
        @click="$router.push('/search')"
        placeholder="请输入搜索关键词"
      >
        <template #left>
          <van-icon @click="showPopup1" size="30px" name="friends-o" />
        </template>
      </van-search>
    </div>
    <van-popup
      v-model="xixi"
      position="left"
      style="background-color: rgb(247, 248, 250)"
      :style="{ width: '75%', height: '100%' }"
    >
      <div class="popup-login">
        <div v-show="!login">
          <span class="iconfont icon-wode"></span>
          <span @click="$router.push('/login')">立即登录</span>
        </div>
        <div v-show="login">
          <span class="iconfont icon-wode"></span>
          <span>{{ userC_username }}</span>
        </div>
      </div>
      <div class="popup-main">
        <div class="popup-main-title">
          <van-cell title="我的消息" is-link />
          <van-cell title="云贝中心" is-link />
        </div>
        <div class="popup-main-title">
          <van-cell title="云村有票" is-link />
          <van-cell title="商城" is-link />
          <van-cell title="游戏专区" is-link />
          <van-cell title="口袋彩铃" is-link />
        </div>
        <div class="popup-main-title">
          <van-cell title="设置" is-link />
          <van-cell title="夜间模式" is-link />
          <van-cell title="定时关闭" is-link />
          <van-cell title="个性装扮" is-link />
        </div>
        <div class="popup-main-title">
          <van-cell title="关闭music" @click="tuichu()" />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "popup-icon",
  props: {
    data: Array,
  },
  data() {
    return {
      xixi: false,
    };
  },
  computed: {
    ...mapGetters(["login", "userC_username"]),
  },
  methods: {
    showPopup1() {
      this.xixi = true;
      console.log("123");
    },
    tuichu() {
      console.log(1);
      localStorage.removeItem("token");
      localStorage.removeItem("user_tel");
      localStorage.removeItem("user_pwd");
      localStorage.removeItem("username");
      localStorage.removeItem("u_id");
      localStorage.removeItem("creator");
      this.$store.commit("setLogin", false);
      this.$store.commit("setToken", localStorage.getItem("token"));
      this.$store.commit(
        "setUserC_backgroundUrl",
        localStorage.getItem("backgroundUrl")
      );
      this.$store.commit("setUserC_username", localStorage.getItem("username"));
      this.$store.commit("setUserC_u_id", localStorage.getItem("u_id"))
    },
  },
};
</script>

<style lang="less" scoped>
.kong {
  width: 100%;
  height: 55px;
}
.popup-main {
  height: 40px;
  background-color: rgb(247, 248, 250);
  width: 100%;
  .popup-main-title {
    width: 90%;
    margin: 15px 0;
    margin-left: 5%;
    border-radius: 20px;
  }
  .popup-xian {
    height: 10px;
  }
}
.popup-search {
  width: 100%;
  height: 55px;
  top: 0;
  position: fixed;
  z-index: 10;
}
.popup-login {
  margin: 10px 5% 0 5%;
  height: 30px;
  display: flex;
  font-size: 14px;
  align-items: center;
  span {
    margin: 0px 5px;
  }
}
</style>