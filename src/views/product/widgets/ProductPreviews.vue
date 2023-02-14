<template>
  <div>
    <XExhibitMagnifier class="large_banner" :src="currentBannerUrl"></XExhibitMagnifier>
    <ul class="product_banners">
      <template v-if="props.banners.length > 0">
        <li v-for="(item, i) in props.banners" :key="item" :class="{ active: index == i }">
          <img @mousemove="index = i" :src="item" />
        </li>
      </template>
      <template v-else>
        <li v-for="n in 5" :key="n">
          <XSkeleton height="100%"></XSkeleton>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  // 封面链接列表
  banners: string[];
}>();

// 当前预览的图片索引
const index = ref(0);

const currentBannerUrl = computed(() => {
  if (index.value < props.banners.length) {
    return props.banners[index.value];
  } else return undefined;
});
</script>
<style lang="less" scoped>
@outlineColor: rgba(125, 125, 125, 0.2);
.large_banner {
  border-color: @outlineColor;
}
ul.product_banners {
  width: 408px;
  height: 75px;
  margin: 12px -4px;
  display: flex;
  justify-content: space-between;
  li {
    flex: 1;
    margin: 0 4px;
    position: relative;
    border: 2px solid @outlineColor;
    background-color: @surfaceColor;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
    }
    &.active {
      border-color: @primaryColor;
    }
    &.active::after {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
