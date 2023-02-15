<template>
  <main class="container">
    <x-carousel :banners="banners" height="450px"></x-carousel>
    <!-- 新鲜好物 -->
    <HomeNewGoodsPreview />
    <!-- 人气推荐 -->
    <HomeRecommendPreview />
  </main>
</template>

<script setup lang="ts">
import type { CarouselBanner } from "@/components/carousel/x-carousel.vue";
import { ref } from "vue";
import HomeNewGoodsPreview from "./widgets/HomeNewGoodsPreview.vue";
import HomeRecommendPreview from "./widgets/HomeRecommendPreview.vue";
import { findBanner } from "@/api/home";

const useBannerList = () => {
  const bannerList = ref<CarouselBanner[]>([]);
  findBanner().then((res) => {
    bannerList.value = res.result.map((value) => {
      return { image: value.imgUrl, href: value.hrefUrl };
    });
  });
  return bannerList;
};
const banners = useBannerList();
</script>

<style lang="less" scoped>
.container {
  .page-container();
  margin: auto;
}
</style>
