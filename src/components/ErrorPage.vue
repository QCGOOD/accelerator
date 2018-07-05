<template>
  <div class="detail-error">
    <img class="icon" src="static/image/icon.png" alt="">
    <p class="tip">{{tip}}</p>
    <div class="button" @click="jumpPage()">查看更多</div>
  </div>
</template>

<script>
export default {
  props: {
    tip: String,
    url: String
  },
  methods: {
    jumpPage() {
      this.$router.push(`${this.url}`);
    }
  }
}
</script>

<style lang="less" scoped>
.detail-error {
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
  .button {
    width: 175px;
    height: 40px;
    padding: 13px 0;
    margin: 0 auto;
    display: block;
    line-height: 1;
    font-size: 15px;
    text-align: center;
    border-radius: 3px;
    box-sizing: border-box;
    background: #e2513c;
    color: #fff;
  }
}
</style>
