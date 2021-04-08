<template>
  <div>
    <headTop headTitle="目录"></headTop>
  <van-list
>
  <van-cell v-for="(item , index) in list" :key="index" :title="item.num" @click="neirong(item.url)" />
</van-list>
  </div>
</template>

<script>
import headTop from "../../components/common/head-top";
export default {
  components:{
    headTop
  },
    created(){
      console.log(123)
      this.list = this.$store.getters.showC
    },
    data(){
        return{
            list:[],
        }
    },
    methods:{
        neirong(url){
            this.$router.push('/bookstore')
            this.$store.commit('addUrl',url)
        }
        // async jiazai(url){ @load="jiazai(this.$store.getters.show)"
        //   this.length = this.list.length+1
        //   const data = await this.$axios.get("http://47.114.147.221/?xsurl1=" +url)
        //   for(let i=this.length;i<length+100;i++){
        //     this.list.push(data.data.list[i])
        //   }
        // }
    }
};
</script>

<style>
</style>