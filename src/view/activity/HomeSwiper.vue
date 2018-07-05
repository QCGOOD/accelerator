<template>
  <swiper :imgs="list"></swiper>
</template>

<script>
import Swiper from "@/components/Swiper";

export default {
  components: {
    Swiper
  },
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.apiGetList()
  },
  methods: {
    apiGetList() {
      this.$http.get('/attachment/page')
        .then(res => {
          this.list = res.data.data.list;
        })
    },
  }
};
</script>

<style>
</style>
