<template>
  <div class="sign-up">
    <p class="title white">已报名 ({{$route.query.s}})</p>
    <SignItem v-for="(item, i) in list" :key="i" :item="item"/>
  </div>
</template>

<script>
import SignItem from "@/components/SignItem";

export default {
  components: {
    SignItem
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.apiGetSignUps(this.$route.query.id);
  },
  methods: {
    apiGetSignUps(sourceId) {
      this.$http.get("/activitySign/signMembers", { sourceId }).then(res => {
        this.list = res.data.data.list;
        console.log(this.list)
      });
    }
  }
};
</script>

<style lang="less" scoped>
.sign-up {
  .title {
    font-size: 4vw;
    padding: 3vw;
  }
}
</style>
