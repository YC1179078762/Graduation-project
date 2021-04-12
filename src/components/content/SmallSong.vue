<template>
  <div>
    <div class="song-item" v-for="(item, index) in data" :key="index">
      <div class="item-xuhao">{{ index + 1 }}</div>
      <div class="item-name" @click="toplay(index)">
        <span
          ><b>{{ item.So_name }}</b></span
        >
        <span style="font-size: 12px; color: #a3a3a3"
          >{{ item.So_name }} - {{ item.So_singer }}</span
        >
      </div>
      <div class="item-icon" @click="showname">
        <span class="iconfont icon-gengduo"></span>
      </div>
      <van-popup
        position="bottom"
        v-model="showr"
        round
        :style="{ height: '60%' }"
      >
      </van-popup>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    data: Array,
  },
  data() {
    return {
      showr: false,
    };
  },
  computed: {
    ...mapGetters(["songsList", "id"]),
  },
  methods: {
    async toplay(index) {
      console.log(index);
      this.$store.commit("setSongsList", this.data);
      this.$store.commit("setListIndex", index);
      this.$store.commit("setIsList", true);
      this.$store.commit("setPicUrl", this.songsList[index].So_iurl);
      this.$store.commit("setUrl", this.songsList[index].So_murl);
      this.$store.commit("setTitle", this.songsList[index].So_name);
      this.$store.commit("setArtist", this.songsList[index].So_singer);
      this.$store.commit("setLyc")
    },
    showname() {
      this.showr = true;
    },
  },
};
</script>
<style lang="less" scoped>
.song-item {
  height: 50px;
  width: 100%;
  background-color: white;
  display: flex;
  flex-wrap: nowrap;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  //   border-bottom: 1px solid #e3e4e5;
  .item-xuhao {
    width: 50px;
    height: 50px;
    text-align: center;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
  }
  .item-icon {
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 60px;
  }
  .item-name {
    flex: 1;
    height: 50px;
    overflow: hidden;
    font-size: 16px;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>