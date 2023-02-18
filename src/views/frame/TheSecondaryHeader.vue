<template>
  <div class="header-secondary">
    <el-container class="container">
      <div class="banner">Erabbit商城</div>
      <!-- 分类 -->
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
                    <img :src="sub.picture!" :alt="sub.name" />
                    <div class="title">{{ sub.name }}</div>
                  </router-link>
                </li>
              </ul>
            </transition>
          </div>
        </li>
      </ul>
      <!-- 购物车按钮 -->
      <RouterLink class="cart" to="/cart">
        <el-icon class="icon" size="20px">
          <ShoppingCart />
          <span class="hint">{{ cartCount }}</span>
        </el-icon>
        <span class="text">购物车</span>
      </RouterLink>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { findNavCategory } from "@/api/category";
import { ref } from "vue";
import type { MainCategory } from "@/model/category-model";
import { useCartCount } from "@/hooks/cart-hook";

// 是否显示子分类
const isShowLayer = ref(false);
// 展示的子分类框属于哪一个一级分类（索引）
const activeIndex = ref(-1);

const useCategories = () => {
  const categories = ref([] as MainCategory[]);
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

// 购物车商品数量
const { count: cartCount } = useCartCount();
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
  box-shadow: 0 0 4px rgba(150, 150, 150, 0.4);
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
.cart {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  border-radius: 12px;
  border: 1px solid rgba(150, 150, 150, 0.4);
  cursor: pointer;
  transition: all.2s;
  &.active,
  &:hover {
    color: @primaryColor;
    border-color: @primaryColor;
  }
  > .icon {
    position: relative;
    > .hint {
      display: inline-block;
      position: absolute;
      top: -10px;
      left: 100%;
      padding: 0 4px;
      font-size: 12px;
      line-height: 14px;
      font-style: normal;
      font-weight: bold;
      font-family: Arial, Helvetica, sans-serif;
      color: white;
      background-color: red;
      border-radius: 20px;
    }
  }
  > .text {
    margin-left: 16px;
    font-size: 15px;
  }
}
</style>
