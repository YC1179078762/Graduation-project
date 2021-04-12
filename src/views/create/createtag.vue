<template>
  <div>
    <div class="song-head">
      <!--返回-->
      <div class="back" @click="$router.go(-1)">
        <span class="iconfont icon-fanhui"></span>
      </div>
      <div class="song-title">选择标签</div>
      <div class="right" @click="baocun()">保存</div>
    </div>
    <div style="background-color: white; height: 24px; line-height: 24px">
      请选择合适的标签
    </div>
    <div class="tag-num">
      <div class="tag-namea">
        <div
          v-for="(item, index) in list"
          :key="index"
          @click="chooseone(index)"
          :class="{ one: item.choose }"
        >
          <span>{{ item.tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        data:[],
      list: [
        {
          tag: "流行",
          num: "1",
          choose: false,
        },
        {
          tag: "摇滚",
          num: "2",
          choose: false,
        },
        {
          tag: "民谣",
          num: "3",
          choose: false,
        },
        {
          tag: "电子",
          num: "4",
          choose: false,
        },
        {
          tag: "说唱",
          num: "5",
          choose: false,
        },
        {
          tag: "轻音乐",
          num: "6",
          choose: false,
        },
        {
          tag: "金属",
          num: "7",
          choose: false,
        },
        {
          tag: "古风",
          num: "8",
          choose: false,
        },
      ],
    };
  },
  methods: {
    chooseone(index) {   
      this.list[index].choose = !this.list[index].choose;
      if (this.list[index].choose == true) {
        this.data.push(this.list[index].tag);
      } else {
        var length = this.data.map((item) => item).indexOf(this.list[index].name);
        if (length != -1) {
          this.data.splice(length, 1);
        }
      }
      console.log(this.data)
    },
    baocun(){
        this.$store.commit('setCreateTags',this.data)
        this.$router.go(-1)
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
.tag-num {
  .tag-namea {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: white;
    justify-content: center;
    div {
      line-height: 50px;
      text-align: center;
      height: 50px;
      width: 25%;
    }
    .one {
      background-color: rgb(207, 205, 205);
    }
  }
}
</style>