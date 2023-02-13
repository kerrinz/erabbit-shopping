<template>
  <div class="header-secondary">
    <el-container class="container">
      <div class="banner">百货商城</div>
      <ul class="categories">
        <li>
          <router-link to="/"><el-link class="text">首页</el-link></router-link>
        </li>
        <!-- 其他分类项 -->
        <li
          v-for="(category, index) in categories"
          :key="category.id"
          :class="{ active: isShowLayer && activeIndex == index }"
          @mouseenter="showSubNav(index)"
          @mouseleave="hideSubNav"
        >
          <router-link :to="`/category/${category.id}`" @click="hideSubNav">
            <el-link class="text">
              {{ category.name }}
            </el-link>
          </router-link>
          <!-- 子分类展示框 -->
          <div class="sub-nav">
            <transition name="el-fade-out" mode="out-in">
              <ul v-if="activeIndex == index">
                <li v-for="sub in categories[activeIndex].children" :key="sub.id">
                  <router-link @click="hideSubNav" :to="`/category/sub/${sub.id}`">
                    <img :src="sub.picture" :alt="sub.name" />
                    <div class="title">{{ sub.name }}</div>
                  </router-link>
                </li>
              </ul>
            </transition>
          </div>
        </li>
      </ul>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { findNavCategory } from "@/api/category";
import { ref } from "vue";
import type { NavCategory } from "@/model/category-model";

// 是否显示子分类
const isShowLayer = ref(false);
// 展示的子分类框属于哪一个一级分类（索引）
const activeIndex = ref(-1);

const useCategories = () => {
  const categories = ref([] as NavCategory[]);
  findNavCategory().then((res) => {
    categories.value = res.result;
  });
  return categories;
};
// 一级分类列表
const categories = useCategories();

// 显示子分类框
const showSubNav = (index: number) => {
  isShowLayer.value = true;
  activeIndex.value = index;
};
// 隐藏子分类框
const hideSubNav = () => (isShowLayer.value = false);
</script>

<style lang="less" scoped>
.header-secondary {
  width: 100%;
  height: 100px;
  background-color: @surfaceColor;
  transition: background.3s;
  > .container {
    .page-container();
    display: flex;
    align-items: center;
    position: relative;
    height: inherit;
    > .banner {
      display: inline-block;
      height: 80px;
      width: 150px;
      line-height: 80px;
      text-align: center;
    }
  }
}

.categories {
  flex: 1;
  display: flex;
  justify-content: space-around;
  padding-left: 24px;
  > li {
    text-align: center;
    padding: 16px 0;
    a.text {
      font-size: 1em;
      padding: 12px 8px;
      transition: all 0.1s;
    }
    &.active {
      a.text {
        color: @primaryColor;
        &::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          height: 0;
          bottom: 0;
          border-bottom: 1px solid var(--el-link-hover-text-color);
        }
      }
      .sub-nav {
        height: 150px;
        opacity: 1;
      }
    }
  }
}

// 二级分类框
.sub-nav {
  height: 0px;
  opacity: 0;
  overflow: hidden;
  z-index: 1005;
  position: absolute;
  left: 0;
  margin-top: 16px;
  width: 100%;
  background-color: @surfaceColor;
  box-shadow: 0 0 4px rgba(100, 100, 100, 0.33);
  transition: all 0.2s 0.1s;
  ul {
    display: flex;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 70px;
        height: 70px;
      }
      .title {
        padding-top: 10px;
      }
      &:hover {
        .title {
          color: @primaryColor;
        }
      }
    }
  }
}
</style>
