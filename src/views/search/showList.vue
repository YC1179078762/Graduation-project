<template>
  <div>
    <van-search shape="round" v-model="value" @click="$router.go(-1)" />
    <van-tabs v-model="active" animated swipeable @change="searchone">
      <van-tab title="歌曲" class="title">
        <!-- <div v-show="!searchsong" class="loading">
          <van-loading color="#0094ff" vertical size="30px"
            >加载中
            {{ daima }}
          </van-loading>
        </div>
        <div v-show="loadingsongfalse" class="loading-false">
          加载失败{{ daima }}{{search}}
        </div> -->
        <div class="loading-true" v-show="searchsongtrue">
          <SmallSong :data="this.song"></SmallSong>
          
        </div>
      </van-tab>
      <van-tab title="歌手" class="title">
        <div v-show="!searchsinger" class="loading">
          <van-loading color="#0094ff" vertical size="30px">加载中</van-loading>
        </div>
        <div v-show="loadingsingerfalse" class="loading-false">加载失败</div>
      </van-tab>
      <van-tab title="歌单" class="title">
        <div v-show="!searchsonglist" class="loading">
          <van-loading color="#0094ff" vertical size="30px">加载中</van-loading>
        </div>
        <div v-show="loadingsonglistfalse" class="loading-false">加载失败</div>
      </van-tab>
    </van-tabs>
    <!-- <van-tabs v-model="active" swipeable animated>
      <van-tab v-for="(item, index) in arr" :title="item.title" :key="index">
        <div v-show="!item.loading">
          <van-loading size="24px" vertical>加载中...</van-loading>
        </div>
        <div class="loading-false" v-show="!item.loadingfalse">
          加载失败
        </div>
        <div class="loading-true" v-show="item.loadingtrue">

        </div>
      </van-tab>
    </van-tabs> -->
    <Play></Play>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SmallSong from "../../components/content/SmallSong";
import SongList from "../../components/content/SongList";
import Play from "../../components/content/Play";
export default {
  components: {
    SmallSong,
    SongList,
    Play,
  },
  computed: {
    ...mapGetters(["search"]),
  },
  created() {
    if (this.$store.getters.showSearch != "") {
      console.log(123);
      this.list = this.$store.getters.showSearch;
    } else {
      console.log(321);
    }
  },
  data() {
    return {
      daima: "",
      searchsongtrue: true, //搜索歌曲成功有数据
      searchsingertrue: false, //搜索歌手成功有数据
      searchsonglisttrue: false, //搜索歌单成功有数据
      loadingsongfalse: false, //加载歌曲失败
      loadingsonglistfalse: false, //加载歌单失败
      loadingsingerfalse: false, //加载歌手失败
      findsong: false, //搜索歌曲成功无数据
      findsinger: false, //搜索歌手成功无数据
      findsonglist: false, //搜索歌单成功无数据
      searchsong: false, //搜索歌曲中
      searchsinger: false, //搜索歌手中
      searchsonglist: false, //搜索歌单中
      active: "歌曲",
      song: [],
      singer: [],
      value: this.$store.getters.showV,
      songlist: [],
    };
  },
  mounted() {
    this.searchone(1, "歌曲");
    // console.log(this.arr[0].loading);
  },
  methods: {
    searchone(name, title) {
      if (title == "歌曲") {
        this.searchSong();
      } else if (title == "歌手") {
        this.searchSinger();
      } else if (title == "歌单") {
        this.searchSongList();
      }
    },
    async searchSong() {
      const data = await this.$axios.get("http://192.168.0.174:3000/find/song", {
        params: {
          So_name:this.search
        },
      });
      this.song = data.data

    },
    // async searchSong() {
    //   this.daima = this.song;
    //   var v = this.search;
    //   if (this.song == 0) {
    //     try {
    //       console.log(v);
    //       const data = await this.$axios.get(
    //         "http://localhost:3000/find/song?So_name=" + v
    //       );
    //       if (data != "") {
    //         this.song = data.data;
    //         console.log(this.song);
    //         this.searchsong = true;
    //         this.searchsongtrue = true;
    //       } else {
    //         this.findsong = true;
    //         this.searchsong = true;
    //       }
    //     } catch (err) {
    //       console.log(123456789);
    //       this.loadingsongfalse = true;
    //       this.searchsong = true;
    //       console.log(err);
    //     }
    //   } else {
    //   }

    //   const data = await this.$axios.get(
    //     "http://localhost:3000/find/song?So_name=" + this.search
    //   );
    // },
    async searchSongList() {
      if (this.songlist == 0) {
        try {
          const data = await this.$axios.get();
          if (data != "") {
            this.songlist = data;
            this.searchsonglist = true;
            this.searchsonglisttrue = true;
            console.log(12345);
          } else {
            this.findsonglist = true;
            this.searchsonglist = true;
            console.log(123456);
          }
        } catch (err) {
          this.loadingsonglistfalse = true;
          this.searchsonglist = true;
          console.log(1234567);
          console.log(err);
        }
      } else {
      }
    },
    async searchSinger() {
      console.log(12);
      if (this.singer == 0) {
        try {
          const data = await this.$axios.get();
          if (data != "") {
            this.singer = data;
            this.searchsinger = true;
            this.searchsingertrue = true;
          } else {
            this.findsinger = true;
            this.searchsinger = true;
          }
        } catch (err) {
          this.loadingsingerfalse = true;
          this.searchsinger = true;
          console.log(err);
        }
      } else {
      }
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading-false {
  text-align: center;
  font-size: 16px;
  position: relative;
  margin-top: 200px;
}
.loading-true {
}
</style>