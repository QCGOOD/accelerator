<template>
  <ScrollView  class="scroller" ref="scroll" height="-55.88px"
    :pageNum="search.pageNum"
    :size="search.pageSize"
    :total="search.total"
    @pullingUp="apiGetList">
    <div>
      <div v-if="list.length > 0">
        <summary-item v-for="(item, i) in list" :item="item" :key="i" @click.native="toDetail(item.id)"></summary-item>
      </div>
    </div>
  </ScrollView>
</template>

<script>
import SummaryItem from "../../components/SummaryItem";
import ScrollView from "../../components/ScrollView";
export default {
  components: {
    SummaryItem,
    ScrollView
  },
  data() {
    return {
      height: 0,
      noData: true,
      search: {
        sourceId: "",
        pageNum: 1,
        pageSize: 20,
      },
      list: []
    };
  },
  created() {
    this.search.sourceId = this.$route.query.sourceId;
  },
  mounted() {
    this.apiGetList();
  },
  methods: {
    apiGetList() {
      this.$http.get("partakeSense/page", this.search)
        .then(res => {
          this.search.total = res.data.data.total;
          this.search.pageNum++;
          this.list = [...this.list, ...res.data.data.list]
          this.$refs.scroll._reset();
        })
    },
    toDetail(id) {
      this.$router.push(`/user/summaryDetail?id=${id}`);
    }
  }
};
</script>
<style lang="less" scoped>
.null {
  text-align: center;
  color: #808080;
  font-size: 15px;
  padding-top: 45vh;
}

.summary {
  width: 100vw;
  height: 100%;
  background: #fff;
}
</style>