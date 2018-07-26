<template>
  <div v-if="!pageNoData" class="detail">
    <!-- 头部 -->
    <header class="header">
      <div class="header__cover">
        <img class="cover" :src="`${imgHost}${model.iconUrl}`">
        <p class="countDown" v-if="lastTime">距活动开始仅：{{ lastTime }}</p>
      </div>
      <hgroup class="header__content">
        <h1 class="title">{{ model.title }}</h1>
        <h3 class="price" v-if="model.isEnableFee">
          <span>￥</span>{{ model.activityFee.price | formatPrice }}
        </h3>
        <h3 class="price" v-else>
          免费
        </h3>
      </hgroup>
    </header>
    <!-- 单项 -->
    <ul class="lists">
      <li class="list">
        <i class="iconfont icon-shijian"></i>
        <span class="value">{{model.startTimeStr}}&nbsp;至&nbsp;{{model.endTimeStr}}</span>
      </li>
      <li class="list">
        <i class="iconfont icon-dizhi"></i>
        <span class="value">{{model.address}}</span>
      </li>
      <li class="list" v-if="model.sponsor">
        <i class="iconfont icon-zhu"></i>
        <span>{{model.sponsor}}</span>
      </li>
      <li class="list" v-if="model.organizer">
        <i class="iconfont icon-xie"></i>
        <span>{{model.organizer}}</span>
      </li>
    </ul>
    <!-- 报名人数 -->
    <div class="sign-up-box white" @click="jumpSignPage(`/activity/sign?id=${$route.query.id}&c=${model.activitySignSetting.maxNum}&s=${model.activitySignSetting.signNum}`)">
      <div class="item sign-up">
        <div class="left">
          <i class="iconfont icon-baoming"></i>
          <span>已报名 （{{model.activitySignSetting.signNum}}/{{model.activitySignSetting.maxNum}}）</span>
        </div>
        <div class="right">
          <div class="img" v-for="(item,i) in model.activitySignSetting.imageList" :key="i">
            <img :src="item">
          </div>
        </div>
        <i class="iconfont icon-jiantou"></i>
      </div>
    </div>
    <!-- 内容 -->
    <div class="context">
      <div class="intro white">
        <p class="title iconfont icon-jianjie vux-1px-b">活动简介</p>
        <div class="html">
          <div v-html="model.content"></div>
        </div>
      </div>
    </div>
    <!-- 取消按钮 -->
    <p class="cancel-sign" @click="apiCancelSign(model.sign.id)" v-if="model.activitySignSetting.isEnableUnsign && model.sign">取消报名</p>
    <!-- 广告 -->
    <Qc/>
    <!-- 按钮组 -->
    <div class="button-group vux-1px-t" v-if="model.isRelease">
      <div class="left" @click="jumpPage('/activity')">
        <i class="iconfont icon-huodong"></i>
        <p>更多活动</p>
      </div>
      <div class="right disabled" v-if="matchTime == 0">未开始</div>
      <div class="right disabled" v-else-if="matchTime == 1">报名已截止</div>
      <div class="right" v-else-if="model.sign && model.sign.status == 1" >审核中</div>
      <div class="right pay" v-else-if="model.sign && model.sign.status == 4" @click="apiPayOrder()">微信支付</div>
      <div class="right" v-else-if="model.sign && model.sign.status == 6">报名成功</div>
      <div class="right" v-else @click="jumpPay()">我要报名</div>
    </div>
    <!-- 留言 -->
    <DetailRemake v-if="model.isEnableComment"
      :is-enable-comment-audit="model.isEnableCommentAudit"
      :source-id="query.id"/>
    <div style="height:15vw"></div>
  </div>
  <ErrorPage tip="活动已经失效" url="/activity" v-else />
</template>

<script>
import ErrorPage from "../../components/ErrorPage";
import DetailRemake from "./DetailRemake";
import { Checker, CheckerItem } from "vux";

