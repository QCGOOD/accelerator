<template>
  <div class="study-box">
    <div class="my" @click="jumpPage('/user/userInfo')">
      <img :src="user.headImage" alt="">
      <p>{{user.name}}</p>
    </div>
    <div class="scan" @click="qrCode()">
      <i class="iconfont icon-qiandao"></i>
    </div>
    <div class="rankings">
      <div class="item">
        <div class="dai">
          <img src="static/image/dai.png" alt="">
        </div>
        <div class="hua">
          <img src="static/image/study.png" alt="">
          <span>{{levelTow.level}}</span>
        </div>
        <p class="big vux-1px-r">{{levelTow.experienceAmount}}</p>
        <p class="type">{{levelTow.name}}<span> | </span>学习力</p>
      </div>
      <div class="item">
        <div class="dai">
          <img src="static/image/dai.png" alt="">
        </div>
        <div class="hua">
          <img src="static/image/Influence.png" alt="">
          <span>{{levelOne.level}}</span>
        </div>
        <p class="big">{{levelOne.experienceAmount}}</p>
        <p class="type">{{levelOne.name}}<span> | </span>影响力</p>
      </div>
    </div>
    <div class="time">
      <p class="item">
        您学习了<br>
        <span>{{user.studyDays}}天</span>
      </p>
      <p class="item">
        报名活动<br>
        <span>{{user.signActivityNum}}个</span>
      </p>
      <p class="item">
        累计签到<br>
        <span>{{user.checkinNum}}次</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 用户
      user: {},
      // 影响力
      levelOne: {},
      // 学习力
      levelTow: {}
    };
  },
  created() {
    this.apiGetUser();
    this.apiGetLevel(1);
    this.apiGetLevel(2);
  },
  methods: {
    apiGetUser() {
      this.$http.get("/my/myMsg").then(res => {
        this.user = res.data.data;
      });
    },
    apiGetLevel(type) {
      this.$http.get("/member/level", { type }).then(res => {
        if (type == 1) {
          this.levelOne = res.data.data;
        } else {
          this.levelTow = res.data.data;
        }
      });
    },
    qrCode() {
      this.$wxSdk.scanQRCode();
    },
    jumpPage(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style lang="less" scoped>
.study-box {
  margin: 10vw 5vw 5vw 5vw;
  background-color: #fff;
  border-radius: 3vw;
  position: relative;
  .scan {
    position: absolute;
    top: 8px;
    right: 12px;
    z-index: 66;
    i {
      font-size: 22px;
      color: #bbb;
    }
  }
  .my {
    text-align: center;
    position: absolute;
    top: -7.5vw;
    left: 0;
    right: 0;
    padding-bottom: 2vw;
    img {
      width: 15vw;
      height: 15vw;
      border-radius: 50%;
    }
    p {
      font-size: 4vw;
    }
  }
  .rankings {
    padding-top: 17.5vw;
    display: flex;
    .item {
      display: inline-flex;
      flex-flow: column;
      width: 50%;
      align-content: center;
      justify-content: center;
      text-align: center;
      .dai {
        width: 8vw;
        margin: 0 auto;
        line-height: 0;
        padding-bottom: 0.2vw;
      }
      .hua {
        width: 10vw;
        position: relative;
        margin: 0 auto;
        span {
          position: absolute;
          top: 0;
          font-weight: bold;
          font-size: 4.5vw;
          text-align: center;
          left: 0;
          right: 0;
          line-height: 11vw;
        }
      }
      .big {
        font-weight: bold;
        font-size: 8vw;
        line-height: 1.2;
      }
      .type {
        color: @gray-color;
        font-size: 3.8vw;
      }
    }
  }
  .time {
    margin-top: 2vw;
    padding: 5px 4vw;
    font-size: 3.6vw;
    display: flex;
    justify-content: space-between;
    text-align: center;
    border-bottom-left-radius: 3vw;
    border-bottom-right-radius: 3vw;
    color: #fff;
    background-color: rgb(74, 74, 74);
    .item {
      span {
        color: rgb(229, 210, 168);
      }
    }
  }
}
</style>
