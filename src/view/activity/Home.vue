<template>
  <div>
    <HomeSwiper/>
    <HomeCategory/>
    <HomeList/>
    <Qc/>
  </div>
</template>

<script>
import HomeSwiper from "./HomeSwiper";
import HomeCategory from "./HomeCategory";
import HomeList from "./HomeList";

export default {
  components: {
    HomeSwiper,
    HomeCategory,
    HomeList
  }
};
</script>

<style>
</style>
