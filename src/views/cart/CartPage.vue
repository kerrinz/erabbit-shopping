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
              <XStaticCheckbox :value="isCheckAll" :label="`全选（${totalValid}）`" @onTap="doCheckAll(isCheckAll)" />
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
            <!-- 商品项 -->
            <CartTableItem
              v-for="item in validList"
              :key="item.id"
              :value="item"
              @tapCheckbox="doUpdateItem({ skuId: item.skuId, selected: !item.selected, count: item.count })"
              @changeCount="(prev) => handleChangeCount(prev ?? 1, item.skuId)"
              @clickRemove="(prev) => handleRemove(item.skuId)"
            />
            <tr v-if="invalidList.length > 0">
              <td colspan="6" class="invalid_head"><h3>失效商品</h3></td>
            </tr>
            <!-- 商品项 -->
            <CartTableItem
              v-for="item in invalidList"
              :key="item.id"
              :value="item"
              @tapCheckbox="doUpdateItem({ skuId: item.skuId, selected: !item.selected, count: item.count })"
              @changeCount="(prev) => handleChangeCount(prev ?? 1, item.skuId)"
              @clickRemove="(prev) => handleRemove(item.skuId)"
            />
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
      <div class="left">
        <XStaticCheckbox :value="isCheckAll" :label="`全选（${totalValid}）`" @onTap="doCheckAll(isCheckAll)" />
        <span class="statistics">已选择 {{ totalSelected }} 件</span>
      </div>
      <div class="right">
        <span class="price">
          总价：<small>￥</small><em>{{ selectedAmount }}</em>
        </span>
        <el-button class="btn_cart_order" type="primary">下单结算</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import { useCartList } from "@/hooks/cart-hook";
import { LoadingState } from "@/model/emun";
import CartTableItem from "./widgets/CartTableItem.vue";
import { ElMessage, ElMessageBox } from "element-plus";

const {
  loadingState,
  cartList,
  validList,
  invalidList,
  totalSelected,
  totalValid,
  selectedAmount,
  isCheckAll,
  doUpdateItem,
  doCheckAll,
  doRemove,
} = useCartList();

// 改变商品数量
const handleChangeCount = async (count: number, skuId: string) => {
  await doUpdateItem({
    skuId,
    selected: undefined,
    count,
  });
};

// 删除商品
const handleRemove = (id: string) => {
  console.log(id);
  ElMessageBox.confirm("确认删除所选商品吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => doRemove([id]));
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
  padding: 0 1em;
  table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    thead {
      th {
        font-size: 1em;
        font-weight: normal;
        line-height: 60px;
        text-align: center;
        &:first-child {
          width: 100px;
          text-align: left;
          padding-left: 14px;
        }
      }
    }
    tbody {
      tr {
        border-bottom: 1px solid rgba(150, 150, 150, 0.15);
        td.invalid_head {
          padding: 8px 1em;
          > h3 {
            font-size: 1em;
          }
        }
      }
    }
  }
}
// 表格下方的操作栏
.result_panel {
  display: flex;
  padding: 1em 2em;
  align-items: center;
  .left {
    flex: 1;
    > * {
      vertical-align: middle;
    }
    > .statistics {
      margin-left: 1em;
    }
  }
  .right {
    .price {
      vertical-align: middle;
      margin-right: 20px;
      > small {
        font-size: 20px;
        color: @priceColor;
      }
      > em {
        color: @priceColor;
        font-size: 30px;
        font-style: normal;
        font-family: Helvetica Neue, Helvetica, Arial, Microsoft Yahei, Hiragino Sans GB, Heiti SC, WenQuanYi Micro Hei,
          sans-serif;
      }
    }
    .btn_cart_order {
      font-size: 1em;
      padding: 20px 50px;
      vertical-align: middle;
    }
  }
}
.empty {
  padding: 4em 0;
}
</style>
