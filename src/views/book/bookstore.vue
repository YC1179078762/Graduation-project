<template>
  <div class="add">
    <div class="daohang" v-if="yingcang">
      <span class="iconfont icon-fanhui" @click="$router.go(-1)"></span>
    </div>
    <div @click="yicang()">
      <span style="font-size: 30px">{{ text }}</span>
      <div style="height: 20px"></div>
      <p style="font-size: 20px" v-for="index in list">
        {{ index }}
      </p>
     
    </div>
    <div class="xuanze" v-if="yingcang">
       
        <span>上一章</span>
         <span @click="mulu()">目录</span>
        <span>下一章</span>
    </div>
  </div>
</template>

<script>
import headTop from "../../components/common/head-top";
export default {
  components: {
    headTop,
  },
  created() {
    this.update2(this.$store.getters.showBook);
  },
  data() {
    return {
      text: "",
      list: [],
      yingcang: true,
    };
  },
  methods: {
    async update2(url) {
      const data = await this.$axios.get(
        "http://47.114.147.221/?xsurl2=" + url
      );
      console.log(data);
      this.text = data.data.num;
      this.list = data.data.content;
    },
    yicang() {
      this.yingcang = !this.yingcang;
    },
    mulu(){
        this.$router.push('/catalogue')
    }
  },
};
// export default {
//   created() {
//     if (this.$store.getters.showSearch != "") {
//       console.log(123);
//       this.list = this.$store.getters.showSearch;
//     } else {
//       console.log(321);
//     }
//   },
//   data() {
//     return {
//       loadingsongfalse: false,
//       loadingsingerfalse: false,
//       loadingsonglistfalse: false,
//       findsong: false,
//       findsinger: false,
//       findsonglist: false,
//       searchsong: false,
//       searchsinger: false,
//       searchsonglist: false,
//       active: "歌曲",
//       song: [],
//       singer: [],
//       value: this.$store.getters.showV,
//       songlist: [],
//     };
//   },
//   mounted() {
//     this.search(1, "歌曲");
//   },
//   methods: {
//     search(name, title) {
//       if (title == "歌曲") {
//         this.searchSong();
//       } else if (title == "歌手") {
//         this.searchSinger();
//       } else if (title == "歌单") {
//         this.searchSongList();
//       }
//     },
//     async searchSong() {
//       console.log(this.song);
//       if (this.song == 0) {
//         try {
//           const data = await this.$axios.get();
//           if (data != "") {
//             this.song = data;
//             this.searchsong = true;
//           } else {
//             this.findsong = true;
//             this.searchsong = true;
//           }
//         } catch (err) {
//           console.log(123456789);
//           this.loadingsongfalse = true;
//           this.searchsong = true;
//           console.log(err);
//         }
//       } else {
//       }
//     },
//     async searchSongList() {
//       console.log(123);

//       if (this.songlist == 0) {
//         try {
//           const data = await this.$axios.get();
//           if (data != "") {
//             this.songlist = data;
//             this.searchsonglist = true;
//             console.log(12345);
//           } else {
//             this.findsonglist = true;
//             this.searchsonglist = true;
//             console.log(123456);
//           }
//         } catch (err) {
//           this.loadingsonglistfalse = true;
//           this.searchsonglist = true;
//           console.log(1234567);
//           console.log(err);
//         }
//       } else {
//       }
//     },
//     async searchSinger() {
//       console.log(12);
//       if (this.singer == 0) {
//         try {
//           const data = await this.$axios.get();
//           if (data != "") {
//             this.singer = data;
//             this.searchsinger = true;
//           } else {
//             this.findsinger = true;
//             this.searchsinger = true;
//           }
//         } catch (err) {
//           this.loadingsingerfalse = true;
//           this.searchsinger = true;
//           console.log(err);
//         }
//       } else {
//       }
//     },
//   },
// };
</script>

<style lang="less" scoped>
.add {
  background-color: #f0f1f2;
}
.daohang {
  display: flex;
  width: 100%;
  background-color: #f0f1f2;
  height: 40px;
  align-items: center;
  position: fixed;
  z-index: 1000;
  opacity: 0.8;
  border: 1px solid#f0f1f2;
  span {
    font-size: 30px;
  }
}
.xuanze {
  position: fixed;
   background-color: #f0f1f2;
  margin-bottom: 0px;
  display: flex;
  text-align: center;
  line-height: 40px;
  width: 100%;
  height: 40px;
  z-index: 100;
  display: flex;
  font-size: 16px;
  left: 0;
  right: 0;
  bottom: 1px;
  z-index: 1000;
  opacity: 0.8;
  border: 1px solid#f0f1f2;
  span{
      flex:1;
  }
}
</style>