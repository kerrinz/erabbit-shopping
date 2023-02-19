<template>
  <div v-if="bannerList.length > 0" class="banner" :style="{ width, height }">
    <ul class="images">
      <li class="previous_item">
        <a
          ><img
            @animationend="onAnimatedPrevious"
            :src="previousSrc"
            :style="{ animationName: previousAnimationName, height }"
        /></a>
      </li>
      <li class="current_item">
        <RouterLink :to="bannerList[lastIndex].href"
          ><img
            @animationend="onAnimatedCurrent"
            :src="currentSrc"
            :style="{ animationName: currentAnimationName, height }"
        /></RouterLink>
      </li>
      <li class="next_item">
        <a
          ><img @animationend="onAnimatedNext" :src="nextSrc" :style="{ animationName: nextAnimationName, height }"
        /></a>
      </li>
    </ul>
    <ul class="pagination">
      <li
        v-for="n in bannerList.length ?? 0"
        :key="n - 1"
        :class="{ active: nextIndex == n - 1 }"
        @click="handleClickPagination(n - 1)"
      ></li>
    </ul>
    <div class="operate_previous" @click="handleClickPrevoius">
      <el-icon><ArrowLeft /></el-icon>
    </div>
    <div class="operate_next" @click="handleClickNext">
      <el-icon><ArrowRight /></el-icon>
    </div>
  </div>
  <XSkeleton v-else :width="width" :height="height" />
</template>
<script setup lang="ts">
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import { computed, ref, watchEffect } from "vue";

const props = withDefaults(
  defineProps<{
    banners: {
      image: string;
      /** 路由路径 */
      href: string;
    }[];
    index: number;
    width: string;
    height: string;
  }>(),
  {
    index: 0,
    width: "100%",
    height: "100%",
  }
);

// 标记是否正在执行动画中
let flagAnimating = false;

// 轮播图的src库
const bannerList = computed(() => props.banners);

watchEffect(() => {
  console.log(bannerList.value);
});

// 轮播图当前页的索引（在翻页动画完成之前就已经更新）
const nextIndex = ref(0);
// 当前展示图片的索引（在翻页动画完成之前依旧保持先前的索引）
// const currentImageIndex = ref(0);
// 上一次的索引（在翻页动画完成之后转更新为新的索引）
const lastIndex = ref(0);

// 绑定动画名称
const previousAnimationName = ref("unset");
const currentAnimationName = ref("unset");
const nextAnimationName = ref("unset");

// 给定一个索引，获取它（在循环周期中）的上一个索引
const getPreviousCycleIndex = (index: number): number => {
  return (index - 1 + bannerList.value.length) % bannerList.value.length;
};

// 给定一个索引，获取它（在循环周期中）的下一个索引
const getNextCycleIndex = (index: number): number => {
  return (index + 1) % bannerList.value.length;
};

// 对应的图片链接
const previousSrc = computed(() => bannerList.value[nextIndex.value].image);
const currentSrc = computed(() => bannerList.value[lastIndex.value].image);
const nextSrc = computed(() => bannerList.value[nextIndex.value].image);

// 前一页的动画
const onAnimatedPrevious = () => {
  previousAnimationName.value = "unset";
};

// 当前页的动画
const onAnimatedCurrent = () => {
  currentAnimationName.value = "unset";
  flagAnimating = false;
  lastIndex.value = nextIndex.value;
};

// 后一页的动画
const onAnimatedNext = () => {
  nextAnimationName.value = "unset";
};

// 跳转到下一页（带动画效果）
const next = () => {
  flagAnimating = true;
  currentAnimationName.value = "toLeft";
  nextAnimationName.value = "toLeft";
  nextIndex.value = getNextCycleIndex(nextIndex.value);
  restartInterval();
};
// 跳转到上一页（带动画效果）
const previous = () => {
  flagAnimating = true;
  currentAnimationName.value = "toRight";
  previousAnimationName.value = "toRight";
  nextIndex.value = getPreviousCycleIndex(nextIndex.value);
  restartInterval();
};
// 跳转到第几页（带动画效果）
const animateTo = (index: number) => {
  flagAnimating = true;
  // 是否往后翻页
  const isAnimateNext = index < nextIndex.value;
  currentAnimationName.value = index < nextIndex.value ? "toRight" : "toLeft";
  // 只需要对前后两页中的其中一页执行动画，节省性能资源
  if (isAnimateNext) {
    previousAnimationName.value = "toRight";
  } else {
    nextAnimationName.value = "toLeft";
  }
  nextIndex.value = index;
  restartInterval();
};

// 定时器的循环执行函数
function intervalFunc() {
  if (!flagAnimating) {
    next();
  }
}
// 自动翻到下一页的循环定时器
let interval = setInterval(intervalFunc, 3000);
// 重启循环定时器
const restartInterval = () => {
  clearInterval(interval);
  interval = setInterval(intervalFunc, 3000);
};

// 按钮触发下一页
const handleClickNext = () => {
  if (!flagAnimating) next();
};
// 按钮触发上一页
const handleClickPrevoius = () => {
  if (!flagAnimating) previous();
};

// 点击底部伪页码
const handleClickPagination = (index: number) => {
  if (!flagAnimating) animateTo(index);
};
</script>
<style scoped lang="less">
.banner {
  width: 100%;
  min-height: 20vh;
  position: relative;
  overflow: hidden;
  user-select: none;
  .images {
    position: relative;
    img {
      width: 100%;
      object-fit: cover;
      margin: 0;
      padding: 0;
      vertical-align: top;
      // 动画效果
      animation-duration: 1s;
      animation-timing-function: ease-in-out;
    }
  }
}

.previous_item {
  position: absolute;
  width: 100%;
  left: -100%;
  top: 0;
  bottom: 0;
}
.next_item {
  position: absolute;
  width: 100%;
  left: 100%;
  top: 0;
  bottom: 0;
}

// 底部分页控制按钮
.banner ul.pagination {
  position: absolute;
  bottom: 0;
  left: 50%;
  padding: 0;
  margin-bottom: 8px;
  transform: translateX(-50%);
  display: inline-block;
  text-align: center;
  cursor: default;
  > li {
    cursor: pointer;
    width: 12px;
    height: 12px;
    display: inline-block;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    box-shadow: 0 0 2px #ccc;
    &:not(last-child) {
      margin: 0 4px;
    }
    &.active {
      background-color: #fff;
    }
  }
}

// 左右的操作按钮
.operate() {
  position: absolute;
  display: inline-block;
  width: 100px;
  transition: all.2s;
  font-size: 50px;
  color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: rgba(255, 255, 255, 0.9);
    background-color: rgba(0, 0, 0, 0.33);
  }
}

.operate_next {
  .operate();
  top: 0;
  right: 0;
  bottom: 0;
}
.operate_previous {
  .operate();
  top: 0;
  left: 0;
  bottom: 0;
}
</style>
