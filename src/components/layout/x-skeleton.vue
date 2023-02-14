<template>
  <div
    class="skeleton"
    :class="{ active: animate }"
    :style="{ width, height, display: block ? 'block' : 'inline-block' }"
  >
    <div class="item" :style="{ backgroundColor: color }"></div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
  // 背景色
  color: {
    type: String,
    default: "rgba(125,125,125, 0.2)",
  },
  // 是否显示动画
  animate: {
    type: Boolean,
    default: true,
  },
  // 是否块级元素
  block: {
    type: Boolean,
    default: false,
  },
});
</script>
<style scoped lang="less">
.skeleton {
  position: relative;
  display: inline-block;
  overflow: hidden;
  .item {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
  &.active {
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 75%;
      height: 100%;
      background: linear-gradient(to right, transparent 0, rgba(255, 255, 255, 0.33) 50%, transparent 100%);
      transform: skewX(-45deg);
      animation: skeleton 1.5s ease infinite;
    }
  }
}
// 股骨架屏动画
@keyframes skeleton {
  0% {
    left: -125%;
  }
  100% {
    left: 125%;
  }
}
</style>
