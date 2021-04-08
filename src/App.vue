<template>
  <div id="app">
    <song-audio />
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SongAudio from "./components/common/SongAudio";
export default {
  data() {
    return {
      transitionName: "",
    };
  },
  components: {
    SongAudio,
  },
  computed: {
    ...mapGetters(["songsList"]),
  },
  created() {
    this.$store.commit("setToken", localStorage.getItem("token"));
  },
  mounted() {
    if (this.songsList.length == 0) {
      this.$store.commit("setIsList", false);
    } else {
      this.$store.commit("setIsList", true);
    }
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    },
  },
};
</script>
<style lang="less">
</style>
