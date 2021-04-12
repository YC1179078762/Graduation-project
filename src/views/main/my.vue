<template>
  <div class="my">
    <div class="my-login-head">
      <div class="head-icon">
        <span class="iconfont icon-wode"></span>
      </div>
      <div class="user-login">
        <span v-show="!login" @click="$router.push('/login')">立即登录</span>
        <span v-show="login">{{ userC_username }}</span>
      </div>
    </div>
    <div class="my-nav-icon">
      <div class="nav-icon">
        <div class="icon">
          <span class="iconfont icon-xiazai"></span>
          <p>本地下载</p>
        </div>
        <div class="icon">
          <span class="iconfont icon-pinglun"></span>
          <p>评论</p>
        </div>
        <div class="icon">
          <span class="iconfont icon-gengduo1"></span>
          <p>更多</p>
        </div>
        <div class="icon">
          <span style="font-size: 30px" class="iconfont icon-bofang"></span>
          <p>最近播放</p>
        </div>
      </div>
      <div class="nav-icon">
        <div class="icon">
          <span class="iconfont icon-wode"></span>
          <p>我的好友</p>
        </div>
        <div class="icon">
          <span class="iconfont icon-pinglun"></span>
          <p>收藏</p>
        </div>
        <div class="icon">
          <span class="iconfont icon-FM_weixuanze"></span>
          <p>我的播客</p>
        </div>
        <div class="icon"></div>
      </div>
    </div>
    <div class="my-love">
      <div class="love-icon">
        <span class="iconfont icon-xihuan"> </span>
      </div>
      <div class="love-title">
        <p>我喜欢的音乐</p>
      </div>
    </div>
    <div class="my-create">
      <h2>
        <a>创建歌单</a>
        <a>收藏歌单</a>
      </h2>
      <div class="create-songlist">
        <div class="create-head">
          <div class="create-head-title">创建歌单({{ userCreate.length }}个)</div>
          <div class="create-head-icon" @click="addSongLists()">
            <van-icon name="plus" />
          </div>
          <div class="create-head-icon">
            <span class="iconfont icon-gengduo"></span>
          </div>
        </div>
        <div @click="addSongLists(index)" v-for="(item,index) in userCreate" :key="index">
          <img :src="item.pic" alt="">
          <div>{{item.name}}</div>
        </div>
      </div>
      <div class="collection-songlist">
        <div class="collection-head">
          <div class="collection-head-title">收藏歌单</div>
          <div class="collection-head-icon">
            <span class="iconfont icon-gengduo"></span>
          </div>
        </div>
      </div>
    </div>
    <MainPlay></MainPlay>
    <YinFooter></YinFooter>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Dialog } from 'vant';
import YinFooter from "../../components/content/TheFooter";
import MainPlay from "../../components/content/MainPlay";
export default {
  components: {
    YinFooter,
    MainPlay,
  },
  data() {
    return {
     userCreate:[],
    };
  },
  computed: {
    ...mapGetters(["login", "userName", "token","userC_username"]),
  },
  mounted(){
  },
  methods: {
    addSongLists() {
      console.log(this.token)
      if (this.token!='') {
        this.$router.push('/create');
      } else {
        Dialog.confirm({
          title: "标题",
          message: "弹窗内容",
        })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.my-login-head {
  margin: 40px 0 0 20px;
  font-size: 20px;
  display: flex;
  align-items: center;
  .head-icon {
    width: 33px;
    height: 33px;
    border-radius: 50%;
    border: 2px solid white;
    background-color: red;
    color: white;
    text-align: center;
    span {
      font-size: 28px;
    }
  }
  .user-login {
    margin-left: 15px;
  }
}
.my-nav-icon {
  background-color: #fff;
  margin: 15px 20px;
  height: 150px;
  border-radius: 10px;
  box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.1);
  .nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      margin-top: 20px;
      text-align: center;
      flex: 1;
      span {
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-radius: 50%;
        background-color: red;
        font-size: 25px;
        color: white;
      }
      p {
        margin-top: 2px;
        font-size: 10px;
      }
    }
  }
}
.my-love {
  background-color: #fff;
  margin: 15px 20px;
  height: 70px;
  border-radius: 10px;
  box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.1);
  display: flex;

  line-height: 60px;
  align-items: center;
  justify-content: center;
  .love-icon {
    text-align: center;
    margin-left: 10px;
    background-color: slategray;
    border-radius: 10px;
    color: #fff;
    width: 60px;
    height: 60px;
    span {
      font-size: 30px;
    }
  }
  .love-title {
    flex: 1;
    margin-left: 10px;
    p {
      font-size: 16px;
    }
  }
}
.my-create {
  h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      display: inline-block;
      width: 50%;
      text-align: center;
    }
  }
  .create-songlist {
    background-color: #fff;
    margin: 15px 20px;
    height: 70px;
    border-radius: 10px;
    box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.1);
    .create-head {
      display: flex;
      align-items: center;
      justify-content: center;
      .create-head-title {
        flex: 1;
        text-indent: 10px;
      }
      .create-head-icon {
        width: 30px;
        text-align: center;
        i {
          font-size: 20px;
        }
        span {
          font-size: 20px;
        }
      }
    }
  }
  .collection-songlist {
    background-color: #fff;
    margin: 15px 20px;
    height: 70px;
    border-radius: 10px;
    box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.1);

    .collection-head {
      display: flex;
      align-items: center;
      justify-content: center;
      .collection-head-title {
        flex: 1;
        text-indent: 10px;
      }
      .collection-head-icon {
        width: 30px;
        text-align: center;
        i {
          font-size: 20px;
        }
        span {
          font-size: 20px;
        }
      }
    }
  }
}
</style>