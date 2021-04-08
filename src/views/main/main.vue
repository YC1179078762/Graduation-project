<template>
  <div>
    <PopUp></PopUp>
    
    <div class="main-banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="main-icon">
      <div class="main-icon-mall">
        <span class="iconfont icon-tuijian"></span>
        <p></p>
        <a>每日推荐</a>
      </div>
      <div class="main-icon-mall">
        <span class="iconfont icon-gedan"></span>
        <p></p>
        <a>歌单</a>
      </div>
      <div class="main-icon-mall" @click="$router.push('/rank')">
        <span class="iconfont icon-paihang"></span>
        <p></p>
        <a>排行榜</a>
      </div>
      <div class="main-icon-mall">
        <span class="iconfont icon-diantai"></span>
        <p></p>
        <a>电台</a>
      </div>
      <div class="main-icon-mall">
        <span class="iconfont icon-FM_weixuanze"></span>
        <p></p>
        <a>私人FM</a>
      </div>
    </div>
    <div class="main-songlist">
      <h2>推荐歌单</h2>
      <SongList :data="data"></SongList>
    </div>
    <MainPlay></MainPlay>
    <YinFooter></YinFooter>
  </div>
</template>

<script>
import Vue from "vue";
import { Lazyload } from "vant";
Vue.use(Lazyload);
import MainPlay from "../../components/content/MainPlay"
import SongList from "../../components/content/SongList";
import PopUp from "../../components/content/PopUp";
import  YinFooter from "../../components/content/TheFooter"
export default {
  components: {
    SongList,
    PopUp,
    YinFooter,
    MainPlay,
  },
  data() {
    return {
      show: false,
      images: [
        "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "https://img01.yzcdn.cn/vant/apple-2.jpg",
      ],
      data: [
        {
          highQuality: false,
          id: 5474594286,
          name: "心动模式•今日份的美好旋律与明朗节奏",
          picUrl:
            "https://p2.music.126.net/92WxKsTbOeYkNB8PuA2nOg==/109951165647810950.jpg",
          type: 0,
        },
        {
          highQuality: false,
          id: 5474594286,
          name: "心动模式•今日份的美好旋律与明朗节奏",
          picUrl:
            "https://p2.music.126.net/92WxKsTbOeYkNB8PuA2nOg==/109951165647810950.jpg",
          type: 0,
        },
        {
          highQuality: false,
          id: 5474594286,
          name: "心动模式•今日份的美好旋律与明朗节奏",
          picUrl:
            "https://p2.music.126.net/92WxKsTbOeYkNB8PuA2nOg==/109951165647810950.jpg",
          type: 0,
        },
        {
          highQuality: false,
          id: 5474594286,
          name: "心动模式•今日份的美好旋律与明朗节奏",
          picUrl:
            "https://p2.music.126.net/92WxKsTbOeYkNB8PuA2nOg==/109951165647810950.jpg",
          type: 0,
        },
        {
          highQuality: false,
          id: 5474594286,
          name: "心动模式•今日份的美好旋律与明朗节奏",
          picUrl:
            "https://p2.music.126.net/92WxKsTbOeYkNB8PuA2nOg==/109951165647810950.jpg",
          type: 0,
        },
        {
          highQuality: false,
          id: 5474594286,
          name: "心动模式•今日份的美好旋律与明朗节奏",
          picUrl:
            "https://p2.music.126.net/92WxKsTbOeYkNB8PuA2nOg==/109951165647810950.jpg",
          type: 0,
        },
        {
          highQuality: false,
          id: 5474594286,
          name: "心动模式•今日份的美好旋律与明朗节奏",
          picUrl:
            "https://p2.music.126.net/92WxKsTbOeYkNB8PuA2nOg==/109951165647810950.jpg",
          type: 0,
        },
        {
          highQuality: false,
          id: 5474594286,
          name: "心动模式•今日份的美好旋律与明朗节奏",
          picUrl:
            "https://p2.music.126.net/92WxKsTbOeYkNB8PuA2nOg==/109951165647810950.jpg",
          type: 0,
        },
        {
          highQuality: false,
          id: 5474594286,
          name: "心动模式•今日份的美好旋律与明朗节奏",
          picUrl:
            "https://p2.music.126.net/92WxKsTbOeYkNB8PuA2nOg==/109951165647810950.jpg",
          type: 0,
        },
      ],
    };
  },
  mounted() {
    this.getSongList();
  },
  methods: {
    getSongList() {
      //this.$axios pic text id username songs{id name singer}
    },
    showPopup() {
      this.show = true;
    },
  },
};
</script>
<style lang="less" scoped>

.main-banner {
  margin: 15px 5%;
  width: 345px;
  height: 150px;
  img {
    width: 100%;
    height: 150px;
  }
}
.main-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  .main-icon-mall {
    flex: 1;
    text-align: center;
    span {
      display: inline-block;
      line-height: 40px;
      width: 40px;
      height: 40px;
      font-size: 25px;
      border-radius: 50%;
      color: white;
      background: linear-gradient(to right, rgb(255, 90, 76), rgb(255, 29, 17));
    }
    a {
      display: inline-block;
      height: 26px;
      line-height: 26px;
    }
  }
}
.main-songlist {
  h2 {
    height: 40px;
    text-indent: 10px;
    line-height: 40px;
    font-size: 18.72px;
  }
}
.main-popup{
background-color: rgb(247,248,250);
  .main-xian{
  height: 10px;
   background-color:rgb(247,248,250);
}
}
</style>