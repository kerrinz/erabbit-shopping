<template>
  <div ref="dom" class="panel">
    <div class="head">
      <span class="title">人气推荐</span>
      <span class="desc">人气爆款 不容错过</span>
    </div>
    <transition name="el-fade-in-linear">
      <ul v-if="result" class="goods">
        <li v-for="item in result" :key="item.id" :style="{ width: `${100 / result.length}%` }">
          <a href="javascript:;">
            <img :src="item.picture" />
            <p class="title">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </a>
        </li>
      </ul>
    </transition>
    <ul v-if="!result" class="goods">
      <li v-for="n in 4" :key="n">
        <x-skeleton width="100%" height="280px"></x-skeleton>
        <x-skeleton width="100%" height="6em" :animate="false"></x-skeleton>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { findHotRecommend } from "@/api/home";
import { useLazyload } from "@/hooks/lazyload-hook";
import type { RecommendItem } from "@/model/home-model";

const { result, dom } = useLazyload<RecommendItem[]>(async () => {
  const res = await findHotRecommend();
  return res.result;
});
</script>
<style lang="less" scoped>
.panel {
  margin-bottom: 1em;
  > .head {
    margin: 2em 0;
    > .title {
      font-size: 2em;
      color: @text1Color;
    }
    > .desc {
      margin-left: 1.5em;
      color: @text3Color;
    }
  }
  > ul.goods {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      display: inline-block;
      box-sizing: border-box;
      padding: 0 4px;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
      }
      a {
        display: block;
        // background-color: rgba(125, 125, 125, 0.1);
        background-color: @primaryContainerColor;
        border-radius: 2px;
        img {
          width: 100%;
          height: 280px;
          object-fit: cover;
        }
        .title {
          padding-left: 8%;
          padding-right: 8%;
          margin: 14px 0;
          font-size: 1.25em;
          color: @text2Color;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .desc {
          font-size: 1em;
          color: @text4Color;
          padding-bottom: 16px;
        }
      }
    }
  }
}
</style>
