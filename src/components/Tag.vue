<template>
  <span class="tag" :class="style">{{ formatStatus }}</span>
</template>

<script>
export default {
  props: {
    status: Number
  },
  data() {
    return {
      style: ""
    };
  },
  computed: {
    formatStatus(v) {
      switch (this.status) {
        case 1:
          return "未开始";
        case 2:
          return "报名中";
        case 3:
          return "报名截止";
        case 4:
          return "进行中";
        case 5:
          this.style = "disabled"
          return "已结束";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.tag {
  margin-top: 2px;
  padding: 2px 5px 1px;
  font-size: 12px;
  border-radius: 3px;
  color: #d3c2a5;
  border: 1px solid #d3c2a5;
  &.disabled {
    color: #b2b2b2;
    border: 1px solid #b2b2b2;
  }
}
</style>
