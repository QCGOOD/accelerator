<template>
  <div class="categorys white">
    <div v-if="categorys.length == 0">
      <skeleton-block></skeleton-block>
    </div>
    <scroller v-else lock-y :scrollbar-x="false">
      <div class="wrap" :style="{ 'width': `${typeWidth}vw`}">
        <div class="category" v-for="item in categorys" :key="item.id" @click="jumpPage(`/activity/list?id=${item.id}`)">
          <img class="category__img" :src="`${imgHost}${item.iconUrl}`" alt="">
          <div class="category__text" v-if="item.name.length == 4">{{item.name}}</div>
          <div class="category__text" v-else style="padding: 0 4vw">{{item.name}}</div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import { Scroller } from "vux";
import SkeletonBlock from "@/components/skeleton/Block";

export default {
  components: {
    Scroller,
    SkeletonBlock
  },
  data() {
    return {
      categorys: [],
      typeWidth: 0,
    };
  },
  created() {
    this.apiGetList();
  },
  mounted() {
    window.onresize = () => {
      this.typeWidth = this.categorys.length * 24 - 4;
    };
  },
  methods: {
    apiGetList() {
      this.$http.get("/category/treeByType", { type: 2 })
        .then(res => {
          this.apiGetCategory(res.data.data[0].id)
        });
    },
    apiGetCategory(id) {
      this.$http.get("/category/page", {parentId: id})
        .then(res => {
          this.categorys = res.data.data.list;
          this.typeWidth = this.categorys.length * 24 - 4;
        });
    },
  }
};
</script>

<style lang="less" scoped>
.categorys {
  .wrap {
    width: 100%;
    padding: 4vw;
    display: flex;
    .category {
      flex-shrink: 0;
      width: 20vw;
      height: 20vw;
      margin-right: 4vw;
      position: relative;
      border-radius: 2vw;
      overflow: hidden;
      &:last-child {
        margin-right: 0;
      }
      &__img {
        width: 100%;
        height: 100%;
        position: absolute;
      }
      &__text {
        align-items: center;
        width: 20vw;
        height: 20vw;
        padding: 0 5vw;
        position: relative;
        display: inline-flex;
        font-size: 4vw;
        text-align: center;
        box-sizing: border-box;
        color: #fff;
      }
    }
  }
}
</style>
