const coupon = [
    // 试听券领取成功
    {
      path: '/coupon/success',
      component: resolve => require(['@/view/coupon/Success'], resolve)
    },
    // 优惠券领取页
    {
      path: '/coupon/getCoupon',
      component: resolve => require(['@/view/coupon/Coupon'], resolve)
    },
    // 领券
    {
      path: '/receiveSuccess',
      component: resolve => require(['@/view/coupon/ReceiveSuccess'], resolve)
    }
]
export default coupon;
