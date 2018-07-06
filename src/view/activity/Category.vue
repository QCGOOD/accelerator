<template>
  <div>
    <tab bar-active-color="#668599" :line-width="0">
      <tab-item selected @on-item-click="onItemClick()">全部</tab-item>
      <tab-item v-for="c in categorys" :selected="search.selectedId == c.id" :key="c.id" @on-item-click="onItemClick(c.id)">{{c.name}}</tab-item>
    </tab>
    <ScrollView class="scroller" ref="scroll" height="-44px"
      :pageNum="search.pageNum"
      :size="search.pageSize"
      :total="search.total"
      @pullingUp="apiGetActiveList">
      <div>
        <div v-if="list.length > 0">
          <activity-item v-for="(item, i) in list" :key="i" :item="item" @click.native="jumpPage(`/activity/detail?id=${item.id}`)"></activity-item>
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
      categorys: [],
      search: {
        selectedId: '',
        pageNum: 1,
        pageSize: 20,
        total: 0,
      }
    };
  },
  created() {
    this.selectedId = this.$route.query.id;
    this.apiGetCategorys();
  },
  mounted() {
    this.apiGetActiveList(this.selectedId);
  },
  methods: {
    apiGetCategorys() {
      this.$http.get("/category/treeByType", { type: 2 })
        .then(res => {
          this.apiGetCategory(res.data.data[0].id)
        });
    },
    apiGetCategory(id) {
      this.$http.get("/category/page", { parentId: id })
        .then(res => {
          this.categorys = res.data.data.list;
        });
    },
    apiGetActiveList() {
      this.$http.get("/activity/page", this.search)
        .then(res => {
          this.search.pageNum++;
          this.search.total = res.data.data.total;
          this.list = [...this.list, ...res.data.data.list]
          this.list = res.data.data.list;
        })
    },
    onItemClick(v) {
      this.search.selectedId = v;
      this.search.pageNum = 1;
      this.list = [];
      this.$refs.scroll._reset({top: 0});
      this.apiGetActiveList()
    },
    jumpPage(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style>
</style>
