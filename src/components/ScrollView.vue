<template>
  <scroller ref="scrollerBottom" lock-x :height="height" :scroll-bottom-offst="200" @on-scroll-bottom="onScrollBottom">
    <div class="box2">
      <slot></slot>
      <load-more v-if="isNext" tip="数据加载中"></load-more>
      <div v-else>
        <p class="tip">没有数据了~</p>
      </div>
      <Qc/>
    </div>
  </scroller>
</template>

<script>
import { Scroller, LoadMore } from "vux";

export default {
  components: {
    Scroller,
    LoadMore
  },
  props: {
    height: [String, Number],
    pageNum: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 20
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      throttle: false
    };
  },
  computed: {
    // 当前页是否 <= 计算后的总页数
    isNext() {
      return this.pageNum <= Math.ceil(this.total / this.size);
    }
  },
  methods: {
    onScrollBottom() {
      // 节流阀不能为真，没有下一页不请求
      if (this.throttle && this.isNext) {
        this.throttle = false;
        this.$emit("pullingUp");
      }
    },
    _reset(confg) {
      this.throttle = true;
      this.$refs.scrollerBottom.reset(confg);
    },
  }
};
</script>

<style scoped>
.tip {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #adadad;
}
</style>
