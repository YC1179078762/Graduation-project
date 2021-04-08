<template>
  <div class="the-footer">
    <div class="kong"></div>
    <ul class="item-page">
      <li
        v-for="(item, index) in nameList"
        :key="index"
        :class="{'avtive-page': item.name === activePage}"
        @click="goPage(item)"
      >
        <span :class="{'avtive-icon': item.name === activePage}">
          
            <span :class="item.icon" ></span>
        </span>
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "the-footer",
  data() {
    return {
      activePage:this.$store.getters.activePage,
      nameList:[{
          name:'发现',
          icon:'iconfont icon-551488821353490553221',
          path:'/',
      },{
          name:'MV',
          icon:'iconfont icon-pinglun',
           path:'/bookmall',
      },{
          name:'我的',
          icon:'iconfont icon-wode',
           path:'/my',
      }
      ],
    };
  },
  computed: {
  },
  methods: {
    goPage(val) {
      this.$store.commit("SetActivePage", val.name);
      if(this.activePage==val.name){

      }else{
        this.$router.push({ path: val.path });
      }
      
    },
  },
};
</script>

<style scoped>
.kong {
  width: 100%;
  height: 50px;
}
.item-page {
  position: fixed;
  width: 100%;
  height: 50px;
  bottom: 0;
  z-index: 100px;
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
}

.item-page li {
  flex: 1;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 8px;
  color: #959595;
}

.avtive-page {
  color: #d73e39 !important;
}

.avtive-icon {
  background: linear-gradient(to right, #ff5a4c, #ff1d11);
  color: #ffffff;
  border-radius: 100%;
  min-width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
  font-size: 16px;
}
</style>
