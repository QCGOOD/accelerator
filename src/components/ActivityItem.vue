<template>
  <div class="activity white">
    <div class="img">
      <img :src="`${imgCut}${item.iconUrl}${cutParam1}`" alt="">
    </div>
    <div class="content">
      <p class="title">{{item.title}}</p >
      <div class="status">
        <div class="types">
          <span class="type" v-for="(tag,i) in item.activityTagList" :key="i">{{tag.name}}</span>
        </div>
        <Tag :status='item.status'></Tag>
      </div>
      <div class="info">
        <span class="time">
        {{item.startTime | formatDate}}
        </span>
        <span class="price" v-if="item.isEnableFee">￥{{item.activityFee.price | formatPrice}}</span>
        <span class="price" v-else>免费</span>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from "./Tag.vue";
export default {
  components: {
    Tag
  },
  props: {
    item: Object,
    type: String
  }
};
</script>

<style lang="less" scoped>
.activity {
  padding: 0 14px 12px;
  position: relative;
  display: flex;
  .img {
    width: 100px;
    height: 80px;
    position: relative;
    margin-right: 10px;
    flex-shrink: 0;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .content {
    flex: 1;
    .title {
      height: 38px;
      line-height: 18px;
      font-size: 14px;
      overflow: hidden;
    }
    .status {
      display: flex;
      justify-content: space-between;
      .types {
        width: 70%;
        .type {
          margin-right: 8px;
          padding: 0 5px;
          display: inline-block;
          font-size: 12px;
          border-radius: 2px;
          color: #fff;
          background-color: rgb(211, 194, 165);
        }
      }
    }
    .info {
      display: flex;
      justify-content: space-between;
      padding-top: 1vw;
      .time {
        color: @gray-color;
        font-size: 3.4vw;
        span {
          color: @yellow-color;
          margin-left: -1vw;
        }
      }
      .price {
        color: @red-color;
        font-size: 3.6vw;
      }
      .collect {
        color: @gray-color;
        font-size: 3.4vw;
      }
    }
  }
}
</style>
