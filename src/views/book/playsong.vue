<template>
  <div class="player">
    <div class="playsong-header">
      <!-- 返回 -->
      <div class="header-fanhui" @click="$router.go(-1)">
        <span class="iconfont icon-fanhui"></span>
      </div>
      <!-- 名称 -->
      <div class="header-name">
        <div style="height: 10px"></div>
        <p style="font-size: 20px">{{ title }}</p>
        <p style="font-size: 16px">{{ artist }}</p>
      </div>
      <!-- 分享 -->
      <div class="header-fenxiang">
        <van-icon name="share-o" />
      </div>
    </div>
    <transition name="fade">
      <div class="playing-body" v-if="!showLrc" @click="showLrc = true">
        <img
          class="player-top"
          :class="{ pause: !isPlay }"
          src="../../assets/img/swith.png"
          alt=""
        />
        <div class="pic-box" :class="isPlay ? 'circle ' : ''">
          <img :src="picUrl" alt="" class="album-pic" />
          <div></div>
        </div>
      </div>
    </transition>
    <!--歌词-->
    <transition name="fade">
      <div v-show="showLrc" class="showLrc-box" @click="showLrc = false">
        <ul v-show="lrc.length" v-bind:style="{ top: lrcTop }" class="lrc">
          <li v-for="(item, index) in lrc" :key="index">
            {{ item[1] }}
          </li>
        </ul>
        <ul v-show="!lrc.length" style="margin-top: 40%">
          <span class="no-lrc">暂无歌词</span>
        </ul>
      </div>
    </transition>
    <div class="playsong-footer">
      <div class="playsong-speed">
        <div class="current-time">{{ nowTime }}</div>
        <div class="progress-box">
          <div ref="progress" class="progress">
            <!--进度条-->
            <div
              ref="curProgress"
              class="cur-progress"
              :style="{ width: curLength + '%' }"
            ></div>
            <!--拖动的点点-->
            <div
              class="idot"
              :style="{ left: curLength + '%' }"
              @touchstart="touchstart"
              @touchmove="touchmove"
            ></div>
          </div>
        </div>
        <!--播放结束时间-->
        <div class="left-time">{{ songTime }}</div>
      </div>
      <div class="playsong-butt">
        <!--模式-->
        <div @click="playPattern">
          <span v-if="w === 1" class="iconfont icon-suijibofang"></span>
          <span v-else-if="w === 2" class="iconfont icon-danquxunhuan"></span>
          <span v-else-if="w === 3" class="iconfont icon-liebiaoxunhuan"></span>
        </div>
        <!--上一首-->
        <div @click="prev">
          <van-icon name="arrow-left" />
        </div>
        <!--播放-->
        <div @click="togglePlay">
          <span
            v-show="!isPlay"
            style="font-size: 45px"
            class="iconfont icon-zanting"
          ></span>
          <span
            v-show="isPlay"
            style="font-size: 45px"
            class="iconfont icon-bofang"
          ></span>
        </div>
        <!--下一首-->
        <div @click="next">
          <van-icon name="arrow" />
        </div>
        <!--选择-->
        <div>
          <span class="iconfont icon-bofangliebiao"></span>
        </div>
      </div>
    </div>
    <!--背景-->
    <div class="picbg" :style="{ background: 'url(' + picUrl + ')' }"></div>
    <div class="picbg2"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showLrc: false, // 切换唱片和歌词
      lrcTop: 200 + "px", // 歌词滑动
      nowTime: "00.00", // 播放开始时间
      songTime: "00.00", // 播放结束时间
      curLength: 0, // 进度条的位置
      progressLength: 0, // 进度条长度
      touchStartX: 0, // 拖拽开始位置
      w: 1,
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
      "lyric",
      "songsList", // 当前歌单列表
      "listIndex", // 当前歌曲在歌曲列表的位置
      "autoNext", // 用于触发自动播放下一首
    ]),
  },
  watch: {
    curTime: function () {
      this.nowTime = this.formatSeconds(this.curTime);
      this.songTime = this.formatSeconds(this.duration);
      // 移动进度条
      this.curLength = (this.curTime / this.duration) * 100;
      // 处理歌词位置及颜色
      if (this.lrc.length !== 0) {
        for (var i = 0; i < this.lrc.length; i++) {
          if (this.curTime >= this.lrc[i][0]) {
            for (var j = 0; j < this.lrc.length; j++) {
              document.querySelectorAll(".lrc li")[j].style.color =
                "rgba(165,165,165,0.7)";
            }
            if (i >= 0) {
              this.lrcTop = -i * 30 + 180 + "px";
              document.querySelectorAll(".lrc li")[i].style.color = "#ffffff";
            }
          }
        }
      }
    },
    // 自动播放下一首
    autoNext: function () {
      this.next();
    },
  },
  mounted() {
    this.getsrc();
  },
  methods: {
    togglePlay() {
      if (this.isPlay) {
        this.$store.commit("setIsPlay", false);
      } else {
        this.$store.commit("setIsPlay", true);
      }
    },
    //  解析播放时间
    formatSeconds(value) {
      let theTime = parseInt(value);
      let theTime1 = 0;
      let theTime2 = 0;
      if (theTime > 60) {
        theTime1 = parseInt(theTime / 60); // 分
        theTime = parseInt(theTime % 60); // 秒
        // 是否超过一个小时
        if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60); // 小时
          theTime1 = 60; // 分
        }
      }
      // 多少秒
      if (parseInt(theTime) < 10) {
        var result = "0:0" + parseInt(theTime);
      } else {
        result = "0:" + parseInt(theTime);
      }
      // 多少分钟时
      if (theTime1 > 0) {
        if (parseInt(theTime) < 10) {
          result = "0" + parseInt(theTime);
        } else {
          result = parseInt(theTime);
        }
        result = parseInt(theTime1) + ":" + result;
      }
      // 多少小时时
      if (theTime2 > 0) {
        if (parseInt(theTime) < 10) {
          result = "0" + parseInt(theTime);
        } else {
          result = parseInt(theTime);
        }
        result = parseInt(theTime2) + ":" + parseInt(theTime1) + ":" + result;
      }
      return result;
    },
    //获取歌词
    async getsrc() {
      const data = await this.$axios.get(
        "https://ycmusic.obs.cn-southwest-2.myhuaweicloud.com:443/lrc/100001.lrc?AccessKeyId=RZHGLYWRGMEBBGEW4ZY2&Expires=1633178642&Signature=8lKaMTUWih3VPh%2BG69B5aOXqwBg%3D"
      );
      console.log(data.data);
      this.parseLyric(data.data);
    },
    //处理歌词
    parseLyric(text) {
      var lines = text.split("\n");
      var pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g;
      var result = [];
      while (!pattern.test(lines[0])) {
        lines = lines.slice(1);
      }
      lines[lines.length - 1].length === 0 && lines.pop();
      lines.forEach(function (item) {
        let time = item.match(pattern); // 存前面的时间段
        let value = item.replace(pattern, ""); // 存歌词
        // console.log(time) // 时间
        // console.log(value) // 歌词数据
        time.forEach(function (item1) {
          var t = item1.slice(1, -1).split(":");
          if (value !== "") {
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
          }
        });
      });
      result.sort(function (a, b) {
        return a[0] - b[0];
      });
      return result;
    },
    //  拖拽开始
    touchstart(e) {
      this.touchStartX = e.touches[0].pageX;
    },
    //  拖拽ing
    touchmove(e) {
      if (!this.duration) {
        return false;
      }
      let movementX = e.touches[0].pageX - this.touchStartX;
      let curLength = this.$refs.curProgress.getBoundingClientRect().width;
      //  计算出百分比
      let newPercent = ((curLength + movementX) / this.progressLength) * 100;
      if (newPercent > 100) {
        newPercent = 100;
      }
      this.curLength = newPercent;
      this.touchStartX = e.touches[0].pageX;
      //  根据百分比推出对应的播放时间
      this.changeTime(newPercent);
    },
    // 更改歌曲进度
    changeTime(percent) {
      let newCurTime = this.duration * (percent * 0.01);
      this.$store.commit("setChangeTime", newCurTime);
    },
    // 上一首
    prev() {
      if (this.listIndex !== -1 && this.songsList.length > 1) {
        if (this.listIndex > 0) {
          this.$store.commit("setListIndex", this.listIndex - 1);
          this.toPlay(this.songsList[this.listIndex].id);
        } else {
          this.$store.commit("setListIndex", this.songsList.length - 1);
          this.toPlay(this.songsList[this.listIndex].id);
        }
      }
    },
    playPattern() {
      this.w++;
      if (this.w == 4) {
        this.w = 1;
      }
    },
    // 下一首
    next() {
      if (this.listIndex !== -1 && this.songsList.length > 1) {
        // console.log('下一首')
        if (this.listIndex < this.songsList.length - 1) {
          this.toPlay(this.songsList[this.listIndex + 1].id);
          this.$store.commit("setListIndex", this.listIndex + 1);
        } else {
          this.$store.commit("setListIndex", 0);
          this.toPlay(this.songsList[0].id);
        }
      }
    },
    // 选中播放
    toPlay(id) {
      if (id && id !== this.id) {
        this.$router.replace({ path: "/player/" + id });
        this.$store.commit("setId", id);
        this.getSongDetail();
      }
    },
  },
};
</script>
<style lang="less" scoped>
.player {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
}
/*-----------------------头部-----------------------------*/
.playsong-header {
  width: 100%;
  height: 60px;
  display: flex;
  position: relative;
  z-index: 10;
  align-content: center;
  color: white;
  .header-fanhui {
    width: 50px;
    margin-left: 20px;
    line-height: 60px;
  }
  .header-name {
    flex: 1;
    font-size: 16px;
    text-align: center;
    // color: white;
  }
  .header-fenxiang {
    font-size: 20px;
    width: 50px;
    text-align: right;
    margin-right: 20px;
    line-height: 60px;
  }
}
/*-----------------------中间唱片-----------------------------*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
/*-----------------------中间样式-----------------------------*/
.playing-body {
  height: 92%;
  width: 100%;
  position: absolute;
  overflow: hidden;
  .player-top {
    width: 90px;
    height: 130px;
    position: absolute;
    top: -15px;
    left: 45%;
    z-index: 5;
    transition: all 0.3s;
    transform-origin: 14px 16px;
  }
  .pause {
    transform: rotateZ(-30deg);
  }
  .pic-box {
    position: relative;
    display: flex;
    width: 40vh;
    height: 40vh;
    margin: 0 auto;
    border: 12px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    text-align: center;
    top: 8%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
      width: 40vh;
      border-radius: 50%;
      margin: 13%;
    }
    div {
      position: absolute;
      background: url("../../assets/img/coverall.png") no-repeat;
      background-size: 100%;
      width: 107%;
      height: 107%;
      border-radius: 50%;
    }
  }
  .circle {
    animation: rotate 16s linear infinite 0.1s;
  }
}
@-webkit-keyframes rotate {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.showLrc-box {
  position: absolute;
  top: 80px;
  bottom: 130px;
  width: 100%;
  overflow: hidden;
  transition: all 1s;
  ul {
    position: absolute;
    width: 100%;
    text-align: center;
    font-size: 16px;
    line-height: 30px;
    transition: all 0.5s;
    color: rgba(185, 185, 185, 1);
  }
}
/*-----------------------播放样式-----------------------------*/
.playsong-footer {
  position: fixed;
  bottom: 0;
  padding-bottom: 10px;
  width: 100%;

  .playsong-speed {
    height: 50px;
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    .current-time {
      width: 70px;
      text-align: center;
      font-size: 13px;
      color: #ffffff;
      top: -10px;
    }
    .left-time {
      width: 70px;
      text-align: center;
      font-size: 13px;
      color: #ffffff;
      top: -10px;
    }
    .progress-box {
      flex: 1;
      .progress {
        width: 100%;
        background: #ffffff;
        height: 2px;
      }
      .cur-progress {
        /*width: 20%;*/
        height: 100%;
        background: #d23023;
      }
      .idot {
        width: 16px;
        height: 16px;
        position: relative;
        border-radius: 50%;
        background-color: #fff;
        top: -9px;
        vertical-align: middle;
      }
    }
  }
  .playsong-butt {
    height: 80px;
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 32px;

    padding: 0;
    span {
      font-size: 32px;
      line-height: 30px;
    }
    div {
      flex: 1;
      text-align: center;
      height: 80px;
      line-height: 60px;
    }
  }
}
/*-----------------------背景样式-----------------------------*/
.picbg {
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
  background-position: center top;
  background-size: cover;
  background-attachment: fixed;
  -webkit-filter: blur(30px);
  -moz-filter: blur(30px);
  -ms-filter: blur(30px);
  -o-filter: blur(30px);
  filter: blur(30px);
}
.picbg2 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>