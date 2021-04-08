<template>
  <div>
    <div class="headtop">
      <div @click="$router.go(-1)"><span class="iconfont icon-fanhui"></span></div>
      <div class="headTitle">{{ headTitle }}</div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["headTitle"],
};
</script>

<style lang="less" scoped>
.headtop {
  display: flex;
  background-color: #ffffff;
  height: 50px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  justify-content: center;
  align-items: center;
  line-height: 50px;
  border-bottom: 1px solid #ececef;
  div {
    height: 50px;
    width: 60px;
  }
  .headTitle {
    flex: 1;
  }
}
</style>