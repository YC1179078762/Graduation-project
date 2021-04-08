<template>
  <div>
      <button class="loginBtn" >
            {{btn}}
      </button>
  </div>
</template>

<script>
export default {
    props:['btn']
}
</script>

<style lang="less" scoped>
.loginBtn{
    border: 0px;
    width: 90%;
    margin-left: 5%;
    font-size: 14px;
    margin-top: 20px;
    height: 40px;
    border-radius: 40px;
    color:#fff;
    background:linear-gradient(#0e83ef,#3297fa);
    opacity:0.7;
    text-align: center;
    line-height: 40px;
}
</style>