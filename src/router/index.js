import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/loginmodule/login'
import Forget from '../views/loginmodule/forget'
import Register from '../views/loginmodule/register'
import Search from '../views/search/search'
import ShowList from '../views/search/showList'
import SongListBiao from '../views/book/songlistbiao'
import PlaySong from '../views/book/playsong'
import Rank from '../views/book/rank'
import My from '../views/main/my'
import BookMall from '../views/main/bookmall'
import Main from '../views/main/main'
import Catalogue from '../views/book/catalogue'
import Bookstore from '../views/book/bookstore'
import Create from '../views/create/create'
import CreateData from '../views/create/createdata'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      keepAlive: false,
    }
  },
  {
    path: '/create',
    component: Create,
    meta: {
      keepAlive: false,
    }
  }
  ,
  {
    path: '/createdata',
    component: CreateData,
    meta: {
      keepAlive: false,
    }
  }
  ,
  {
    path: '/rank',
    component: Rank,
    meta: {
      keepAlive: false,
    }
  },
  {
    path: '/forget',
    component: Forget,
    meta: {
      keepAlive: false,
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      keepAlive: false,
    }
  },
  {
    path: '/catalogue',
    name: 'Mulu',
    component: Catalogue,
    meta: {
      keepAlive: false,
    }
  }, {
    path: '/bookstore',
    name: 'Neirong',
    component: Bookstore,
    meta: {
      keepAlive: false,
    }
  },
  {
    path: '/songlistbiao/:id',
    name: 'songlistbiao',
    component: SongListBiao,
    meta: {
      keepAlive: false,
    }
  },
  {
    path: '/playsong',
    component: PlaySong,
    meta: {
      keepAlive: false,
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      keepAlive: false,
    }
  },
  {
    path: '/showList',
    component: ShowList,
    meta: {
      keepAlive: false,
    }
  },
  {
    path: '/my',
    component: My,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/bookmall',
    component: BookMall,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/bookshelf',
    component: Main,
    meta: {
      keepAlive: true,
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
