<template>
  <div>
    <div
      class="song-back"
      :style="{ backgroundImage: 'url(' + list.picUrl + ')' }"
    ></div>
    <div
      class="song-kong"
      :style="{ backgroundImage: 'url(' + list.picUrl + ')' }"
    ></div>
    <!-- 歌单header -->
    <div class="song-head">
      <!--返回-->
      <div class="back" @click="$router.go(-1)">
        <span class="iconfont icon-fanhui"></span>
      </div>
      <div class="song-title">歌单</div>
    </div>
    <!-- 歌单内容 -->
    <div class="song-neirong">
      <div class="left">
        <img :src="list.picUrl" alt="" />
      </div>
      <div class="right">
        <div class="song-name">{{ list.name }}</div>
        <div class="song-author">
          <img class="author-pic" src="avatarUrl" alt />
          <span class="author-name">123</span>
        </div>
      </div>
    </div>
    <!-- 具体详情 -->
    <div class="song-xiangqing">
      <van-sticky :offset-top="55">
        <div class="song-quanbu">
          <van-icon style="" name="play" />
          <span style="font-weight: 600; font-size: 16px">播放全部</span>
          <a style="font-size: 16px; color: #a3a3a3"> ({{ aaa }})</a>
        </div>
      </van-sticky>
      <div style="height: 10px"></div>
      <SmallSong :data="songlist"></SmallSong>
    </div>
    <PlayMini></PlayMini>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayMini from "../../components/content/Play";
import SmallSong from '../../components/content/SmallSong'
export default {
  components: {
    PlayMini,
    SmallSong,
  },
  data() {
    return {
      showr: false,
      aaa: 22,
      list: {
        highQuality: false,
        id: 5474594286,
        name: "心动模式•今日份的美好旋律与明朗节奏",
        picUrl:
          "https://p2.music.126.net/92WxKsTbOeYkNB8PuA2nOg==/109951165647810950.jpg",
        type: 0,
      },
      
    };
  },
  computed: {
    ...mapGetters([
      "isPlay", // 播放状态
      "playButtonUrl", // 播放状态的图标
      "id", // 音乐id
      "title", // 歌名
      "artist", // 歌手名
      "picUrl", // 歌曲图片
      "curTime", // 当前音乐的播放位置
      "duration", // 音乐时长
      "lrc", // 歌词
      "songsList", // 当前歌单列表
      "listIndex", // 当前歌曲在歌曲列表的位置
      "autoNext", // 用于触发自动播放下一首
    ]),
  },
  methods: {
    async toplay(val) {
      const data = await this.$axios.get();
    },
    showname() {
      this.showr = true;
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
  background-position: center top;
  background-size: 100%;
  background-attachment: fixed;
  filter: blur(4px);
}
/*--------------header------------------*/
.song-kong {
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
}
.song-neirong {
  z-index: 20;
  position: relative;
  margin: 80px 0 0 20px;
  display: flex;
  align-items: center;
  img {
    width: 120px;
    z-index: 100;
    border-radius: 5px;
  }
  .right {
    color: white;
    height: 110px;
    .song-name {
      margin-top: 5px;
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