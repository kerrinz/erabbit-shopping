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
    <div class="info_pannel">
      <!-- 商品封面预览区 -->
      <ProductPreviews :banners="product?.mainPictures ?? []" />
      <ProductInformation :data="product" />
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
import { ref } from "vue";

// 商品id
const id = useRoute().params.id.toString();
const useGoodsDetail = () => {
  const product = ref<GoodsDetailModel | undefined>(undefined);
  findGoods(id).then((res) => {
    console.log(res.result);
    product.value = res.result;
  });
  return product;
};

const product = useGoodsDetail();
</script>
<style lang="less" scoped>
.breadcrumb {
  margin: 2em 1em;
}
.info_pannel {
  background-color: @surfaceColor;
  padding: 2em 3em;
  border-radius: 2px;
  display: flex;
}
</style>
