<template>
  <div>
    <form action="/">
      <van-search
        v-model.trim="value"
        show-action
        autofocus
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.go(-1)"
      />
    </form>

    <!-- <div
     v-for="(item, index) in list"
      @click="tiaozhuan(item.url)"
      class="bookSearch"
      v-if="list.length > 0"
    >
      <img class="bookImg" :src="item.cover" alt="" />
      <div class="right">
        <div class="bookName">{{ item.name }}</div>
        <div class="bookAuthor">{{ item.author }}</div>
        <div class="bookMsg">
          {{ item.introduce }}
        </div>
        <div class="bookTag">{{ item.tag }}</div>
      </div>
    </div>
    <div v-else>
      <span>没有找到书籍</span>
    </div> -->
  </div>
</template>

<script>
export default {
  // created(){
  //   if(this.$store.getters.showSearch !=''){
  //             this.list = this.$store.getters.showSearch
  //             console.log(123)
  //         }
  // },
  data() {
    return {
      value: "",
      valueList: [],
    };
  },

  methods: {
    async onSearch() {
      var v = this.value;
      v = v.replace(/\s*/g, "");
      if (v === "") {
        return false;
      } else {
        try {
          console.log(v)
          this.$router.push("/showList");
          this.$store.commit("setSearch", v);
        } catch {}
      }
    },
  },
};
</script>

<style lang="less" scoped>
// .bookSearch {
//   display: flex;
//   width: 90%;
//   align-items: center;
//   border-top: 1px solid #afb1b9;
//   margin-left: 5%;
//   height: 130px;
//   .bookImg {
//     width: 75px;
//     height: 105px;
//   }
//   .right {
//    flex: 1;
//     height: 130px;
//     margin-left: 12px;
//     font-size: 12px;
//     color: #afb1b9;
//     .bookName {
//       margin-top:12px;
//       font-size: 16px;
//       font-weight: 600;
//       color: #f4865e;
//     }
//     .bookAuthor{
//       margin-top:5px;
//     }
//     .bookMsg {
//       margin-top: 5px;
//       overflow: hidden;
//       -webkit-line-clamp: 2;
//       text-overflow: ellipsis;
//       display: -webkit-box;
//       -webkit-box-orient: vertical;
//     }
//     .bookTag{
//       float: right;
//       line-height: 15px;
//       height: 15px;
//       width: 48px;
//       border: 1px solid  #afb1b9;
//       border-radius: 5px;
//       margin-top:5px;
//     }
//   }
// }
</style>