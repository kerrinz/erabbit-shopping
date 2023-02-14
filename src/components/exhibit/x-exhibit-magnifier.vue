// 商品封面图片放大预览组件
<template>
  <!-- 标准图 -->
  <div class="exhibit-box">
    <div class="banner" v-if="props.src">
      <img @mousemove="onMouseMove" @mouseleave="onMouseLeave" :src="props.src" />
      <span
        class="cursor"
        :style="{
          width: `${cursorWidth}px`,
          height: `${cursorHeight}px`,
          left: `${cursorLeft}px`,
          top: `${cursorTop}px`,
        }"
      ></span>
    </div>
    <!-- 骨架屏 -->
    <XSkeleton v-else :width="`${imgWidth}px`" :height="`${imgHeight}px`"></XSkeleton>
    <!-- 放大图 -->
    <div v-show="isShowViewer" class="viewer" :style="{ width: `${viewerWidth}px`, height: `${viewerHeight}px` }">
      <img
        :src="props.src"
        :style="{
          left: `${viewerImgLeft}px`,
          top: `${viewerImgTop}px`,
          width: `${viewerImgWidth * 100}%`,
          height: `${viewerImgHeight * 100}%`,
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import XSkeleton from "../layout/x-skeleton.vue";

const props = defineProps<{
  // 图片链接
  src: string | undefined;
}>();

// 是否显示大图
const isShowViewer = ref(false);
// 游标的长宽
const cursorWidth = 200;
const cursorHeight = cursorWidth;
// 小图长宽
const imgWidth = 400;
const imgHeight = imgWidth;
// viewer 大图长宽
const viewerWidth = 400;
const viewerHeight = viewerWidth;

const cursorLeft = ref(0);
const cursorTop = ref(0);

const viewerImgWidth = imgWidth / cursorWidth;
const viewerImgHeight = imgHeight / cursorHeight;
const viewerImgLeft = ref(0);
const viewerImgTop = ref(0);

const onMouseMove = (e: MouseEvent) => {
  isShowViewer.value = true;
  // cursor游标的处理
  let _cursorLeft = e.offsetX - cursorWidth / 2;
  let _cursorTop = e.offsetY - cursorHeight / 2;
  if (_cursorLeft < 0) {
    _cursorLeft = 0;
  } else if (_cursorLeft > imgWidth - cursorWidth) {
    _cursorLeft = imgWidth - cursorWidth;
  }
  if (_cursorTop < 0) {
    _cursorTop = 0;
  } else if (_cursorTop > imgHeight - cursorHeight) {
    _cursorTop = imgHeight - cursorHeight;
  }
  _cursorTop = _cursorTop > 0 ? _cursorTop : 0;
  cursorLeft.value = _cursorLeft;
  cursorTop.value = _cursorTop;

  // viewer预览框的处理
  const scaleW = imgWidth / cursorWidth; // width缩放倍率
  const scaleH = imgHeight / cursorHeight; // height缩放倍率
  viewerImgLeft.value = (-_cursorLeft / imgWidth) * viewerWidth * scaleW;
  viewerImgTop.value = (-_cursorTop / imgHeight) * viewerHeight * scaleH;
};

// 鼠标移到图片之外
const onMouseLeave = () => {
  isShowViewer.value = false;
};
</script>
<style lang="less" scoped>
.exhibit-box {
  font-size: 0;
  vertical-align: middle;
  position: relative;
  display: inline-block;
  border: 1px @primaryColor solid;
}

/* 放大图 */
.viewer {
  width: 600px;
  height: 600px;
  margin-left: 5px;
  position: absolute;
  left: 100%;
  top: 50%;
  pointer-events: none;
  border: 1px @primaryColor solid;
  overflow: hidden;
  z-index: 9999;
  transform: translateY(-50%);
  background-color: @surfaceColor;
  img {
    width: 100%;
    height: 100%;
    position: relative;
  }
}

// 没放大的封面图
.banner {
  padding: 0;
  font-size: 0;
  width: 400px;
  display: inline-block;
  cursor: pointer;
  position: relative;
  background-color: @surfaceColor;
  img {
    width: 100%;
    vertical-align: middle;
  }
  // 游标
  .cursor {
    position: absolute;
    display: inline-block;
    visibility: hidden;
    opacity: 0;
    width: 100px;
    height: 100px;
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0.2);
    border: 1px rgba(255, 255, 255, 0.5) solid;
    transition: visibility.15S, opacity.15s;
  }
  &:hover .cursor {
    visibility: visible;
    opacity: 1;
  }
}
</style>
