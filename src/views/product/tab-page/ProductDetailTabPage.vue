<template>
  <div class="content">
    <!-- 商品规格信息 -->
    <div class="field_wrap">
      <div v-for="item in props.data.details.properties" :key="item.name" class="field_item">
        <span class="key">{{ item.name }}</span>
        <span class="value">{{ item.value }}</span>
      </div>
    </div>
    <!-- 图片信息流 -->
    <div class="image_wrap">
      <img v-for="(src, index) in props.data.details.pictures" :key="index" :src="src" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GoodsDetailModel } from "@/model/goods-model";

const props = defineProps<{
  data: GoodsDetailModel;
}>();
</script>

<style lang="less" scoped>
.content {
  padding: 1em 2em;
}
// 商品规格信息
.field_wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 12px;
  .field_item {
    display: flex;
    padding: 10px 4px;
    .key {
      color: @text5Color;
      font-size: 14px;
      width: 80px;
      margin-right: 10px;
    }
    .value {
      flex: 1;
      color: @text3Color;
      font-size: 14px;
      position: relative;
    }
  }
}
// 图片信息流
.image_wrap {
  font-size: 0;
  margin: 20px 0;
  img {
    width: 100%;
  }
}
</style>
