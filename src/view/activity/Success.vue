<template>
  <div class="sign-success">
    <div class="success white">
      <div class="gou" v-if="type == 0">
        <i class="iconfont icon-chenggong"></i>
        <p>报名成功！</p>
      </div>
      <div class="gou" v-else-if="type == 1">
        <i class="iconfont icon-chenggong"></i>
        <p>预报名成功！</p>
        <p class="desc">正在等待管理员审核...</p>
      </div>
      <div class="gou" v-else-if="type == 2">
        <i class="iconfont icon-chenggong"></i>
        <p>签到成功</p>
      </div>
      <div class="sum">
        <div class="item">
          <p>已报名活动</p>
          <p><span>{{activityNum.signActivityNum}}</span>个</p>
        </div>
        <!-- <div class="item">
          <p>待参加活动</p>
          <p><span>11</span>个</p>
        </div> -->
      </div>
      <p class="back-btn" @click="jumpPage('/activity')">返回首页</p>
      <div class="qrcode">
        <div class="left">
          <p>长按识别二维码关注</p>
          <p>加速商学院</p>
          <p>在这里，收获您的知识与梦想！</p>
        </div>
        <div class="right">
          <img src="static/image/qrcode.jpg">
        </div>
      </div>
    </div>
    <Qc style="margin-top:40px;"/>
    <div class="mask" v-if="shareWrap">
      <img class="share-nav" src="../../../static/image/share-nav.png" alt="" srcset="">
      <img class="share-bg" src="../../../static/image/share.jpg" alt="" srcset="">
      <p class="text">邀请好友一起参加吧！</p>
      <i class="iconfont icon-x" @click="shareWrap = false"></i>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      shareWrap: false,
      type: "",
      activityNum: {}
    };
  },
  created() {
    let shareData = localStorage.getItem('shareData').split(',,')
    // 分享配置
    this.$wxSdk.onMenuShare(shareData[0], shareData[1], shareData[2], shareData[3],
      () => {
        this.shareWrap = false
      }
    )
    this.type = this.$route.query.type;
    this.apiGetActivityNum();
  },
  mounted() {
    setTimeout(()=> {
      this.shareWrap = true
    },1500)
  },
  methods: {
    apiGetActivityNum() {
      this.$http.get('/my/activityNum')
        .then(res => {
          this.activityNum = res.data.data;
        });
    },
    jumpPage(url) {
      this.$router.push(url);
    }
  },
  destroyed() {
    localStorage.removeItem('shareData')
    this.$wxSdk.onMenuShare(
      "加速商学院",
      "助力优秀企业加速发展！",
      `${this.$ROOTURL}/mobile/POUND/activity?wo=1&wot=2&woacm=1&mpl=1`,
      "http://athena-1255600302.cosgz.myqcloud.com/attachments/abs.jpg");
  }
};
</script>

<style lang="less" scoped>
.sign-success {
  .success {
    margin: 10vw 5vw 5vw 5vw;
    border-radius: 1vw;
    position: relative;
    .user {
      position: absolute;
      left: 0;
      right: 0;
      top: -7vw;
      text-align: center;
      .img {
        width: 15vw;
        height: 15vw;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
      }
      p {
        font-size: 4vw;
        margin-top: 1vw;
      }
    }
    .gou {
      padding: 10vw 0;
      text-align: center;
      color: rgb(104, 192, 0);
      i {
        font-size: 14vw;
        margin-right: 3vw;
      }
      span {
        font-size: 4.5vw;
        line-height: 15vw;
      }
    }
    .sum {
      margin: 5vw 0;
      padding: 0 8vw;
      display: flex;
      justify-content: space-around;
      line-height: 1.2;
      .item {
        text-align: center;
        p {
          font-size: 4vw;
          &:last-child {
            font-size: 3.2vw;
            color: @gray-color;
            span {
              color: rgb(51, 51, 51);
              font-weight: bold;
              font-size: 12vw;
            }
          }
        }
      }
    }
    .desc {
      margin-top: 1vw;
      text-align: center;
      height: 10vw;
      line-height: 10vw;
      color: @gray-color;
      font-size: 3.8vw;
    }
    .back-btn {
      text-align: center;
      width: 20%;
      margin: 0 auto 20px;
      font-size: 14px;
      text-decoration: underline;
      color: #717171;
    }
    .qrcode {
      // height: 35vw;
      background-color: rgb(104, 192, 0);
      color: #fff;
      display: flex;
      padding: 4vw 3vw;
      border-bottom-left-radius: 2vw;
      border-bottom-right-radius: 2vw;
      .left {
        display: inline-flex;
        flex-flow: column;
        justify-content: center;
        align-content: center;
        p {
          text-align: center;
          font-size: 3.6vw;
          &:first-child {
            letter-spacing: 1.2vw;
          }
          &:nth-child(2) {
            padding: 1vw 0;
            font-size: 6vw;
            font-weight: bold;
            letter-spacing: 2vw;
          }
        }
      }
      .right {
        width: 30vw;
        height: 30vw;
        flex-shrink: 0;
        margin-left: 2vw;
        img {
          height: 100%;
        }
      }
    }
  }
  .center {
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
  }
  .mask {
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.75);
    .share-nav {
      width: 40%;
      position: absolute;
      right: 15px;
      top: 10px;
    }
    .share-bg {
      .center;
      width: 78%;
      top: 180px;
    }
    .text {
      .center;
      top: 235px;
      font-size: 16px;
      color: #fff;
    }
    .iconfont {
      .center;
      top: 330px;
      font-size: 35px;
      color: #fff;
    }
  }
}
</style>
