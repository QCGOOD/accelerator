<template>
  <div class="btn-box">
    <div class="item" :class="{ 'vux-1px-b': i < 6 }" v-for="(item, i) in btnList" :key="i" @click="goLink(item)">
      <i class="iconfont" :class="item.icon"></i>
      <p>{{item.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnList: [
        // { name: "签到", icon: "icon-qiandao", click: true },
        { name: "我的活动", icon: "icon-huodong", link: "/user/activity" },
        
        { name: '我的课程', icon: 'icon-kecheng2', link: '/user/course' },
        { name: "我的行程", icon: "icon-rili", link: "/user/calendar" },
        { name: '我的班级', icon: 'icon-wodebanji', link: '/user/class' },
        { name: "我的小结", icon: "icon-kechengxiaojie", link: "/user/summary" },
        { name: '我的试听券', icon: 'icon-wodeshitingquan', link:'/user/coupon'},
        // { name: "我的日程", icon: "icon-kecheng2", link: "/user/mySchedule" },
        // { name: '金句', icon: 'icon-wodebanji', link: '/curriculum/slectGolden' },
        // { name: '帮助与反馈', icon: 'icon-bangzhu', link: '/user/help' },
      ],
    }
  },
  methods: {
    goLink(item) {
      if (!item.link && !item.click) return;
      if (item.click) this.qrCode();
      else this.$router.push(item.link);
    },
    jumpPage(url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  background-color: #fff;
  border-radius: 3vw;
  margin: 5vw;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 30vw;
    // height: 30vw;
    padding: 3vw 0;
    font-size: 4vw;
    display: inline-flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    i {
      color: @red-color;
      font-size: 7vw;
    }
    &:active {
      background-color: @active-color;
    }
  }
}
</style>
