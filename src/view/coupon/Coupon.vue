<template>
  <div v-if="!pageNoData" class="coupon-wrap">
    <div class="content">
      <div class="img">
        <img src="static/image/feiji.png" alt="">
      </div>
      <div class="coupon-body">
        <div class="left">
          <p class="qc">加速商学院</p>
          <p class="title">{{detail.couponTitle}}</p>
          <div class="par-wrap">
            <span class="par" v-show="detail.couponAmount">￥{{detail.couponAmount | formatPrice}}</span>
            <span class="" v-show="detail.couponOrderAmount">满{{detail.couponOrderAmount | formatPrice}}可用</span>
          </div>
          <p class="date">有效期至：
            <span>{{detail.ruleStartTime | formatDate}}</span>
            <span v-if="detail.ruleStartTime">-</span>
            <span>{{detail.ruleEndTime | formatDate}}</span>
          </p>
        </div>
        <div class="right">
          <img v-if="isGet" src="static/image/receive.png" alt="">
          <div class="content" v-else>
            <p>
              <span class="num">{{detail.receivedQuantity}}</span>
              <span style="color: #f6f6f6;">已领</span>
            </p>
            <div class="btn" v-if="!isPost" @click="receive()">立即领取</div>
            <div class="btn" v-else >立即领取</div>
          </div>
        </div>
      </div>
      <div style="margin: 8vw 5vw 0;">
        <x-button type="primary" style="font-size: 4vw;" @click.native="jumpPage('/activity')">回到首页</x-button>
      </div>
      <div class="info">
        <divider>活动规则</divider>
        <p class="info-text">{{detail.content}}</p>
      </div>
    </div>
    <Qc style="position: fixed;width: 100%;bottom: 0;"/>
  </div>
  <div v-else class="nodata">
    <img class="icon" src="static/image/icon.png" alt="">
    <p class="tip">优惠券已失效</p>
    <div class="btn-more" @click="jumpPage('/activity')">回到首页</div>
  </div>
</template>

<script>
import { Divider, XButton } from 'vux'
export default {
  components: {
    Divider, XButton
  },
  data() {
    return {
      pageNoData: false,
      isGet: false,
      isPost: false,
      detail: {}
    };
  },
  created() {
    this.apiGetDetail()
  },
  methods: {
    apiGetDetail() {
      // 获取券详情
      this.$http.get('/coupon_rule/get', {id: this.$route.query.id})
      .then(res => {
        this.detail = res.data.data
        this.apiGetUser()
      })
      .catch(err => {
        this.pageNoData = true;
      });
    },
    apiReceive() {
      this.isPost = true
      // 领取优惠券
      let params = {
        ruleId: this.$route.query.id || '',
        shareMemberId: this.$route.query.shareMemberId || '',
        channelCode: this.$route.query.channelCode || ''
      }
      this.$http.post('/coupon', params)
      .then(res => {
        this.isGet = true;
        this.toast('领取成功')
      })
      .finally(() => {
        this.isPost = false
      });
    },
    apiGetUser() {
      // 获取用户信息
      this.$http.get('/member/info')
      .then(res => {
        this.userInfo = res.data.data
        // 分享 -- 试听券
        this.$wxSdk.onMenuShare(
          "课程试听券等你来拿，手快有，手慢无~",
          this.detail.couponTitle,
          `${this.$ROOTURL}/mobile/POUND/coupon/getCoupon?id=${this.$route.query.id}${this.userInfo.shareParameter}`,
          'http://athena-1255600302.cosgz.myqcloud.com/attachments/activity/fea644b6d6294c3fad029769d69de5f4.png',
        );
      })
    },
    receive() {
      this.apiReceive()
    },
    jumpPage(url) {
      this.$router.push(url);
    },
  },
  destroyed() {
    this.$wxSdk.onMenuShare(
      "加速商学院",
      "助力优秀企业加速发展！",
      `${this.$ROOTURL}/mobile/POUND/activity?wo=1&wot=2&woacm=1&mpl=1`,
      "http://athena-1255600302.cosgz.myqcloud.com/attachments/abs.jpg"
    );
  },
  filters: {
    'formatDate'(str) {
      if (!str) return '';
      return str.substr(0, 10).replace(/-/g, '.')
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  .img{
    width: 100%;
    height: 50vw;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .coupon-body{
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    font-size: 3.6vw;
    margin:0 3vw;
    .left{
      position: relative;
      flex: 1;
      padding: 0 3vw;
      &::after, &::before{
        content: ' ';
        position: absolute;
        right: -4vw;
        width: 5.5vw;
        height: 5.5vw;
        border-radius: 50%;
        background-color: #f2f2f2;
        z-index: 22;
      }
      &::before{
        top: -3vw;
      }
      &::after{
        bottom: -3vw;
      }
      .qc{
        height: 4.5vw;
        font-size: 3.2vw;
        color: #808080;
        padding-top: 2vw;
        // background: red;
      }
      .title{
        height: 6.5vw;
        // background: red;
        font-size: 4.2vw;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .par-wrap{
        height: 8vw;
        margin-top: 4vw;
        // background: red;
        .par{
          font-size: 5.5vw;
          color: #e2513c;
        }
      }
      .date{
        height: 5vw;
        font-size: 3.2vw;
        color: #808080;
        border-top: 1px solid #eee;
        // background: red;
        padding: 1vw 0;
      }
    }
    .right{
      position: relative;
      display: flex;
      justify-content: center;
      flex-direction: column;
      background-color: #e2513c;
      color: #fff;
      width: 30vw;
      text-align: center;
      margin-left: 1vw;
      img{
        position: absolute;
        top: 50%;
        left: -10%;
        width: 25vw;
        height: 25vw;
        transform: translateY(-12vw)
      }
      .num{
        font-size: 5vw;
      }
      .btn{
        padding: 0.5vw 3vw;
        border-radius: 3vw;
        background-color: #fff;
        font-size: 3.4vw;
        color: #e2513c;
        margin: 5px 3vw 0;
      }
      &::before, &::after {
        content: "";
        position: absolute;
        top: -10px;
        display: block;
        width: 5px;
        height: 100%;
        margin-top: 20px;
        background-size: 10px 6px;
      }
      &::before {
        left: 0;
        background-color: #fff;
        background-position: 100% 35%;
        background-image: linear-gradient(-45deg, #e2513c 25%, transparent 25%, transparent), 
                        linear-gradient(-135deg, #e2513c 25%, transparent 25%, transparent), 
                        linear-gradient(-45deg, transparent 75%, #e2513c 75%), 
                        linear-gradient(-135deg, transparent 75%, #e2513c 75%);
      }
    }
  }
  .info{
    margin: 5vw 3vw;
    padding: 3vw;
    .info-text{
      word-break: break-all;
      font-size: 3.4vw;
      color: #808080;
    }
  }
}
.nodata {
  .icon {
    width: 70%;
    margin: 45px auto 30px;
    display: block;
  }
  .tip {
    font-size: 13px;
    text-align: center;
    margin-bottom: 80px;
  }
  .btn-more {
    width: 175px;
    height: 40px;
    padding: 13px 0;
    margin: 0 auto;
    display: block;
    line-height: 1;
    font-size: 15px;
    text-align: center;
    background: #e2513c;
    color: #fff;
    border-radius: 3px;
    box-sizing: border-box;
  }
}
</style>
