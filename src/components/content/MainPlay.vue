<template>
  <div v-show="isList">
    <div class="kong"></div>
    <div class="play-mini">
      <img :src="picUrl" alt="" @click="$router.push('/playsong')" />
      <div class="play-name" @click="$router.push('/playsong')">
        <span style="font-size: 16px">{{ title }}-</span>
        <span style="font-size: 14px; color: #a3a3a3">{{ artist }}</span>
      </div>
      <div class="play-icon">
        <van-icon @click="tiaozhuan" v-show="isPlay" name="play-circle" />
        <van-icon @click="tiaozhuan" v-show="!isPlay" name="pause-circle" />
        <van-icon name="bars" @click="showPopup" />
        <van-popup
          v-model="show"
          position="bottom"
          round
          :style="{ height: '60%' }"
        >
          <div class="play-popup">
            <span> <b> 当前播放</b> </span>
            <span style="font-weight: 600; font-size: 14px; color: #a3a3a3"
              >({{ title }})</span
            >
          </div>
          <div class="play-songlist">
            <div
              v-for="(item, index) in song"
              :key="index"
              class="play-songlist-song"
            >
              <div>
                <span>{{ item.name }} - </span>
                <span
                  style="line-height: 35px; font-size: 12px; color: #a3a3a3"
                >
                  {{ item.singername }}</span
                >
              </div>
              <van-icon name="cross" @click="delatesong()" />
            </div>
          </div>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      show: false,
      song: [
        {
          name: "123",
          singername: "321",
        },
        {
          name: "123",
          singername: "321",
        },
        {
          name: "123",
          singername: "321",
        },
        {
          name: "123",
          singername: "321",
        },
        {
          name: "123",
          singername: "321",
        },
        {
          name: "123",
          singername: "321",
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      "curTime", // 当前音乐的播放位置
      "isPlay", // 播放状态
      "playButtonUrl", // 播放状态的图标
      "title", // 歌名
      "artist",
      "picUrl", // 歌曲图片
      "songsList", // 当前歌单列表
      "listIndex", // 当前歌曲在歌曲列表的位置
      "isList",
    ]),
  },
  methods: {
    tiaozhuan() {
      if (this.isPlay) {
        this.$store.commit("setIsPlay", false);
      } else {
        this.$store.commit("setIsPlay", true);
      }
    },
    showPopup() {
      this.show = true;
    },
    deletesong() {},
  },
};
</script>

<style lang="less" scoped>
.kong {
  width: 100%;
  height: 50px;
}
.play-mini {
  background-color: white;
  position: fixed;
  width: 100%;
  height: 50px;
  bottom: 50px;
  z-index: 100;
  display: flex;
  align-items: center;
  border-top: 1px solid #eceae8;
  img {
    height: 35px;
    width: 35px;
    margin-left: 16px;
    border-radius: 35px;
    border: 10px solid #524f4c;
    margin-top: -6px;
  }
  .play-name {
    flex: 1;
    height: 50px;
    line-height: 50px;
    margin-left: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .play-icon {
    width: 80px;
    height: 50px;
    display: flex;
    font-size: 30px;
    align-items: center;
    i {
      width: 40px;
    }
    .play-popup {
      font-size: 16px;
      margin: 20px 0 0 20px;
      position: fixed;
      height: 40px;
      z-index: 200;
    }
    .play-songlist {
      margin-top: 50px;

      .play-songlist-song {
        font-size: 16px;
        display: flex;
        height: 40px;
        line-height: 40px;
        div {
          width: 300px;
          margin-left: 20px;
        }
        i {
          text-align: center;
          color: #a3a3a3;
          line-height: 40px;
        }
      }
    }
  }
}
</style>