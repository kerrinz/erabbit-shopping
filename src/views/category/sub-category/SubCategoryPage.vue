<template>
  <main class="page-container">
    <!-- 面包屑导航 -->
    <el-breadcrumb v-if="subCategory" class="breadcrumb" :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ subCategory.parentName }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ subCategory.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <XSkeleton v-else height="2em" width="200px" style="margin: 1em 0" :animate="false" />
    <transition name="el-fade-in-linear">
      <div class="sale_properties">
        <div class="group" v-for="group in subCategory?.saleProperties" :key="group.id">
          <span class="group_name">{{ group.name }}：</span>
          <ul class="options">
            <li
              class="option"
              :class="{ active: !selectedMap.has(group.name) }"
              @click="selectedMap.delete(group.name)"
            >
              全部
            </li>
            <li
              class="option"
              :class="{ active: selectedMap.get(group.name) == item.name }"
              v-for="item in group.properties"
              :key="item.id"
              @click="selectedMap.set(group.name, item.name)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <!-- 商品网格面板 -->
    <div class="goods_grid_panel">
      <!-- 筛选器 -->
      <div class="goods_filter">
        <span :class="{ active: filterCondition.sortField == undefined }" @click="filterCondition.sortField = undefined"
          >默认排序</span
        >
        <span
          :class="{ active: filterCondition.sortField == 'publishTime' }"
          @click="
            filterCondition.sortField = 'publishTime';
            filterCondition.page = 1;
          "
          >最新商品</span
        >
        <span
          :class="{ active: filterCondition.sortField == 'orderNum' }"
          @click="
            filterCondition.sortField = 'orderNum';
            filterCondition.page = 1;
          "
          >最高人气</span
        >
        <span
          :class="{ active: filterCondition.sortField == 'evaluateNum' }"
          @click="
            filterCondition.sortField = 'evaluateNum';
            filterCondition.page = 1;
          "
          >评论最多</span
        >
        <span
          :class="{ active: filterCondition.sortField == 'price' }"
          class="price_sort"
          @click="
            filterCondition.sortField = 'price';
            filterCondition.page = 1;
          "
          >价格排序</span
        >
        <div class="right">
          <el-checkbox v-model="filterCondition.inventory" label="仅显示有货" />
          <el-checkbox v-model="filterCondition.onlyDiscount" label="仅显示特惠商品" />
        </div>
        <el-divider style="margin-top: 1em" />
      </div>
      <!-- 商品网格 -->
      <GoodsGridView :goods="goods" />
      <XInfiniteLoading
        class="infinite_loading"
        v-if="goods && goods.length > 0"
        v-model:status="infiniteLoadingStatus"
        :callback="infiniteLoadingCallback"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import { reactive, ref, watch, watchPostEffect } from "vue";
import { findSubCategoryFilter, findSubCategoryGoods } from "@/api/category";
import { useRoute } from "vue-router";
import type { FilterParams, SubCategory } from "@/model/category-model";
import GoodsGridView from "./widgets/GoodsGridView.vue";
import type { GoodsModel } from "@/model/goods-model";
import { LoadingStatus } from "@/components/loading/x-infinite-loading.vue";

const route = useRoute();

const useCategory = () => {
  const subCategory = ref<SubCategory | null>(null);
  watchPostEffect(() => {
    findSubCategoryFilter(route.params.id as string).then((res) => {
      subCategory.value = res.result;
    });
  });
  return subCategory;
};
const subCategory = useCategory();

// 筛选条件
const filterCondition = reactive<FilterParams>({ categoryId: route.params.id, inventory: false } as FilterParams);

// 选择的筛选条件（Map型）
// 单独拎出来是为了减少性能消耗，会自动同步到 filterCondition 当中
const selectedMap = reactive<Map<string, string>>(new Map());
watch(selectedMap, () => {
  const arr = [];
  for (const key in selectedMap.keys) {
    arr.push({ groupName: key, propertyName: selectedMap.get(key) });
  }
  filterCondition.attrs = arr;
});

// 单独把页码拎出来使用，以避免触发不该触发的筛选，以该页码为准
const pageIndex = ref(1);

// 筛选后的商品列表
const useFilterGoods = () => {
  const goods = ref<GoodsModel[] | null>(null);
  // 其他筛选条件变了
  watchPostEffect(() => {
    goods.value = null;
    findSubCategoryGoods(filterCondition).then((res) => {
      goods.value = res.result.items;
      pageIndex.value = 1; // 恢复初始页码
      infiniteLoadingStatus.value = LoadingStatus.loading;
    });
  });
  return goods;
};
const goods = useFilterGoods();

const infiniteLoadingStatus = ref(LoadingStatus.loading);

// 只是加载更多罢了
const infiniteLoadingCallback = async () => {
  pageIndex.value = pageIndex.value + 1;
  // 哪有加载更多第一页的？（注：页码从1开始计算）
  if (pageIndex.value == 1 || !goods.value) return;
  findSubCategoryGoods({ ...filterCondition, page: pageIndex.value }).then((res) => {
    if (res.result.items.length == 0) {
      // 没有下一页了
      infiniteLoadingStatus.value = LoadingStatus.notMore;
    } else {
      goods.value?.push(...res.result.items);
      infiniteLoadingStatus.value = LoadingStatus.loading;
    }
  });
};
</script>
<style lang="less" scoped>
@outlineColor: rgba(160, 160, 160, 0.25);
.breadcrumb {
  margin: 2em 1em;
}
// 销售属性的筛选框
.sale_properties {
  padding: 1em 2em;
  background-color: @surfaceColor;
  .group {
    display: flex;
    margin: 1em;
    .group_name {
      display: block;
      width: 120px;
    }
    .options {
      flex: 1;
      .option {
        display: inline-block;
        font-size: 14px;
        padding: 4px 12px;
        margin: 4px 8px;
        max-width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        border-radius: 2px;
        border: 1px solid @outlineColor;
        transition: all.1s;
        &.active,
        &:hover {
          color: @primaryColor;
          border-color: @primaryColor;
        }
      }
    }
  }
}

// 商品网格列表面板
.goods_grid_panel {
  background-color: @surfaceColor;
  margin: 1.75em 0;
}

// 筛选器
.goods_filter {
  padding: 2em 2em 1em;
  > span {
    display: inline-block;
    padding: 4px 12px;
    margin-right: 8px;
    border-radius: 2px;
    color: @text3Color;
    transition: all.1s;
    cursor: pointer;
    &:hover {
      color: @primaryColor;
    }
    &.active {
      color: @primaryColor;
      font-weight: bold;
    }
  }
  .right {
    float: right;
  }
}
// 加载更多
.infinite_loading {
  padding: 2em 0;
  margin: auto;
}
</style>
