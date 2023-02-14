<template>
  <div ref="dom" class="panel">
    <div class="head">
      <span class="title">新鲜好物</span>
      <span class="desc">新鲜出炉 品质靠谱</span>
    </div>
    <transition name="el-fade-in-linear">
      <ul v-if="result" class="goods">
        <li v-for="item in result" :key="item.id" :style="{ width: `${100 / result.length}%` }">
          <RouterLink :to="`/product/${item.id}`">
            <img :src="item.picture" />
            <p class="name">{{ item.name }}</p>
            <p class="price">￥{{ item.price }}</p>
          </RouterLink>
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
import { findNew } from "@/api/home";
import { useLazyload } from "@/hooks/lazyload-hook";
import type { CommonGoods } from "@/model/common-model";

const { result, dom } = useLazyload<CommonGoods[]>(async () => {
  const res = await findNew();
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
        .name {
          padding-left: 8%;
          padding-right: 8%;
          margin: 14px 0;
          font-size: 1.25em;
          color: @text2Color;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .price {
          font-size: 1.4em;
          color: @priceColor;
          margin: 0;
          padding-bottom: 16px;
        }
      }
    }
  }
}
</style>
