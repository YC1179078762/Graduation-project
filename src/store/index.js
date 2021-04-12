import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    HOST: 'http://localhost:3000',
    activePage: '发现',
    songListUrl: '',
    isList:false,
    login:false,
    search:'',
    user:{
      C_u_id:'',
      C_backgroundUrl:'',
      C_username:'',
    },
    playing: {
      isPlay: false, // 播放状态
      songsList: [], // 当前歌单列表
      id: null, // 音乐ID
      url: '', // 歌曲URL
      duration: 0, //  音乐时长
      curTime: 0, // 当前音乐的播放位置
      changeTime: 0, //  指定播放时刻
      title: '', //  歌名
      artist: '', //  歌手名
      picUrl: "", // 歌曲图片
      autoNext: true, // 用于触发自动播放下一首
      lyric: '', // 未处理的歌词数据
      lrc: [], //  处理的歌词数据
      listIndex: -1 // 当前歌曲在歌曲列表的位置
    },
    create:{
      pic:["data:image/jpeg;base64,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"],
      name:'',
      tags:'',
      text:'',
    }
  },
  mutations: {
    setUserC_backgroundUrl:(state,C_backgroundUrl)=>{state.user.C_backgroundUrl=C_backgroundUrl},
    setUserC_u_id:(state,C_u_id)=>{state.user.C_u_id=C_u_id},
    setUserC_username:(state,C_username)=>{state.user.C_username=C_username},
    setCreatePic:(state,pic)=>{state.create.pic=pic},
    setCreateTags:(state,tags)=>{state.create.tags=tags},
    setCreateName:(state,name)=>{state.create.name=name},
    setCreateText:(state,text)=>{state.create.text=text},
    setToken:(state,token)=>{state.token=token},
    setSearch:(state,search)=>{state.search=search},
    setUserName:(state,name)=>{state.user.name=name},
    setLogin:(state,login)=>{state.login=login},
    setIsList:(state,isList) =>{state.isList=isList},
    SetActivePage: (state, activePage) => { state.activePage = activePage },
    setIsPlay: (state, isPlay) => { state.playing.isPlay = isPlay },
    setPlayButtonUrl: (state, playButtonUrl) => { state.playing.playButtonUrl = playButtonUrl },
    setSongsList: (state, songsList) => { state.playing.songsList = songsList },
    pushSongsList: (state, song) => { state.playing.songsList.unshift(song) },
    setId: (state, id) => { state.playing.id = id },
    setUrl: (state, url) => { state.playing.url = url },
    setDuration: (state, duration) => { state.playing.duration = duration },
    setCurTime: (state, curTime) => { state.playing.curTime = curTime },
    setChangeTime: (state, changeTime) => { state.playing.changeTime = changeTime },
    setTitle: (state, title) => { state.playing.title = title },
    setArtist: (state, artist) => { state.playing.artist = artist },
    setPicUrl: (state, picUrl) => { state.playing.picUrl = picUrl },
    setAutoNext: (state, autoNext) => { state.playing.autoNext = autoNext },
    setLyric: (state, lyric) => { state.playing.lyric = lyric },
    setLrc: (state, lrc) => { state.playing.lrc = lrc },
    setListIndex: (state, listIndex) => { state.playing.listIndex = listIndex }
  },
  actions: {

  },
  modules: {
  },
  getters: {
    userC_backgroundUrl:state=>state.user.C_backgroundUrl,
    userC_username:state=>state.user.C_username,
    userC_u_id:state=>state.user.C_u_id,
    create:state=>state.create,
    createName:state=>state.create.name,
    createText:state=>state.create.text,
    createPic:state=>state.create.pic,
    createTags:state=>state.create.tags,
    token:state=>state.token,
    search:state=>state.search,
    userName:state=>state.user.name,
    login:state => state.login,
    activePage: state => state.activePage,
    isList: state => state.isList,
    isPlay: state => state.playing.isPlay,
    playButtonUrl: state => state.playing.playButtonUrl,
    songsList: state => state.playing.songsList,
    id: state => state.playing.id,
    url: state => state.playing.url,
    duration: state => state.playing.duration,
    curTime: state => state.playing.curTime,
    changeTime: state => state.playing.changeTime,
    title: state => state.playing.title,
    artist: state => state.playing.artist,
    picUrl: state => state.playing.picUrl,
    autoNext: state => state.playing.autoNext,
    lyric: state => state.playing.lyric,
    lrc: state => state.playing.lrc,
    listIndex: state => state.playing.listIndex
  },
})
