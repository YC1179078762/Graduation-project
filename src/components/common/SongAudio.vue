<template>
  <div class="song-audio">
    <audio
      :src="url"
      controls="controls"
      id="player"
      preload="true"
      @canplay="startPlay"
      @timeupdate="timeupdate"
      @ended="ended"
    >
      <!--（1）属性：controls，preload（2）事件：canplay，timeupdate，ended（3）方法：play()，pause() -->
      <!--controls：向用户显示音频控件（播放/暂停/进度条/音量）-->
      <!--preload：属性规定是否在页面加载后载入音频-->
      <!--canplay：当音频/视频处于加载过程中时，会发生的事件-->
      <!--timeupdate：当目前的播放位置已更改时-->
      <!--ended：当目前的播放列表已结束时-->
    </audio>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "song-audio",
  computed: {
    ...mapGetters([
      "songsList", //歌曲列表
      "listIndex", //索引
      "autoNext", //下一首
      "url", //音乐url
      "isPlay", // 播放状态
      "curTime", // 当前音乐的播放位置
      "changeTime", // 指定播放时刻
    ]),
  },
  watch: {
    // 得到id
    //监听
    isPlay: function () {
      this.togglePlay();
    },
    changeTime: function () {
      //  跳到指定时刻播放
      let player = document.querySelector("#player");
      player.currentTime = this.changeTime;
    },
  },
  mounted() {
    //
  },
  methods: {
    togglePlay(e) {
      let player = document.querySelector("#player");
      if (this.isPlay) {
        player.play();
      } else {
        player.pause();
      }
    },
    // 获取歌曲链接后准备播放
    startPlay() {
      let player = document.querySelector("#player");
      console.log(player.duration+'播放时长')
      this.$store.commit("setDuration", player.duration);
      //  开始播放
      player.play();
      this.$store.commit("setIsPlay", true);
    },
    // 音乐播放时记录音乐的播放位置
    timeupdate() {
      let player = document.querySelector("#player");
      this.$store.commit("setCurTime", player.currentTime);
    },
    // 音乐播放结束时触发
    ended() {
      this.$store.commit("setIsPlay", false);
      this.$store.commit("setCurTime", 0);
      this.$store.commit("setAutoNext", !this.autoNext);
    },
  },
};
</script>

<style>
#player {
  display: none;
}
</style>
