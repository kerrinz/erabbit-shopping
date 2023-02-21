<template>
  <div class="page-container">
    <el-breadcrumb v-if="product" class="breadcrumb" :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="`/category/${product.categories[1].id}`">{{
        product.categories[1].name
      }}</el-breadcrumb-item>
      <el-breadcrumb-item :to="`/category/sub/${product.categories[0].id}`">{{
        product.categories[0].name
      }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ product.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <XSkeleton v-else height="2em" width="500px" style="margin: 1em" :animate="false" />
    <div class="info_pannel panel">
      <!-- 商品封面预览区 -->
      <ProductPreviews :banners="product?.mainPictures ?? []" />
      <ProductInformation :data="product" />
    </div>
    <div class="intro_wrap">
      <!-- 详细介绍和评论区 -->
      <div class="detail_panel panel">
        <ul class="tabs">
          <li class="tab" :class="{ active: tabIndex == 0 }" @click="tabIndex = 0"><span>商品详情</span></li>
          <li class="tab" :class="{ active: tabIndex == 1 }" @click="tabIndex = 1"><span>商品评价</span></li>
        </ul>
        <div class="tab_page" v-if="product">
          <!-- 商品详细介绍页 -->
          <ProductDetailTabPage v-if="tabIndex == 0" :data="product" />
          <!-- 商品评论页 -->
          <ProductCommentTabPage v-if="tabIndex == 1" :data="product" />
        </div>
      </div>
      <div class="hot_panel">
        <h2 class="title">24小时热销榜</h2>
        <div v-if="product" class="goods_list">
          <BGoodsItem
            class="goods"
            v-for="goods in product.hotByDay"
            :key="goods.id"
            :name="goods.name"
            :desc="goods.desc"
            :price="goods.price"
            :image="goods.picture"
            :route-to="`/product/${goods.id}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import { findGoods } from "@/api/product";
import { useRoute } from "vue-router";
import ProductPreviews from "./widgets/ProductPreviews.vue";
import ProductInformation from "./widgets/ProductInformation.vue";
import type { GoodsDetailModel } from "@/model/goods-model";
import { ref, watchPostEffect } from "vue";
import ProductDetailTabPage from "./tab-page/ProductDetailTabPage.vue";
import type ProductCommentTabPage from "./tab-page/ProductCommentTabPage.vue";
const route = useRoute();

const useGoodsDetail = () => {
  const product = ref<GoodsDetailModel | undefined>(undefined);
  watchPostEffect(() => {
    tabIndex.value = 0;
    findGoods(route.params.id as string).then((res) => {
      console.log(res.result);
      product.value = res.result;
    });
  });
  return product;
};

const product = useGoodsDetail();

const tabIndex = ref(0);
</script>
<style lang="less" scoped>
.breadcrumb {
  margin: 2em 1em;
}
.panel {
  background-color: @surfaceColor;
  border-radius: 2px;
  margin-bottom: 24px;
}
.info_pannel {
  padding: 2em 3em;
  display: flex;
}
.intro_wrap {
  display: flex;
  .detail_panel {
    flex: 1;
    // 分页标签栏
    .tabs {
      .tab {
        display: inline-block;
        cursor: pointer;
        transition: all.2s;
        box-sizing: border-box;
        &:not(:last-child)::after {
          content: "|";
          display: inline-block;
          position: relative;
          height: 20px;
          width: 1px;
          color: rgba(150, 150, 150, 0.2);
        }
        > span {
          display: inline-block;
          padding: 1em 0;
          margin: 0 2em;
          border-bottom: 1px solid transparent;
        }
        &:hover {
          color: @primaryColor;
        }
        &.active {
          color: @primaryColor;
          > span {
            border-bottom: 1px solid @primaryColor;
          }
        }
      }
    }
  }
  // 热销榜
  .hot_panel {
    width: 250px;
    display: inline-block;
    margin-left: 24px;
    box-sizing: border-box;
    .title {
      margin: 0;
      padding: 16px;
      font-size: 1.25em;
      font-weight: bold;
      background-color: #ff654d;
      color: #fff;
    }
    .goods_list {
      .goods {
        background-color: @surfaceColor;
        margin-bottom: 16px;
        &:hover {
          :deep(.name) {
            color: @primaryColor;
          }
        }
      }
    }
  }
}
</style>
