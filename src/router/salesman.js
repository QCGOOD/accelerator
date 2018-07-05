const salesman = [
  // 业务员注册
  {
    path: '/salesman/receive',
    component: resolve => require(['@/view/salesman/Receive'], resolve),
    meta: {
      title: '修改资料'
    }
  }
]
export default salesman;
