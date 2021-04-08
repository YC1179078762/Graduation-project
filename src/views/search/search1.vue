<template>
  <div class="box">
    <headTop> </headTop>
    <div class="book">
      <img :src="list.cover" alt="" />
      <div class="right">
        <div class="bookName">{{ list.name }}</div>
        <div class="bookAuthor">{{ list.author }}</div>
        <div class="bookAuthor">{{ list.status }}</div>
      </div>
    </div>
    <div class="bookMsg">{{ list.introduce }}</div>
    <div class="bookZhang">
      <span>目录</span>
      <div @click="chakan()">{{ zhang[zhang.length - 1].num }}</div>
    </div>
    <div class="bookBottom">
      <div class="addBook">加入书架</div>
      <div class="readBook">免费阅读</div>
      <div class="doloadBook">下载全本</div>
    </div>
  </div>
</template>

<script>
import headTop from "../../components/common/head-top";
export default {
  created() {
    this.updated1(this.$store.getters.show);
  },
  components: {
    headTop,
  },
  data() {
    return {
      list: [],
      zhang: [],
    };
  },
  methods: {
    async updated1(val) {
      const data = await this.$axios.get(
        "http://47.114.147.221/?xsurl1=" + val
      );
      console.log(data.data);
      this.list = data.data.data;
      this.zhang = data.data.list;
    },
    chakan() {
      this.$router.push("/catalogue");
      this.$store.commit("addC", this.zhang);
    },
  },
  
};
</script>

<style lang="less" scoped>
.box {
  height: 100%;
}
.book {
  display: flex;
  height: 140px;
  margin-left: 5%;
  width: 90%;
  img {
    margin-top: 7px;
    height: 126px;
    width: 90px;
  }
  .right {
    margin-left: 12px;
    font-size: 12px;
    color: #000;
    font-weight: 500;
    .bookName {
      margin-top: 13px;
      width: 100px;
      height: 20px;
      font-size: 16px;
      font-weight: 600;
    }
    .bookAuthor {
      height: 16px;
      width: 100px;
      margin-top: 12px;
    }
  }
}
.bookMsg {
  line-height: 20px;
  font-size: 12px;
  margin-top: 15px;
  border-bottom: 1px solid #afb1b9;
  height: 70px;
  width: 90%;
  margin-left: 5%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.bookZhang {
  display: flex;
  border-bottom: 1px solid #afb1b9;
  line-height: 55px;
  width: 90%;
  margin-left: 5%;
  height: 55px;
  font-size: 12px;
  color: #afb1b9;
  span {
    color: #000;
    font-size: 14px;
    font-weight: 600;
  }
  div {
    flex: 1;
    text-align: right;
  }
}
.bookBottom {
  position: fixed;
  margin-bottom: 2px;
  display: flex;
  text-align: center;
  line-height: 43px;
  width: 100%;
  height: 43px;
  z-index: 100;
  font-size: 16px;
  left: 0;
  right: 0;
  bottom: 1px;
  div {
    flex: 1;
    height: 43px;
  }
  .readBook {
    border-radius: 5px;
    background-color: #22b382;
    color: #fff;
  }
}
</style>