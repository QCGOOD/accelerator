<template>
  <div>
    <tab bar-active-color="#668599" :line-width="0">
      <!-- <tab-item selected @on-item-click="onItemClick(0)">全部</tab-item> -->
      <!-- <tab-item @on-item-click="onItemClick(1)">待审核</tab-item> -->
      <!-- <tab-item @on-item-click="onItemClick(2)">待支付</tab-item> -->
      <!-- <tab-item @on-item-click="onItemClick(3)">待开始</tab-item> -->
      <tab-item selected @on-item-click="onItemClick(1)">进行中</tab-item>
      <tab-item @on-item-click="onItemClick(2)">已结束</tab-item>
    </tab>
    <ScrollView class="scroller" ref="scroll" height="-44px"
      :pageNum="search.pageNum"
      :size="search.pageSize"
      :total="search.total"
      @pullingUp="apiGetList">
      <div>
        <div v-if="list.length > 0">
          <ActivityItem v-for="(item, i) in list" :key="i" :item="item" @click.native="jumpPage(`/activity/detail?id=${item.id}`)" />
        </div>
      </div>
    </ScrollView>
  </div>
</template>

<script>
import { Tab, TabItem } from "vux";
import ActivityItem from "@/components/ActivityItem";
import ScrollView from "../../components/ScrollView";

export default {
  components: {
    Tab,
    TabItem,
    ActivityItem,
    ScrollView,
  },
  data() {
    return {
      list: [],
      search: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
        status: 1
      }
    };
  },
  mounted() {
    this.apiGetList();
  },
  methods: {
    apiGetList() {
      this.$http.get("/activity/signActivityPage", this.search).then(res => {
        this.search.total = res.data.data.total;
        this.search.pageNum++;
        this.list = [...this.list, ...res.data.data.list]
        this.$refs.scroll._reset();
      });
    },
    onItemClick(type) {
      this.search.status = type;
      this.search.pageNum = 1;
      this.list = [];
      this.$refs.scroll._reset({top: 0});
      this.apiGetList();
    },
    jumpPage(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style>
</style>
