<template>
  <div>
    <div class="login-bottom">
      <div class="btnLeft" @click="$router.push('/register')" >用户注册</div>
      <div class="btnRight" @click="$router.push('/forget')" >忘记密码</div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{

  }
};
</script>
<style lang="less" scoped>
.login-bottom {
  width: 90%;
  margin-left: 5%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  font-size: 12px;
  color: #a5a7af;
  font-weight: 400;
  div {
    width: 50%;
  }
  .btnRight {
  text-align: right;
  }
}
</style>