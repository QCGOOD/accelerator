<template>
  <div class="sign">
    <p class="title white">已报名 ({{$route.query.s}}/{{$route.query.c}})</p>
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
    this.apiGetList(this.$route.query.id);
  },
  methods: {
    apiGetList(sourceId) {
      this.$http.get("/activitySign/signMembers", { sourceId }).then(res => {
        this.list = res.data.data.list;
        console.log(this.list)
      });
    }
  }
};
</script>

<style lang="less" scoped>
.sign {
  .title {
    font-size: 4vw;
    padding: 3vw;
  }
}
</style>
