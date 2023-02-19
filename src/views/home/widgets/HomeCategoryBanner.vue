<template>
  <div class="box" @mouseleave="onLeaveBox">
    <!-- 轮播图 -->
    <x-carousel v-if="props.banners" :banners="props.banners" height="500px" />
    <!-- 菜单项 -->
    <ul class="categories">
      <template v-if="props.categories">
        <li
          v-for="(item, index) in props.categories"
          :class="{ active: activeIndex == index }"
          :key="item.id"
          @mousemove="onMoveCategory(index)"
        >
          <span class="first">{{ item.name }}</span>
          <span class="sub" v-for="sub in item.children" :key="sub.id">{{ sub.name }}</span>
        </li>
        <!-- <li>
          <span class="first">品牌</span>
          <span class="sub">品牌推荐</span>
        </li> -->
      </template>
      <template v-else>
        <li v-for="n in 9" :key="n" class="">
          <XSkeleton width="100px" height="20px" />
        </li>
      </template>
    </ul>
    <!-- 子面板 -->
    <div v-if="activeIndex >= 0 && props.categories" class="sub_panel">
      <h3 class="title">分类推荐</h3>
      <ul class="goods_list">
        <li v-for="item in props.categories[activeIndex].goods" :key="item.id">
          <!-- <span class="first">{{ item.name }}</span>
          <span class="sub" v-for="sub in item.children" :key="sub.id">{{ sub.name }}</span> -->
          <BGoodsItem
            class="goods_item"
            :image="item.picture"
            :name="item.name"
            :desc="item.desc"
            :price="item.price"
            :route-to="`/product/${item.id}`"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import BGoodsItem from "@/components/business/goods-item/b-goods-item.vue";
import type { MainCategory } from "@/model/category-model";
import { ref } from "vue";

const props = defineProps<{
  categories: MainCategory[] | undefined;
  banners:
    | {
        image: string;
        /** 路由路径 */
        href: string;
      }[]
    | undefined;
}>();

// 当前显示的一级分类索引
const activeIndex = ref(-1);

// 移入分类项
const onMoveCategory = (index: number) => {
  activeIndex.value = index;
};

// 移出整个组件盒子
const onLeaveBox = () => {
  activeIndex.value = -1;
};
</script>

<style lang="less" scoped>
.box {
  position: relative;
  width: 100%;
  height: 500px;
  ul.categories {
    background-color: rgba(0, 0, 0, 0.75);
    width: 250px;
    white-space: nowrap;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    > li {
      position: relative;
      padding: 14px 12px 14px 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      &:hover,
      &.active {
        background-color: @primaryColor;
        color: @onPrimaryColor;
      }
      &::after {
        content: ">";
        position: absolute;
        right: 12px;
        display: inline-block;
        color: #ccc;
      }
      > span {
        display: inline-block;
      }
      .first {
        color: #fff;
        font-size: 16px;
        margin-right: 8px;
      }
      .sub {
        color: #eee;
        font-size: 14px;
      }
    }
  }
}

// 子面板
.sub_panel {
  position: absolute;
  left: 250px;
  top: 0;
  right: 0;
  bottom: 0;
  // background-color: rgba(0, 0, 0, 0.5);
  background-color: @surfaceColor;
  // box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
  border: 1px solid @primaryColor;
  padding: 16px 20px;
  .title {
    font-weight: normal;
    color: @text1Color;
  }
  .goods_list {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    .goods_item {
      // width: 80px;
      display: flex;
      flex-direction: row;
      text-align: left;
      align-items: center;
      /deep/ img {
        margin: 4px 8px;
        width: 100px;
        height: 100px;
      }
      /deep/ .info {
        padding-left: 8px;
        > .name {
          white-space: unset;
          max-height: 38px;
        }
        > div {
          // padding: 0;
        }
      }
    }
  }
}
</style>
