const user = [
  // 个人资料
  {
    path: '/user/userInfo',
    component: resolve => require(['@/view/user/UserInfo'], resolve),
    meta: {
      title: '个人资料'
    }
  },
  // 修改手机
  {
    path: '/user/revisePhone',
    component: resolve => require(['@/view/user/UserReceivePhone'], resolve),
    meta: {
      title: '修改手机'
    }
  },
  // 修改个人资料
  {
    path: '/user/receiveUser',
    component: resolve => require(['@/view/user/UserReceiveInfo'], resolve),
    meta: {
      title: '修改资料'
    }
  },
  // 签到
  {
    path: '/user/sign',
    component: resolve => require(['@/view/user/UserSign'], resolve),
    meta: {
      title: '签到'
    }
  },
  // 我的活动
  {
    path: '/user/activity',
    component: resolve => require(['@/view/user/UserDashboardActivity'], resolve),
    meta: {
      title: '我的活动'
    }
  },
  // 我的日历
  {
    path: '/user/calendar',
    component: resolve => require(['@/view/user/UserDashboardCalendar'], resolve),
    meta: {
      title: '我的日历'
    }
  },
  {
    path: '/activity/calendar',
    component: resolve => require(['@/view/user/UserDashboardActivityCalendar'], resolve),
    meta: {
      title: '活动日历'
    }
  },
  // 班级列表
  {
    path: '/user/class',
    component: resolve => require(['@/view/user/UserDashboardClass'], resolve),
    meta: {
      title: '我的班级'
    }
  },
  // 班级详情
  {
    path: '/user/class/detail',
    component: resolve => require(['@/view/user/UserDashboardClassDetail'], resolve),
    meta: {
      title: '班级详情'
    }
  },
  // 我的优惠券
  {
    path: '/user/coupon',
    component: resolve => require(['@/view/user/UserDashboardCoupon'], resolve),
    meta: {
      title: '我的优惠券'
    }
  },
  // 适用活动
  {
    path: '/user/fitActivity',
    component: resolve => require(['@/view/user/UserDashboardCouponFit'], resolve),
    meta: {
      title: '适用活动'
    }
  },
  // 我的日程
  {
    path: '/user/mySchedule',
    component: resolve => require(['@/view/user/UserDashboardSchedule.vue'], resolve),
    meta: {
      title: '我的日程'
    }
  },
  // 我的课程
  {
    path: '/user/course',
    component: resolve => require(['@/view/user/UserDashboardCourse'], resolve),
    meta: {
      title: '我的课程'
    }
  },
  // 回顾列表
  {
    path: '/user/summary',
    component: resolve => require(['@/view/User/UserDashboardSummary'], resolve),
    meta: {
      title: '我的回顾'
    }
  },
  // 课回顾详情
  {
    path: '/user/summaryDetail',
    component: resolve => require(['@/view/user/UserDashboardSummaryDetail'], resolve),
    meta: {
      title: '回顾详情'
    }
  },
  // 帮助
  {
    path: '/user/help',
    component: resolve => require(['@/view/user/UserDashboardHelp'], resolve)
  },
]
export default user;
