<template>
  <div v-if="!pageNoData" class="detail">
    <!-- 头部 -->
    <header class="header">
      <div class="header__cover">
        <img class="cover" :src="`${imgHost}${detail.iconUrl}`">
      </div>
      <hgroup class="header__content">
        <h1 class="title">{{ detail.title }}</h1>
        <p class="type" v-if="detail.courseTagList.length > 0">
          <span v-for="(tag,i) in detail.courseTagList" :key="i">{{tag.name}}</span>
        </p>
        <ul class="course-info">
          <li class="list">
            <span>学费：</span><font color="#e2513c">{{detail.price}}</font>
          </li>
          <li class="list">
            <span>学制：</span><font color="#666">{{detail.educationalSystem}}</font>
          </li>
        </ul>
      </hgroup>
    </header>
    <!-- 报名人数 -->
    <div class="sign-up-box white" @click="jumpSignPage(`/curriculum/sign?id=${$route.query.id}&s=${detail.signNum}`)">
      <div class="item sign-up">
        <div class="left">
          <i class="iconfont icon-baoming"></i>
          <span>已报名（{{detail.signNum}}）</span>
        </div>
        <div class="right">
          <div class="img" v-for="(item,i) in detail.imageList" :key="i">
            <img :src="item">
          </div>
        </div>
        <i class="iconfont icon-jiantou"></i>
      </div>
    </div>
    <!-- 内容 -->
    <div class="context">
      <div class="intro white">
        <p class="title iconfont icon-jianjie1 vux-1px-b">课程详情</p>
        <div class="html">
          <div v-if="detail.content" v-html="detail.content"></div>
        </div>
      </div>
    </div>
    <!-- 广告 -->
    <Qc/>
    <div style="height:15vw"></div>
    <!-- 按钮组 -->
    <div class="bottom-group vux-1px-t" v-if="detail.isRelease">
      <div class="left" @click="jumpPage('/curriculum')">
        <i class="iconfont icon-kecheng2"></i>
        <p>更多课程</p>
      </div>
      <div class="right" v-if="detail.sign && detail.sign.status == 1" >审核中</div>
      <div class="right pay" v-else-if="detail.sign && detail.sign.status == 4" @click="apiPayOrder()">微信支付</div>
      <div class="right" v-else-if="detail.sign && detail.sign.status == 6">报名成功</div>
      <div class="right" v-else @click="jumpPay()">我要报名</div>
    </div>
  </div>
  <ErrorPage tip="课程已失效" url="/curriculum" v-else />
</template>

<script>
import ErrorPage from "../../components/ErrorPage";

export default {
  components: { ErrorPage },
  data () {
    return {
      showToast: true,
      detail: {},
      pageNoData: false
    }
  },
  created() {
    this.apiGetOne()
  },
  computed: {
    userInfo() {
      return this.$store.state.user;
    }
  },
  methods: {
    apiPayOrder() {
      this.$vux.loading.show({ text: "正在发起支付" });
      this.$http
        .post("/pay", {
          orderId: this.detail.sign.id,
          orderType: 2,
          payReturnUrl: location.href
        })
        .then(res => {
          location.href = `${this.$ROOTURL}/pay.html?token=${res.data.data.id}`;
        });
    },
    apiGetOne() {
      this.$http.get('/course/get', {id: this.$route.query.id, shareMemberId: this.$route.query.shareMemberId})
      .then(res => {
        this.detail = res.data.data
        document.title = this.detail.title;
        this.detail.content = this.detail.content.replace(/width: 100%;/g, '')
        // 分享
        let url = `${this.$ROOTURL}/mobile/POUND/curriculum/detail?wo=1&wot=2&woacm=1&mpl=1&id=${this.$route.query.id}&shareMemberId=${this.userInfo.id}`
        if (this.userInfo.is_distributer) {
          url += `&dst=1&dstr=${this.userInfo.id}`;
        }
        this.$wxSdk.onMenuShare(
          this.detail.title,
          this.detail.info,
          url,
          this.imgHost+this.detail.iconUrl,
          this.recordShare
        )
      })
      .catch(err => {
          if (err.data.code == 40001) {
            this.pageNoData = true;
          }
        });
    },
    jumpSignPage(url) {
      if(this.detail.isShowSignMembers) {
        this.$router.push(url);
      }
    },
    jumpPage(url) {
      this.$router.push(url);
    },
    // 报名
    jumpPay() {
      this.$router.push({ path: "/curriculum/submit", query: this.$route.query });
    },
    // 创建分享记录
    recordShare(url) {
      let params = {
        sourceId: this.$route.query.id,
        sourceType: 3,
        url: url
      }
      this.$http.post('/share/insert', params).then(res => {
      })
    }
  },
  destroyed() {
    clearInterval(this.timer);
    this.$wxSdk.onMenuShare(
      "加速商学院",
      "助力优秀企业加速发展！",
      `${this.$ROOTURL}/mobile/POUND/activity?wo=1&wot=2&woacm=1&mpl=1`,
      "http://athena-1255600302.cosgz.myqcloud.com/attachments/abs.jpg"
    );
  },
  filters: {
    'dateFormat'(str) {
      str = str.substr(0,10)
      let arr = str.split('-')
      // arr[1] = '年'
      // arr[2] = '月'
      // arr[5] = '日'
      arr.splice(1,0,'年')
      arr.splice(3,0,'月')
      arr.splice(5,0,'日')
      str = arr.join('')
      return str
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../assets/css/detail.less');

.header .header__content {
  margin-bottom: 15px;
  .type {
    margin: 10px 0;
    position: relative;
    padding-right: 5vw;
    span {
      padding: 0 2vw;
      height: 5vw;
      margin-right: 2vw;
      display: inline-block;
      font-size: 3.4vw;
      line-height: 5vw;
      border-radius: 1vw;
      color: #fff;
      background-color: rgb(211, 194, 165);
      &:last-child {
        margin-right: 0;
      }
    }
    .icon-shoucang {
      position: absolute;
      right: 0;
      color: @light-color;
      font-size: 5vw;
    }
  }
  .course-info {
    font-size: 14px;
    .list {
      margin-top: 10px;
    }
  }
}
</style>
