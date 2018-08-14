<template>
  <div class="sign-item vux-1px-t white">
    <div class="info-box">
      <div class="img">
        <img :src="item.headImage" alt="">
      </div>
      <div class="msg">
        <p class="header">
          <span></span>
          <span>{{item.signTimeStr}}</span>
        </p>
        <p class="content">
          <span class="name" v-for="list in item.signDataList" :key="list.id" v-if="list.name == '姓名'">{{list.value}}</span>
          <span v-else-if="list.name == '手机'">{{list.value}}</span>
          <span v-else-if="list.value">{{list.value}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  filters: {
    formatName(v) {
      return v.replace(/(.{1})(.*)/g,'$1**');
    },
    formatTime(v) {
      return v.replace(/(.*)(.{7})/g,'$1');
    },
    formatPhome(v) {
      console.log(v);
      return v.replace(/^(\d{3})(\d{4})(\d{4})/g,'$1****$2');
    }
  }
}
</script>

<style lang="less" scoped>
.sign-item {
  display: flex;
  justify-content: space-between;
  padding: 2vw 4vw;
  &:before {
    left: 4vw;
  }
  .info-box {
    display: flex;
    width: 100%;
    font-size: 14px;
    .img {
      width: 10vw;
      height: 10vw;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
      margin-right: 4vw;
    }
    .msg {
      flex: 1;
      .header,.content {
        display: flex;
      }
      .header {
        justify-content: space-between;
        height: 22px;
      }
      .content {
        flex-wrap: wrap;
        span {
          height: 15px;
          margin-top: 6px;
          padding-right: 8px;
          margin-right: 8px;
          line-height: 1;
          border-right: 1px solid #d4d4d4;
        }
        span:last-child {
          border: none;
          padding-left: 0;
        }
        .name {
          position: absolute;
          top: 5px;
          border: none;
          padding: 0;
        }
      }
    }
  }
}
</style>

