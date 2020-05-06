import Vue from 'vue'
import Router from 'vue-router'

// 引入页面级组件,使用懒加载
let Home = () => import('../components/home/Home')
let Sort = () => import('../components/sort/Sort')
let Detail = () => import('../components/detail/Detail.vue')
let Cuisine = () => import('../components/cuisine/Cuisine')
let Cart = () => import('../components/cart/Cart')
let Mine = () => import('../components/mine/Mine')
let updateInfo = () => import('../components/mine/updateInfo')
let Order = () => import('../components/order/Order')
let Logistics = () => import('../components/logistics/Logistics')
let Search = () => import('../components/search/Search')

Vue.use(Router)

export default new Router({
  model: history,
  routes: [
    // 首页
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true,  // 需要被缓存
        isBack: false     //isback是true的时候请求数据，或者第一次进入的时候请求数据
      }
    },

    // 分类
    {
      path: '/sort',
      name: 'Sort',
      component: Sort
    },

    // 详情页
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },

    // 烹饪
    {
      path: '/cuisine',
      name: 'Cuisine',
      component: Cuisine
    },

    // 购物车
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },

    // 我的
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },

    // 订单
    {
      path: '/order',
      name: 'Order',
      component: Order
    },

    // 物流
    {
      path: '/logistics',
      name: 'Logistics',
      component: Logistics
    },
    // 用户信息修改
    {
      path: '/updateInfo',
      name: 'updateInfo',
      component: updateInfo
    },
    // 搜索
    {
      path: '/search',
      name: 'Search',
      component: Search
    }

  ]
})
