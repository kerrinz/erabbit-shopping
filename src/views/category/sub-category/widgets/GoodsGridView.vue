<template>
  <transition name="el-fade-in">
    <div v-if="goods == null" class="hint">
      <img src="@/assets/icons/loading-blocks.gif" />
    </div>
  </transition>
  <transition name="el-fade-in">
    <div v-if="goods && goods.length == 0" class="hint">
      <el-empty class="empty" description="没有符合条件的商品呢" />
    </div>
  </transition>
  <transition name="el-fade-in">
    <div v-if="goods && goods.length > 0" class="goods-grid-container">
      <BGoodsItem
        class="goods-grid-item"
        v-for="item in props.goods"
        :key="item.id"
        :name="item.name"
        :desc="item.desc"
        :image="item.picture"
        :price="item.price"
        :route-to="`/product/${item.id}`"
      />
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { GoodsModel } from "@/model/goods-model";

const props = defineProps<{
  goods: GoodsModel[] | null;
}>();
</script>
<style lang="less" scoped>
.goods-grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
  box-sizing: border-box;
  padding: 0 2em;
  > .goods-grid-item {
    transition: all.2s;
    border-radius: 4px;
    &:hover {
      transform: translateY(-8px);
      // border: 1px solid @primaryColor;
      box-shadow: 0 0 4px @primaryColor;
    }
  }
}
.hint {
  margin: auto;
  text-align: center;
  height: 400px;
  img {
    width: 200px;
  }
  > img,
  > .empty {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
