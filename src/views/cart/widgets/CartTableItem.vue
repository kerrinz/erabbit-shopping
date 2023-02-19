// 购物车表格中的商品项
<template>
  <tr :class="{ invalid: !item.isEffective }">
    <td>
      <XStaticCheckbox v-if="value.isEffective" :value="item.selected" @onTap="(value) => $emit('tapCheckbox')" />
      <span class="invalid_hint" v-else>已失效</span>
    </td>
    <td class="goods">
      <RouterLink :to="`/product/${item.id}`">
        <div class="cover">
          <img :src="item.picture" />
        </div>
        <span>
          <div class="name">{{ item.name }}</div>
          <div class="attrs">{{ item.attrsText }}</div>
        </span>
      </RouterLink>
    </td>
    <td><small>￥</small>{{ item.nowPrice }}</td>
    <td>
      <el-input-number
        v-if="value.isEffective"
        v-model="item.count"
        :min="1"
        :max="12"
        @change="(prev) => $emit('changeCount', prev)"
      />
      <span v-else>{{ item.count }}</span>
    </td>
    <td class="price"><small>￥</small>{{ (Number(item.nowPrice) * item.count).toFixed(2) }}</td>
    <td>
      <el-button type="primary" text @click="$emit('clickRemove')">删除</el-button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { CartModel } from "@/model/cart-model";
import { toRef } from "vue";

const props = defineProps<{
  value: CartModel;
}>();

defineEmits<{
  (e: "tapCheckbox"): () => void;
  (e: "changeCount"): (prev: number) => void;
  (e: "clickRemove"): () => void;
  "update:value": () => void | undefined;
}>();

const item = toRef(props, "value");
</script>

<style lang="less" scoped>
tr.invalid {
  .invalid_hint {
    font-size: 14px;
    color: @text4Color;
  }
  .goods {
    .cover::after {
      content: "";
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }
  }
}
td {
  text-align: center;
  padding: 12px 0;
  color: @text3Color;
  box-sizing: border-box;
  &:first-child {
    text-align: left;
    padding-left: 14px;
  }
  // 商品简要信息
  &.goods {
    text-align: left;
    width: 40%;
    > a {
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      .cover {
        position: relative;
        img {
          height: 85px;
          width: 85px;
          vertical-align: middle;
          background: #fff;
          &:hover {
            cursor: pointer;
          }
        }
      }
      // 商品名称
      > span {
        padding-left: 12px;
        vertical-align: middle;
        transition: color.2s;
        width: 350px;
        &:hover {
          color: @primaryColor;
          cursor: pointer;
        }
        .name {
          overflow: hidden;
          text-overflow: ellipsis;
        }
        // 商品属性
        .attrs {
          overflow: hidden;
          text-overflow: ellipsis;
          color: @text6Color;
          font-size: 14px;
        }
      }
    }
  }
  &.price {
    color: @priceColor;
  }
}
</style>
