<template>
  <div class="content">
    <!-- 标题（商品名） -->
    <div v-if="props.data" class="title">{{ props.data.name }}</div>
    <XSkeleton v-else height="2em" />
    <!-- 描述信息 -->
    <div v-if="props.data" class="desc">{{ props.data.desc }}</div>
    <XSkeleton v-else height="1em" width="300px" block />
    <!-- 价格 -->
    <div v-if="props.data">
      <span class="price">
        <small>￥</small><strong>{{ selectedSkuProduct?.price ?? props.data.price }} </strong>
      </span>
      <span class="old_price"> <small>￥</small>{{ selectedSkuProduct?.oldPrice ?? props.data.oldPrice }} </span>
    </div>
    <XSkeleton v-else height="2em" width="200px" style="margin: 1em 0" />
    <!-- 功能表区块 -->
    <ul class="table_group secondary_panel">
      <li class="item">
        <div class="key">促销</div>
        <div class="value">满300元即赠热销商品，赠完即止，请在购物车点击领取</div>
      </li>
      <li class="item">
        <span class="key">配送</span>
        <div class="value">至 <XCitySelector class="city_selector" v-model:value="address" />免运费</div>
      </li>
      <li class="item">
        <span class="key">服务</span>
        <div class="value">
          <ul class="serve">
            <li>7天无理由退货</li>
            <li>30天价保</li>
            <li>运费险</li>
          </ul>
        </div>
      </li>
    </ul>
    <!-- 商品选项（例如颜色、尺码等等） -->
    <template v-if="props.data">
      <!-- 多组选择项 -->
      <ul class="table_group specs_groups">
        <li v-for="group in props.data.specs" :key="group.name" class="item">
          <span class="key">{{ group.name }}</span>
          <span class="value">
            <!-- 其中某一组选择项 -->
            <ul class="specs_options">
              <!-- 组内的某一个选择项 -->
              <li
                v-for="option in group.values"
                :key="option.name"
                class="option"
                :class="{ active: selectedMap.get(group.name) == option.name }"
                @click="handleSelectOption(option, group.name)"
              >
                <img v-if="option.picture" :src="option.picture" />
                <span v-else class="text">{{ option.name }}</span>
              </li>
            </ul>
          </span>
        </li>
      </ul>
    </template>
    <XSkeleton v-else height="200px" style="margin: 1em 0" />
    <!-- 设置商品数量 -->
    <ul class="table_group">
      <li class="item">
        <span class="key">数量</span>
        <span class="value">
          <el-input-number
            v-model="counter"
            :min="1"
            :max="selectedSkuProduct?.inventory"
            @change="handleChangeCounter"
        /></span>
      </li>
      <li class="item">
        <span class="key"></span>
        <span class="value">
          <!-- 添加购物车按钮 -->
          <el-button
            class="btn_add_cart"
            type="primary"
            :disabled="selectedMap.size != props.data?.specs.length"
            :loading="isAddingCart"
            @click="handleAddToCart"
          >
            加入购物车
          </el-button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { insertCart } from "@/api/cart";
import useCartStore from "@/stores/cart";
import { computed, nextTick, ref } from "vue";
import { ElMessage } from "element-plus";
import useAccountStore from "@/stores/account";
import type { GoodsDetailModel } from "@/model/goods-model";

// 规格组的单个选择项，需要 Array 组合成多个选择项
interface OptionModel {
  /** 规格名 */
  name: string;
  desc: string;
  /** 显示的小封面图，如果为null则无图片请使用@param name */
  picture: string | null;
}

const props = defineProps<{
  data: GoodsDetailModel | undefined;
}>();

const address = ref([
  {
    code: "440000",
    name: "广东省",
    level: 0,
  },
  {
    code: "440100",
    name: "广州市",
    level: 1,
  },
  {
    code: "440106",
    level: 2,
    name: "天河区",
  },
]);

// 商品数量
const counter = ref(1);

// 选择的规格项的名称值的集合，索引下标对应 props.specs的索引下标
// const selectedSkuValueName = ref<string[]>([]);

// 被选择的规格项 Map 集合，key 对应规格组的组名，value 对应被选择的规格项的名称值
const selectedMap = ref<Map<string, string>>(new Map());

// 最终选择的库存商品（在 props.sku 中对应），需要每个规格组都已选择规格项，否则为空
const selectedSkuProduct = computed(() => {
  if (selectedMap.value.size != props.data?.specs.length) {
    // 存在没选择的规格组
    return null;
  }
  const item = props.data.skus.find((product) => {
    // 找到符合已选择的规格项 [selectedMap] 的商品
    let result = true;
    for (const item of product.specs) {
      if (selectedMap.value.get(item.name) != item.valueName) {
        result = false;
        break;
      }
    }
    return result;
  });
  return item;
});

