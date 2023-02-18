<template>
  <div class="page-container">
    <el-breadcrumb class="breadcrumb" :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>购物车</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 商品列表的表格 -->
    <div class="panel table_panel">
      <table>
        <thead>
          <tr>
            <th>
              <!-- <el-checkbox label="全选" name="check_all" size="large" :checked="isCheckAll" /> -->
              <XStaticCheckbox :value="isCheckAll" label="全选" />
            </th>
            <th>商品信息</th>
            <th>单价</th>
            <th>数量</th>
            <th>小计</th>
            <th>操作</th>
          </tr>
        </thead>
        <transition name="el-fade-in-linear">
          <tbody v-if="loadingState == LoadingState.success">
            <tr v-for="item in cartList" :key="item.id">
              <td>
                <XStaticCheckbox
                  :value="item.selected"
                  @onTap="(value) => updateItem({ skuId: item.skuId, selected: !item.selected, count: item.count })"
                />
              </td>
              <td class="goods">
                <RouterLink :to="`/product/${item.id}`">
                  <img :src="item.picture" />
                  <span>
                    <div class="name">{{ item.name }}</div>
                    <div class="attrs">{{ item.attrsText }}</div>
                  </span>
                </RouterLink>
              </td>
              <td><small>￥</small>{{ item.nowPrice }}</td>
              <!-- <td>{{ item.count }}</td> -->
              <td>
                <el-input-number
                  v-model="item.count"
                  :min="1"
                  :max="12"
                  @change="(prev) => handleChangeCount(prev, item.skuId)"
                />
              </td>
              <td class="price"><small>￥</small>{{ (item.nowPrice * item.count).toFixed(2) }}</td>
              <td>
                <el-button type="primary" text>删除</el-button>
              </td>
            </tr>
          </tbody>
        </transition>
      </table>
      <div v-if="loadingState == LoadingState.loading" class="center">
        <img style="margin: auto; margin: 5em 0" src="@/assets/icons/loading-blocks.gif" />
      </div>
      <div v-if="loadingState == LoadingState.success && cartList.length == 0" class="center">
        <el-empty class="empty" description="购物车里空空如也" />
      </div>
    </div>
    <!-- 结算区域 -->
    <div class="panel result_panel">
      <div class="left"></div>
      <div class="right">
        <el-button class="btn_cart_order" type="primary">下单结算</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import { useCartList } from "@/hooks/cart-hook";
import { ref, watch } from "vue";
import { LoadingState } from "@/model/emun";
import { updateCart } from "@/api/cart";
import useAccountStore from "@/stores/account";
import useCartStore from "@/stores/cart";

const {
  loadingState,
  cartList,
  validList,
  invalidList,
  validAmount,
  selectedList,
  totalSelected,
  selectedAmount,
  isCheckAll,
  updateItem,
} = useCartList();

const count = 0;

const handleChangeCount = async (count: number, skuId: string) => {
  await updateItem({
    skuId,
    selected: undefined,
    count,
  });
};
</script>
<style lang="less" scoped>
.breadcrumb {
  margin: 2em 1em;
}
.checkbox {
  --el-checkbox-input-border: 1px solid @text4Color;
}
.panel {
  background-color: @surfaceColor;
  margin: 1em 0;
}
.table_panel {
  border-spacing: 0;
  border-collapse: collapse;
  line-height: 24px;
  padding: 0 2em;
  table {
    width: 100%;
    thead {
      th {
        font-size: 1em;
        font-weight: normal;
        line-height: 60px;
        text-align: center;
        &:first-child {
          text-align: left;
        }
      }
    }
    tbody {
      tr {
        td {
          text-align: center;
          padding: 12px 24px;
          color: @text3Color;
          &:first-child {
            text-align: left;
            padding-left: 0;
          }
          &.goods {
            text-align: left;
            img {
              height: 85px;
              width: 85px;
              vertical-align: middle;
              &:hover {
                cursor: pointer;
              }
            }
            > a > span {
              display: inline-block;
              padding-left: 12px;
              vertical-align: middle;
              transition: color.2s;
              &:hover {
                color: @primaryColor;
                cursor: pointer;
              }
              .attrs {
                color: @text6Color;
              }
            }
          }
          &.price {
            color: @priceColor;
          }
        }
      }
    }
  }
}
.result_panel {
  display: flex;
  padding: 1em 2em;
  .left {
    flex: 1;
  }
  .right {
    .btn_cart_order {
      font-size: 1em;
      padding: 20px 50px;
    }
  }
}
.empty {
  padding: 4em 0;
}
</style>
