<template>
  <main class="page-container">
    <!-- 面包屑导航 -->
    <el-breadcrumb v-if="category" class="breadcrumb" :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ category.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <XSkeleton v-else height="2em" width="200px" style="margin: 1em 0" :animate="false" />
    <transition name="el-fade-in-linear">
      <div v-if="category">
        <!-- 全部分类 -->
        <div class="category_panel">
          <h1 class="title">《{{ category.name }}》主题</h1>
          <div class="desc">全部分类</div>
          <!-- 子分类列表 -->
          <ul class="sub_list">
            <li v-for="sub in category.children" :key="sub.id">
              <RouterLink :to="`sub/${sub.id}`">
                <img :src="sub.picture!" />
                <div>{{ sub.name }}</div>
              </RouterLink>
            </li>
          </ul>
        </div>
        <!-- 子分类与推荐商品 -->
        <div v-for="sub in category.children" :key="sub.id" class="category_panel">
          <h1 class="title effect">{{ sub.name }}</h1>
          <!-- <div class="desc">{{ desc }}</div> -->
          <ul class="goods_list">
            <li v-for="goods in sub.goods" :key="goods.id">
              <BGoodsItem
                :image="goods.picture"
                :name="goods.name"
                :desc="goods.desc"
                :price="goods.price"
                :route-to="`/product/${goods.id}`"
              />
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <!-- 分类的骨架图 -->
    <template v-if="!category">
      <div v-for="n in 3" :key="n" class="category_panel">
        <h1 class="title"><XSkeleton height="30px" width="120px" /></h1>
        <!-- <div class="desc">{{ desc }}</div> -->
        <ul class="goods_list">
          <li v-for="m in 5" :key="m"><XSkeleton height="200px" /></li>
        </ul>
      </div>
    </template>
  </main>
</template>

<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import { ref, watchPostEffect } from "vue";
import { findCategory } from "@/api/category";
import { useRoute } from "vue-router";
import type { MainCategory } from "@/model/category-model";
import BGoodsItem from "@/components/business/goods-item/b-goods-item.vue";

const route = useRoute();

const useCategory = () => {
  const category = ref<MainCategory | null>(null);
  watchPostEffect(() => {
    findCategory(route.params.id as string).then((res) => {
      category.value = res.result;
    });
  });
  return category;
};
const category = useCategory();
</script>
<style lang="less" scoped>
.breadcrumb {
  margin: 2em 1em;
}
.category_panel {
  background-color: @surfaceColor;
  text-align: center;
  padding: 1em 3em;
  margin: 1.2em 0;
  > .title {
    font-weight: normal;
    font-size: 24px;
    position: relative;
    display: inline-block;
    color: @text2Color;
    &.effect::before {
      content: "/";
      position: absolute;
      left: -8px;
      top: 50%;
      font-size: 0.7em;
      color: @text5Color;
      transform: translate(-100%, -50%);
    }
    &.effect::after {
      content: "/";
      position: absolute;
      right: -8px;
      top: 50%;
      font-size: 0.7em;
      color: @text5Color;
      transform: translate(100%, -50%);
    }
  }
  > .desc {
    font-size: 20px;
    color: @text4Color;
  }
}
// 全部分类（子分类）列表
ul.sub_list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  margin: 1em 0;
  > li {
    cursor: pointer;
    transition: color.1s;
    &:hover {
      color: @primaryColor;
    }
    img {
      width: 100px;
      height: 100px;
    }
  }
}
// 子分类的商品列表
ul.goods_list {
  margin-top: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
  > li {
    transition: all.2s;
    border-radius: 4px;
    &:hover {
      transform: translateY(-8px);
      // border: 1px solid @primaryColor;
      box-shadow: 0 0 4px @primaryColor;
    }
  }
}
</style>
