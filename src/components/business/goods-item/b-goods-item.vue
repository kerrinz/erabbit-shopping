// 商品项（用于商品网格列表中显示）
<template>
  <RouterLink class="b-goods-item" :to="props.routeTo">
    <img class="cover" :src="props.image" />
    <div class="info">
      <div class="name">
        <span>{{ props.name }}</span>
      </div>
      <div class="desc">
        <span>{{ props.desc }}</span>
      </div>
      <div class="price"><small>￥</small>{{ props.price }}</div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  image: string;
  name: string;
  desc: string;
  price: string;
  routeTo: string;
}>();
</script>
<style lang="less" scoped>
.no-overflow() {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.b-goods-item {
  text-align: center;
  display: inline-block;
  img {
    width: 100%;
    // max-height: 80%;
    object-fit: cover;
  }
  .name {
    font-size: 16px;
    display: inline-block;
    position: relative;
    max-width: 180px;
    padding: 8px 0;
    margin: auto;
    color: @text2Color;
    .no-overflow();
  }
  .desc {
    font-size: 14px;
    max-width: 170px;
    margin: auto;
    color: @text5Color;
    .no-overflow();
  }
  .price {
    color: @priceColor;
    font-size: 1.25em;
    margin: 8px 0;
  }
}
</style>