const handleChangeCounter = (current: number | undefined, old: number | undefined) => {
  // 过滤不合法的输入值
  if (!current && old) {
    nextTick(() => {
      counter.value = old;
    });
  }
};

// 点击了某个规格项
const handleSelectOption = (option: OptionModel, groupName: string) => {
  selectedMap.value.set(groupName, option.name);
};

// 是否正在请求添加购物车
const isAddingCart = ref(false);

// 添加到购物车
const handleAddToCart = () => {
  if (!selectedSkuProduct.value || isAddingCart.value || !props.data) return;
  isAddingCart.value = true;
  if (useAccountStore().isLoggedIn) {
    insertCart({
      skuId: selectedSkuProduct.value.id,
      count: counter.value,
    })
      .then((res) => {
        useCartStore().insertCart(res.result);
        ElMessage({
          showClose: true,
          message: `已加入购物车`,
          type: "success",
        });
      })
      .catch((err) => {
        ElMessage({
          showClose: true,
          message: `加入购物车失败！`,
          type: "error",
        });
        console.log(err);
      })
      .finally(() => (isAddingCart.value = false));
  } else {
    const { skuCode, specs, inventory: stock } = selectedSkuProduct.value;
    const { id, name, price, mainPictures, isCollect, discount } = props.data;
    useCartStore().insertCart({
      id,
      name,
      picture: mainPictures[0],
      price,
      count: counter.value,
      skuId: skuCode,
      attrsText: specs.reduce<string>((p, c) => `${p} ${c.name}:${c.valueName}}`, ""),
      nowPrice: price,
      stock,
      isCollect,
      discount,
      isEffective: true,
      selected: true,
    });
    isAddingCart.value = false;
    ElMessage({
      showClose: true,
      message: `已加入购物车`,
      type: "success",
    });
  }
};
</script>
<style lang="less" scoped>
.content {
  margin-left: 4em;
  > .title {
    font-weight: 500;
    font-size: 1.5em;
    margin-bottom: 12px;
  }
  .desc {
    font-size: 1em;
    color: @text5Color;
  }
  .price {
    font-size: 1.75em;
    color: @priceColor;
    margin: 8px 8px 8px 0;
    display: inline-block;
  }
  .old_price {
    font-size: 1em;
    color: @text5Color;
    text-decoration: line-through;
  }
  > .secondary_panel {
    background-color: rgba(175, 175, 175, 0.12);
    padding: 8px 0;
    width: 500px;
    // 配送区域选择器
    .city_selector {
      margin: 0 10px;
      position: unset;
      :deep(.selector_panel) {
        width: 500px;
      }
    }
    // 服务内容，横向列表
    ul.serve {
      li {
        display: inline-block;
        margin-right: 10px;
        &::before {
          content: "";
          display: inline-block;
          position: relative;
          width: 4px;
          height: 4px;
          top: -1px;
          margin-right: 4px;
          border-radius: 4px;
          vertical-align: middle;
          background-color: @primaryColor;
        }
      }
    }
  }
}
// 表格组（左右分栏）
.table_group {
  .item {
    display: flex;
    align-items: center;
    padding: 10px 12px;
    .key {
      color: @text4Color;
      font-size: 0.9em;
      width: 65px;
      letter-spacing: 6px;
    }
    .value {
      flex: 1;
      color: @text4Color;
      font-size: 0.9em;
      position: relative;
    }
  }
}
@outlineColor: rgba(160, 160, 160, 0.33);
// 商品的选项组
.specs_groups {
  padding-top: 12px;
  > .item {
    padding-top: 0;
  }
  ul.specs_options {
    // 单个选择项
    li.option {
      position: relative;
      display: inline-block;
      border: 2px solid @outlineColor;
      font-size: 0;
      margin: 4px 4px;
      transition: all.1s;
      cursor: pointer;
      user-select: none;
      &:hover {
        border-color: @primaryColor;
      }
      &.active {
        border-color: @primaryColor;
        color: @primaryColor;
      }
      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
      }
      .text {
        font-size: 14px;
        margin: 6px 12px;
        display: inline-block;
      }
    }
  }
}
// 加入购物车按钮
.btn_add_cart {
  padding: 20px 40px;
  font-size: 1em;
  &:not(:disabled):focus {
    background-color: var(--el-button-bg-color);
  }
  &:not(:disabled):hover {
    background-color: var(--el-button-hover-bg-color);
  }
  &:not(:disabled):active {
    background-color: var(--el-button-active-bg-color);
  }
}
</style>
