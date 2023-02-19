<template>
  <main class="page-container">
    <HomeCategoryBanner :categories="categories" :banners="bannerList" />
    <!-- <x-carousel :banners="bannerList" height="450px" /> -->
    <!-- 新鲜好物 -->
    <HomeNewGoodsPreview />
    <!-- 人气推荐 -->
    <HomeRecommendPreview />
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HomeNewGoodsPreview from "./widgets/HomeNewGoodsPreview.vue";
import HomeRecommendPreview from "./widgets/HomeRecommendPreview.vue";
import { findBanner } from "@/api/home";
import HomeCategoryBanner from "./widgets/HomeCategoryBanner.vue";
import { findNavCategory } from "@/api/category";
import type { MainCategory } from "@/model/category-model";

const useCategories = () => {
  const categories = ref<MainCategory[]>();
  findNavCategory().then((res) => (categories.value = res.result));
  return { categories };
};

const useBannerList = () => {
  const bannerList = ref<{ image: string; href: string }[]>([]);
  findBanner().then((res) => {
    bannerList.value = res.result.map((value) => {
      return { image: value.imgUrl, href: value.hrefUrl };
    });
  });
  return { bannerList };
};

const { bannerList } = useBannerList();
const { categories } = useCategories();
</script>

<style lang="less" scoped>
main {
}
</style>
