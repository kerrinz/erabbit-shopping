<template>
  <main>
    <x-carousel :banners="banners"></x-carousel>
  </main>
</template>

<script setup lang="ts">
import { findBanner } from "@/api/home";
import type { CarouselBanner } from "@/components/pageview/x-carousel.vue";
import { ref } from "vue";

const useBannerList = () => {
  const bannerList = ref<CarouselBanner[]>([]);
  findBanner().then((res) => {
    console.log(res.result);
    bannerList.value = res.result.map((value) => {
      return { image: value.imgUrl, href: value.hrefUrl };
    });
  });
  return bannerList;
};
const banners = useBannerList();
</script>
