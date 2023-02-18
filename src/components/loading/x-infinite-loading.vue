// 无限加载组件，只要该组件进入视图就会触发回调函数；内部已经处理了重复触发，并且callback加载失败时会自动更改状态

<template>
  <div class="x-infinite-loading" ref="target">
    <div class="loading" v-if="props.status == LoadingStatus.loading">
      <img src="@/assets/icons/loading-blocks.gif" />
      <div class="hint">加载中...</div>
    </div>
    <div class="not-more" v-if="props.status == LoadingStatus.notMore">
      <span class="img"></span>
      <span class="hint"> <el-empty :image-size="100" description="没有更多了" /> </span>
    </div>
    <div class="error" v-if="props.status == LoadingStatus.failed">
      <span class="img"></span>
      <span class="hint"> <el-empty :image-size="100" description="加载失败" /> </span>
    </div>
  </div>
</template>

<script lang="ts">
/** 加载状态 */
export enum LoadingStatus {
  /** 加载中 */
  loading,
  /** 没有更多了 */
  notMore,
  /** 加载失败 */
  failed,
}
</script>

<script lang="ts" setup>
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

const props = withDefaults(
  defineProps<{
    /** 双向绑定的加载状态 */
    status: LoadingStatus;
    callback: () => Promise<unknown>;
  }>(),
  {
    status: LoadingStatus.loading,
  }
);

const emit = defineEmits(["update:status"]);

// 是否正在请求（callback未结束）中
const isRequesting = ref(false);

const target = ref(null);

// 进入视口时触发
useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      // 只要不是没有更多或者不是正在请求中，那就可以触发回调函数
      if (props.status != LoadingStatus.notMore && !isRequesting.value) {
        emit("update:status", LoadingStatus.loading);
        props.callback().catch((_) => emit("update:status", LoadingStatus.failed));
      }
    }
  },
  {
    threshold: 0.0,
  }
);
</script>
<style scoped lang="less">
.x-infinite-loading {
  .loading {
    text-align: center;
    img {
      width: 100px;
    }
  }
}
</style>
