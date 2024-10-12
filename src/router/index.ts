import { createRouter, createWebHistory, RouteRecordRaw ,createWebHashHistory} from 'vue-router'
import HomeView from '../views/home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/new_det',
    name: 'newDet',
    component: () => import('../views/newDet.vue')
  },
  {
    path: '/user_shop',
    name: 'userShop',
    component: () => import('../views/userShop.vue')
  },
  {
    path: '/commodity',
    name: 'commodity',
    component: () => import('../views/commodity.vue')
  },
  {
    path: '/comm_det',
    name: 'comm_det',
    component: () => import('../views/commDet.vue')
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('../views/shop.vue')
  },
  {
    path: '/mine_shop',
    name: 'mineShop',
    component: () => import('../views/mineShop.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/order.vue')
  },
  {
    path: '/order_det',
    name: 'order_det',
    component: () => import('../views/orderDet.vue')
  },
  {
    path: '/supplier_det',
    name: 'supplierDet',
    component: () => import('../views/supplierDet.vue')
  },
  {
    path: '/withdraw',
    name: 'withdraw',
    component: () => import('../views/withdraw.vue')
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: () => import('../views/ranking.vue')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/news.vue')
  },
  {
    path: '/inquiry',
    name: 'inquiryOrder',
    component: () => import('../views/inquiryOrder.vue')
  },
  {
    path: '/mjzc',
    name: 'mjzc',
    component: () => import('../views/mjzc.vue')
  },
  {
    path: '/thxy',
    name: 'thxy',
    component: () => import('../views/thxy.vue')
  },
  {
    path: '/shqh',
    name: 'shqh',
    component: () => import('../views/shqh.vue')
  },
  {
    path: '/yszc',
    name: 'yszc',
    component: () => import('../views/yszc.vue')
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

export default router
