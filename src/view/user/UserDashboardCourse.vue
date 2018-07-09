<template>
  <ScrollView  class="scroller" ref="scroll" height="-1px"
    :pageNum="search.pageNum"
    :size="search.pageSize"
    :total="search.total"
    @pullingUp="apiGetList">
    <div>
      <div v-if="list.length > 0">
        <CourseItem class="course-item" v-for="(item, i) in list" :key="i" @click.native="toDetail(item.id)" :item="item"/>
      </div>
      <div v-else class="null">暂无数据</div>
    </div>
  </ScrollView>
</template>

<script>
import CourseItem from "../../components/CourseItem";
import ScrollView from "../../components/ScrollView";

export default {
  components: {
    CourseItem,
    ScrollView
  },
  data() {
    return {
      noData: true,
      list: [],
      search: { 
        pageNum: 1,
        pageSize: 20,
        total: 0
      }
    };
  },
  mounted() {
    this.apiGetList();
  },
  methods: {
    toDetail(id) {
      this.$router.push(`/curriculum/detail?id=${id}`);
    },
    apiGetList() {
      this.$http.get("/course/signCoursePage", this.search)
        .then(res => {
          this.search.total = res.data.data.total;
          this.search.pageNum++;
          this.list = [...this.list, ...res.data.data.list]
          this.$refs.scroll._reset();
        });
    }
  }
};
</script>
<style lang="less" scoped>
.null {
  width: 100vw;
  text-align: center;
  color: #808080;
  font-size: 15px;
  padding-top: 45vh;
}
</style>