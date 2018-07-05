const activity = [
  {
    path: '/activity/list',
    component: resolve => require(['@/view/activity/Category'], resolve),
    meta: {
      title: '活动列表'
    }
  },
  {
    path: '/activity/detail',
    component: resolve => require(['@/view/activity/Detail'], resolve),
    meta: {
      title: '活动详情'
    }
  },
  {
    path: '/activity/sign',
    component: resolve => require(['@/view/activity/Sign'], resolve),
    meta: {
      title: '已报名'
    }
  },
  {
    path: '/activity/submit',
    component: resolve => require(['@/view/activity/Submit'], resolve),
    meta: {
      title: '活动报名'
    }
  },
  {
    path: '/activity/success',
    component: resolve => require(['@/view/activity/Success'], resolve),
    meta: {
      title: '报名成功'
    }
  },
]
export default activity;