export default {
  components: {
    Checker,
    CheckerItem,
    ErrorPage,
    DetailRemake
  },
  data() {
    return {
      model: {},
      pageNoData: false,
      lastTime: "",
      user: {}
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user;
    },
    matchTime() {
      let startTime = this.model.activitySignSetting.signStartTime.replace(/\-/g, "/");
      let endTime = this.model.activitySignSetting.signEndTime.replace(/\-/g, "/");
      if ((new Date(startTime)) > (new Date())) {
        // 活动未开始
        console.log('活动状态=======>未开始')
        return 0
      } else if ((new Date(endTime)) < (new Date())) {
        // 活动已结束
        console.log('活动状态=======>已结束')
        return 1
      } else {
        // 可以报名
        console.log('活动状态=======>进行中')
        return 2
      }
    },
  },
  created() {
    this.query = this.$route.query;
    this.apiGetUser();
  },
  methods: {
    apiGetUser() {
      this.$http.get("/member/info").then(res => {
        this.user = res.data.data;
        this.apiGetActive(this.query.id, this.query.shareMemberId);
      });
    },
    apiGetActive(id, shareMemberId) {
      this.$http.get("/activity/get", { id, shareMemberId })
        .then(res => {
          this.model = res.data.data;
          document.title = this.model.title;
          // 分享链接
          let url = `${this.$ROOTURL}/mobile/POUND/activity/detail?id=${id}&shareMemberId=${this.userInfo.id}${this.user.shareParameter}`;
          if (this.userInfo.is_distributer) {
            // 分销分享链接
            url += `&dst=1&dstr=${this.userInfo.id}`;
          }
          // 倒计时
          this.countDown(this.model.startTime);
          // 分享配置
          this.$wxSdk.onMenuShare(
            this.model.title,
            this.model.info,
            url,
            `${this.imgHost}${this.model.iconUrl}`,
            this.recordShare);
          localStorage.setItem('shareData',`${this.model.title},,${this.model.info},,${url},,${this.imgHost}${this.model.iconUrl}`)
        })
        .catch(err => {
          if (err.data.code == 40001) {
            this.pageNoData = true;
          }
        });
    },
    // 创建分享记录
    recordShare(url) {
      let params = {
        sourceId: this.$route.query.id,
        sourceType: 2,
        url: url
      }
      this.$http.post('/share/insert', params).then(res => {
      })
    },
    apiPayOrder() {
      this.$vux.loading.show({ text: "正在发起支付" });
      this.$http.post("/pay", {
          orderId: this.model.sign.id,
          orderType: 2,
          payReturnUrl: location.href
        })
        .then(res => {
          location.href = `${this.$ROOTURL}/pay.html?token=${
            res.data.data.id
          }`;
        });
    },
    apiCancelSign(id) {
      const _this = this;
      this.$vux.confirm.show({
        title: '提示',
        content: '是否取消本次报名',
        onCancel () {
          console.log('plugin cancel')
        },
        onConfirm () {
          _this.$http.post('/activitySignTemp/cancel', {id})
            .then(res => {
              _this.apiGetActive(this.query.id, this.query.shareMemberId)
            })
        }
      })
    },
    jumpSignPage(url) {
      if(this.model.activitySignSetting.isShowSignMembers) {
        this.$router.push(url);
      }
    },
    jumpPage(url) {
      this.$router.push(url);
    },
    jumpPay() {
      this.$router.push({ path: "/activity/submit", query: this.query });
    },
    // 倒计时
    countDown(str) {
      let newStr = str.replace(/\-/g, "/");
      //获取当前时间
      let now = Date.now();
      //设置截止时间
      let endDate = new Date(newStr);
      let end = endDate.getTime();
      //时间差
      let lastTime = end - now;
      // 时间低于两天 并且不能出现负数
      if (lastTime <= 172800000 && lastTime > 0) {
        let [d, h, m, s] = [
          Math.floor(lastTime / 1000 / 60 / 60 / 24),
          Math.floor((lastTime / 1000 / 60 / 60) % 24),
          Math.floor((lastTime / 1000 / 60) % 60),
          Math.floor((lastTime / 1000) % 60)
        ];
        this.lastTime = `${d}天${h}时${m}分${s}秒`;
        this.timer = setTimeout(this.countDown, 1000, str);
      }
    },
  },
  destroyed() {
    clearInterval(this.timer);
    this.$wxSdk.onMenuShare(
      "加速商学院",
      "助力优秀企业加速发展！",
      `${this.$ROOTURL}/mobile/POUND/activity?wo=1&wot=2&woacm=1&mpl=1`,
      "http://athena-1255600302.cosgz.myqcloud.com/attachments/abs.jpg"
    );
  }
};
</script>

<style lang="less" scoped>
@import url('../../assets/css/detail.less');
</style>
