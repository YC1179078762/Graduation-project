<template>
  <div>
    <van-tabs class="book" v-model="number" animated>
      <van-tab 
      v-for="(item,index) in numberList" :title="item.name" :key="index"
      >
       <div class="book">
         开发中
       </div>
      </van-tab>
    </van-tabs>
    <MainPlay></MainPlay>
    <YinFooter> </YinFooter>
  </div>
</template>

<script>
import Vue from "vue";
import MainPlay from "../../components/content/MainPlay";
import { Lazyload } from "vant";
Vue.use(Lazyload);
import YinFooter from "../../components/content/TheFooter";

export default {
  components: {
    YinFooter,
    MainPlay,
  },
  data() {
    return {
      number: 0,
      numberList:[
       {
         name:"广播",
         xux:'广播内容',
       },
       {
         name:"广播",
         xux:'广播内容',
       },
       {
         name:"广播",
         xux:'广播内容',
       },
       {
         name:"广播",
         xux:'广播内容',
       },
       {
         name:"广播",
         xux:'广播内容',
       },
      ]
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.book{
  text-align: center;
  line-height: 200px;
}
</style>