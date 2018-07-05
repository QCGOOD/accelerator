<template>
  <div v-if="!pageNoData" class="lesson-comfrim">
    <div class="content">
      <div class="img" @click="jumpPage(`/curriculum/detail?id=`+detail.courseId)">
        <img v-if="detail.iconUrl" :src="imgCut+detail.iconUrl+cutParam3" alt="">
        <img v-else src="http://placeholder.qiniudn.com/60x60/3c51f/ffffff" alt="">
      </div>
      <div class="info">
        <div class="title">{{detail.title}}</div>
        <div class="info-content">
          <p v-if="detail.startTime">
            <i class="iconfont icon-shijian"></i>
            <span>{{detail.startTime  | dateFormat}}</span>
          </p>
          <p v-if="detail.endTime">
            <i class="iconfont icon-shijian"></i>
            <span>{{detail.endTime | dateFormat}}</span>
          </p>
          <p v-if="detail.address">
            <i class="iconfont icon-dizhi"></i>
            <span>{{detail.address}}</span>
          </p>
        </div>
      </div>
      <div class="bottom-btn">
        <div class="btn" @click="apiGetLeave(true)">确认上课</div>
        <div class="btn" @click="apiGetLeave(false)">我要请假</div>
      </div>
    </div>
    <Qc style="position: fixed;width: 100%;bottom: 0;"/>
  </div>
  <div v-else class="nodata">
    <img class="icon" src="static/image/icon.png" alt="">
    <p class="tip">课时已失效</p>
    <div class="btn-more" @click="jumpPage('/curriculum')">查看更多课程</div>
  </div>
</template>

<script>
import { XButton } from 'vux'
export default {
  components: {
    XButton
  },
  data() {
    return {
      pageNoData: false,
      type: "",
      detail: {}
    };
  },
  created() {
    this.apiGetDetail()
  },
  methods: {
    apiGetDetail() {
      // 获取详情
      this.$http.get('/courseClassLesson/get', {id: this.$route.query.id})
      // this.$http.get('/courseClassLesson/get', {id: '0122855ab1f244f0bbef1e6727e7915c'})
      .then(res => {
        this.detail = res.data.data
      })
      .catch(err => {
        this.pageNoData = true;
      });
    },
    apiGetLeave(state) {
      // 课时请假
      let params = {
        courseClassLessonId: this.$route.query.id,
        // courseClassLessonId: '0122855ab1f244f0bbef1e6727e7915c',
        isSign: state
      }
      this.$http.post('/courseClassLessonSign/update', params)
      .then(res => {
        if(state) this.comfrim()
        else this.cancel()
      })
    },
    jumpPage(url) {
      this.$router.push(url);
    },
    alert(title, content, cb) {
      this.$vux.alert.show({
        title: title,
        content: content,
        buttonText: '好的',
        onShow () {},
        onHide () {
          cb && cb()
        }
      })
    },
    comfrim() {
      let content = '坚持学习，坚持进步，咱们课堂见！'
      this.alert('确认成功', content)
    },
    cancel() {
      let content = '您可以联系课程导师，领取课程视频，期待下次课程与您相见！'
      this.alert('请假成功', content)
      // ${this.$ROOTURL}/mobile/POUND/curriculum/comfrimTime?wo=1&wot=2&woacm=1&mpl=1
    }
  },
  filters: {
    'dateFormat'(str) {
      if (!str) return '';
      let date = str.substr(0,10)
      let time = str.substr(11, 5)
      let arr = date.split('-')
      console.log(time)
      arr.splice(1,0,'年')
      arr.splice(3,0,'月')
      arr.splice(5,0,'日')
      str = arr.join('')
      return str +' '+ time
    }
  }
};
</script>

<style lang="less" scoped>
.lesson-comfrim {
  .content {
    margin: 5vw;
    border-radius: 1.5vw;
    background-color: #fff;
    .img{
      width: 100%;
      height: 130px;
      max-height: 130px;
      overflow: hidden;
      border-radius: 1.5vw 1.5vw 0 0;
      // background-color: #ccc;
      img{
        width: 100%;
      }
    }
    .info{
      padding: 3vw;
      .title{
        font-size: 4.2vw;
        font-weight: 400;
        color: #000;
      }
      .info-content{
        padding: 3vw 0;
        p{
          display: flex;
          justify-content: space-around;
          align-items: baseline;
          padding-top: 1vw;
          color: #808080;
          i{
            font-size: 3.2vw;
            color: @red-color;
            margin-right: 2vw;
          }
          span{
            flex: 1;
            font-size: 3.6vw;
          }
        }
      }
    }
    .bottom-btn{
      display: flex;
      justify-content: space-between;
      // justify-content: center;
      border-top: 1px solid #eee;
      padding: 6vw 3vw;
      // margin: 5vw 0;
      .btn{
        flex:1;
        // width: 50vw;
        text-align: center;
        line-height: 2.7;
        background-color: @red-color;
        border-radius: 5px;
        margin-right: 3vw;
        font-size: 4.2vw;
        color: #fff; 
        &:last-child{
          margin-right: 0;
        }
        &:first-child{
          background-color: #68c000;
        }
      }
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
