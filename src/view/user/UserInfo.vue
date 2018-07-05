<template>
  <div class="user">
    <group class="group">
      <cell title="头像" is-link @click.native="popup = true" style="position:relative;">
        <img style="width:40px; display:block;margin-right:5px;border-radius:50%;" :src="user.headImage">
        <div v-transfer-dom>
          <popup class="popup" v-model="popup">
            <div style="padding: 3vw 0;">
              <div class="popup-item" style="padding: 2vw 0;background: #fff;text-align:center;" @click="weChatImgSyn">同步微信头像</div>
            </div>
          </popup>
        </div>
      </cell>
      <cell title="昵称" :value="user.appellation"></cell>
    </group>
    <group class="group">
      <cell title="姓名" :value="user.name"></cell>
      <cell title="手机" :value="user.mobile" is-link @click.native="jumpPage('/user/revisePhone')"></cell>
      <cell title="公司" :value="user.company"></cell>
      <cell title="职位" :value="user.position"></cell>
    </group>
    <div class="btn" @click="jumpPage('/user/receiveUser')">修改资料</div>
  </div>
</template>

<script>
import { Cell, Group, Popup, TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    Cell,
    Popup
  },
  data() {
    return {
      popup: false,
      user: {
        name: '',
        appellation: '',
        mobile: '',
        company: '',
        position: ''
      },
      byImg: '',
      options: ['1']
    };
  },
  created() {
    this.apiGetUser();
  },
  methods: {
    apiGetUser() {
      this.$http.get("/member/info").then(res => {
        // console.log(res.data.data)
        this.user = res.data.data;
      });
    },
    apiUpDateHeadImg() {
      this.$http.post('/member/refresh_head_image')
      .then(res => {
        this.apiGetUser()
      })
    },
    jumpPage(url) {
      this.$router.push(url)
    },
    weChatImgSyn() {
      this.popup = false
      this.apiUpDateHeadImg()
    }
  }
};
</script>

<style lang="less" scoped>
.user {
  .btn{
    border:1px solid @red-color;
    border-radius:1vw;
    text-align:center;
    line-height:11vw;
    color: @red-color;
    margin:20vw 4vw 5vw;
  }
  .popup{
    padding: 2vw 0;
    .popup-item{
      padding: 2vw 0;
    }
  }
}
</style>
