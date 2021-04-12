<template>
  <div>
    <div class="song-back"></div>
    <div class="song-kong"></div>
    <!-- 歌单header -->
    <div class="song-head">
      <!--返回-->
      <div class="back" @click="$router.go(-1)">
        <span class="iconfont icon-fanhui"></span>
      </div>
      <div class="song-title">歌单</div>
      <div class="right" @click="baocun()">保存</div>
    </div>
    <!-- 歌单内容 -->
    <div class="song-neirong" @click="xiugai()">
      <div class="left">
        <img v-if="!pic" src="../../assets/img/user.jpg" alt="" />
        <img v-if="pic" :src="pic" alt="" />
      </div>
      <div class="right">
        <div v-if="!name" class="song-name">随音乐而动</div>
        <div v-if="name" class="song-name">{{ name }}</div>
        <div class="song-author">
          <img class="author-pic" src="../../assets/img/pic.jpg" alt />
          <span class="author-name">{{ userC_username }}</span>
        </div>
      </div>
    </div>
    <!-- 具体详情 -->
    <div class="song-xiangqing">
      <van-sticky :offset-top="55">
        <div class="song-quanbu">
          <van-icon style="" name="play" />
          <span style="font-weight: 600; font-size: 16px">播放全部</span>
          <a style="font-size: 16px; color: #a3a3a3"> ()</a>
        </div>
      </van-sticky>

      <!-- <SmallSong :data="songlist"></SmallSong> -->
    </div>
    <PlayMini></PlayMini>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayMini from "../../components/content/Play";
import SmallSong from "../../components/content/SmallSong";
export default {
  components: {
    PlayMini,
    SmallSong,
  },
  data() {
    return {
      showr: false,
      pic: [],
      name: "心随你动",
      text: "",
      tags: "",
      creator: "",
    };
  },
  mounted() {
    var num = this.$store.getters.createPic;
    this.tags = this.$store.getters.createTags;
    this.text = this.$store.getters.createText;
    this.name = this.$store.getters.createName;
    this.creator = localStorage.getItem("creator");
    this.pic = num[0].content
    console.log(localStorage.getItem("creator"))
  },
  computed: {
    ...mapGetters(["userC_username"]),
  },
  methods: {
    async toplay(val) {
      
    },
    afterRead() {},
    xiugai() {
      this.$router.push("/createdata");
    },
    async baocun() {
      const data = await this.$axios.post(
        "http://192.168.0.174:3000/upload/songSheet",
        {
          params: {
            Sl_name: this.name,
            Sl_coverImgUrl: this.pic,
            Sl_tags: this.tags,
            Sl_creator: this.creator,
            Sl_tracks: this.tracks,
          },
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.song-back {
  box-sizing: border-box;
  position: fixed;
  overflow: hidden;
  width: 100%;
  top: 0;
  height: 260px;
  z-index: 1;
  background-color: rgb(204, 204, 204);
  background-position: center top;
  background-size: 100%;
  background-attachment: fixed;
  filter: blur(4px);
}
/*--------------header------------------*/
.song-kong {
  background-color: rgb(204, 204, 204);
  box-sizing: border-box;
  position: fixed;
  height: 55px;
  width: 100%;
  overflow: hidden;
  top: 0;
  background-position: center top;
  background-size: 100%;
  background-attachment: fixed;
  filter: blur(1px);
  z-index: 23;
}
.song-head {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  height: 55px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 40px;
  z-index: 23;
  color: white;
  font-size: 20px;
  .song-title {
    flex: 1;
    padding: 0 10px;
    font-weight: 600;
  }
  div {
    width: 40px;
    height: 40px;
  }
  .back {
    text-align: center;
    span {
      font-size: 20px;
    }
  }
  .right {
    font-weight: 600;
    margin-right: 10px;
  }
}
.song-neirong {
  z-index: 20;
  position: relative;
  margin: 80px 0 0 20px;
  display: flex;
  align-items: center;
  .left {
    width: 120px;
    z-index: 100;
    img {
      width: 120px;
      height: 120px;
       z-index: 101;
    }
  }
  .right {
    margin-left: 10px;
    color: white;
    flex: 1;
    height: 110px;
    .song-name {
      font-size: 16px;
      height: 20px;
      padding: 0 10%;
    }
    .song-author {
      padding-left: 20px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 25px;
        border-radius: 25px;
      }
      span {
        font-size: 12px;
      }
    }
  }
}
.song-xiangqing {
  margin-top: 80px;
  z-index: 20;
  background-color: white;
  position: relative;
  .song-quanbu {
    background-color: white;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #a3a3a3;
    i {
      background-color: red;
      width: 16px;
      height: 16px;
      text-align: center;
      line-height: 16px;
      border-radius: 16px;
      margin: 0 15px;
      color: #fff;
    }
  }
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
      color: #a3a3a3;
    }
    .item-icon {
      color: #a3a3a3;
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 60px;
    }
    .item-name {
      width: 80%;
      height: 50px;
      overflow: hidden;
      font-size: 16px;
      white-space: nowrap;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>