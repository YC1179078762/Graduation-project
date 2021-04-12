<template>
  <div>
    <div class="song-head">
      <!--返回-->
      <div class="back" @click="$router.go(-1)">
        <span class="iconfont icon-fanhui"></span>
      </div>
      <div class="song-title">编辑歌单信息</div>
      <div class="right" @click="baocun()">保存</div>
    </div>
    <div style="height: 10px"></div>
    <div class="create-pic">
      <div class="label">更换封面</div>
      <div class="tianchong"></div>
      <div class="update">
        <van-uploader
          style="z-index: 100; line-height: 44px"
          max-count="1"
          preview-size="36"
          v-model="pic"
          multiple
          :after-read="afterRead"
        />
      </div>
    </div>
    <div></div>
    <van-cell-group>
      <van-field
        v-model="name"
        input-align="right"
        label="名称"
        maxlength="20"
        placeholder="歌单名称"
      />
      <van-field
        v-model="text"
        input-align="right"
        label="描述"
        placeholder="描述"
      />
    </van-cell-group>
    <div class="create-tag" @click="$router.push('/createtag')">
      <div class="label"><span>标签</span></div>
      <div class="tianchong"></div>
      <div class="update">
        <van-tag
          color="rgb(200,200,200)"
          round
          v-for="(item, index) in tags"
          :key="index"
          type="primary"
          >{{ item }}</van-tag
        >
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  data() {
    return {
      pic: [],
      name: "",
      text: "",
      tags: "",
    };
  },
  //   computed: {
  //     ...mapGetters(["createTags", "createPic", "createName", "createText"]),
  //   },
  mounted() {
    this.pic = this.$store.getters.createPic;
    this.name = this.$store.getters.createName;
    this.text = this.$store.getters.createText;
    this.tags = this.$store.getters.createTags;
  },
  methods: {
    baocun() {
      this.$router.go(-1);
      this.$store.commit("setCreatePic", this.pic);

      this.$store.commit("setCreateName", this.name);
      this.$store.commit("setCreateTags", this.tags);
      this.$store.commit("setCreateText", this.text);
    },
     afterRead(file){
      // console.log(file.content)
  }
  },
 
};
</script>

<style lang="less" scoped>
.song-head {
  box-sizing: border-box;
  top: 0;
  height: 55px;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 40px;
  z-index: 23;
  font-size: 16px;
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
      font-size: 16px;
    }
  }
  .right {
    font-weight: 600;
    margin-right: 10px;
  }
}
.create-pic {
  display: flex;
  height: 44px;
  background-color: white;
  .label {
    width: 84px;
    line-height: 44px;
    font-size: 16px;
    text-align: center;
    color: #646566;
  }
  .tianchong {
    flex: 1;
  }
  .update {
    margin-top: 4px;
  }
}
.create-tag {
  display: flex;
  height: 44px;
  background-color: white;
  .label {
    width: 84px;
    line-height: 44px;
    font-size: 16px;
    text-align: center;
    color: #646566;
    text-align: left;
    text-indent: 16px;
  }
  .tianchong {
    flex: 1;
  }
  .update {
    margin-top: 20px;
    margin-right: 10px;
  }
}
</style>