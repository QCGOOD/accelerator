<template>
  <scroller lock-x ref="scroll" class="scroller" height="-55.88" style="background:#f2f2f2;">
    <div>
      <div v-if="courseList.length > 0">
        <CourseItem class="course-item" v-for="(item, i) in courseList" :key="i" @click.native="toDetail(item.id)" :item="item"/>
        <Qc/>
      </div>
      <div v-else class="null">暂无数据</div>
    </div>
  </scroller>
</template>

<script>
import CourseItem from "../../components/CourseItem";
import { Scroller } from "vux";

export default {
  components: {
    CourseItem,
    Scroller
  },
  data() {
    return {
      noData: true,
      courseList: [],
      searchData: {
        pageNum: 1
      }
    };
  },
  created() {
    this.getLessonList();
  },
  methods: {
    toDetail(id) {
      this.$router.push(`/curriculum/detail?id=${id}`);
    },
    getLessonList() {
      this.$vux.loading.show();
      this.$http.get("/course/page")
        .then(res => {
          res.data.data.list.map(data => {
            this.courseList.push(data);
          });
        })
        .finally(() => {
          this.$vux.loading.hide();
        });
      this.$nextTick(() => {
        this.$refs.scroll.reset();
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