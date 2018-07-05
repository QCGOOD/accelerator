const curriculum = [
  // 课程详情
  {
    path: '/curriculum/detail',
    component: resolve => require(['@/view/curriculum/Detail'], resolve)
  },
  // 课程详情
  {
    path: '/curriculum/sign',
    component: resolve => require(['@/view/curriculum/Sign'], resolve)
  },
  // 课程报名
  {
    path: '/curriculum/submit',
    component: resolve => require(['@/view/curriculum/Submit'], resolve),
    meta: {
      title: '课程报名'
    }
  },
  // 课程报名成功
  {
    path: '/curriculum/Success',
    component: resolve => require(['@/view/curriculum/Success'], resolve)
  },
  // 课程金句
  {
    path: '/curriculum/slectGolden',
    component: resolve => require(['@/view/curriculum/SlectGolden'], resolve)
  },
  // 确认上课
  {
    path: '/curriculum/comfrimTime',
    component: resolve => require(['@/view/curriculum/ComfrimTime'], resolve)
  },

]
export default curriculum;
