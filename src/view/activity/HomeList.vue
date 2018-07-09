<template>
  <div class="lately-act white">
    <p class="title">
      <span>近期活动</span>
      <span @click="jumpPage('/activity/list')">全部
        <i class="iconfont icon-jiantou"></i>
      </span>
    </p>
    <ActivityItem v-for="(item, i) in list" :key="i" :item="item" @click.native="jumpPage(`/activity/detail?id=${item.id}`)"/>
    <!-- <div v-if="list.length == 0">
      <list-skeleton v-for="i in 3" :key="i"></list-skeleton>
    </div>
    <div v-else>
    </div> -->
  </div>
</template>

<script>
import ActivityItem from "../../components/ActivityItem";
import ListSkeleton from "@/components/skeleton/List";

export default {
  components: {
    ActivityItem,
    ListSkeleton
  },
  data() {
    return {
      list: [],
    }
  },
  created() {
    this.apiGetList();
  },
  methods: {
    apiGetList() {
      this.$http.get("/activity/page", { pageNum: 1, pageSize: 10 })
        .then(res => {
          this.list = res.data.data.list;
        });
    },
    jumpPage(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style lang="less" scoped>
.lately-act {
  margin-top: 5vw;
  .title {
    padding: 10px 0 10px 5vw;
    font-size: 4.2vw;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1;
    span:last-child {
      font-size: 4vw;
      color: #a56801;
      padding: 1vw 3vw;
      border-top-left-radius: 5vw;
      border-bottom-left-radius: 5vw;
      line-height: 1;
      i {
        font-size: 3.8vw;
      }
    }
    &:before {
      position: absolute;
      content: "";
      top: 3vw;
      bottom: 3vw;
      left: 0;
      border-left: 5px solid @primary-color;
    }
  }
}
</style>
