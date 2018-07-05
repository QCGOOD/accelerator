import Vue from 'vue'
import Router from 'vue-router'
import activity from "./activity";
import user from "./user";
import curriculum from "./curriculum";
import coupon from "./coupon";
import salesman from "./salesman";
Vue.use(Router)
const BASE = '/accelerator/mobile'

export default new Router({
  // mode: 'history',
  // base: BASE,
  routes: [
    {
      path: '/',
      redirect: '/activity',
      component: resolve => require(['@/components/Tabbar'], resolve),
      children: [
        // 活动
        {
          path: '/activity',
          component: resolve => require(['@/view/activity/Home'], resolve),
          meta: {
            title: '加速商学院'
          }
        },
        // 课程
        {
          path: '/curriculum',
          component: resolve => require(['@/view/curriculum/Home'], resolve),
          meta: {
            title: '加速商学院'
          }
        },
        // 我的
        {
          path: '/user',
          component: resolve => require(['@/view/user/User'], resolve),
          meta: {
            title: '个人中心'
          }
        },
      ]
    },
    // 活动的路由
    ...activity,
    // 课程路由
    ...curriculum,
    // 用户的路由
    ...user,
    // 优惠券
    ...coupon,
    // 业务员
    ...salesman
  ]
})
