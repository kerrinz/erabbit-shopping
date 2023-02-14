<template>
  <div class="x-city-selector" ref="wholeTarget">
    <div class="select_btn" @click="isShowPanel = !isShowPanel">
      <span class="text">
        <span v-for="value in props.value" :key="value.code">{{ value.name }}&nbsp;</span></span
      >
      <el-icon><ArrowDown /></el-icon>
    </div>
    <Transition>
      <div v-if="isShowPanel" class="selector_panel">
        <div v-if="isLoading" class="loading">loading</div>
        <template v-else>
          <span
            v-for="(item, index) in displayOptions"
            :key="item.code"
            class="option"
            @click="handleClickOption(item, index)"
          >
            {{ item.name }}
          </span>
        </template>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch, watchEffect } from "vue";
import axios from "axios";
import { onClickOutside } from "@vueuse/core";

// 选择项的数据模型
interface OptionModel {
  areaList: OptionModel[];
  code: string;
  level: number;
  name: string;
}

// 双向绑定数据的模型（组合成列表）
interface ValueModel {
  code: string;
  level: number;
  name: string;
}

const props = withDefaults(
  defineProps<{
    /** 请使用 v-model:value 指定 value，将会自动双向绑定
     *
     *  每个数据项代表一个地址层级
     */
    value: ValueModel[];
    placeholder: string;
  }>(),
  { placeholder: "请选择地址" }
);
const emit = defineEmits(["update:value"]);

// 是否显示选择面板
const isShowPanel = ref(false);
// 是否正在加载
const isLoading = ref(false);

// 数据来源
const originUrl = "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json";
// 获取数据
const requestData = async () => {
  const res = await axios.get<OptionModel[]>(originUrl);
  return res.data;
};
// 所有省市区数据
const allCityData = ref<OptionModel[]>([]);

// UI 展示的选项列表
const displayOptions = computed(() => {
  let options = allCityData.value; // 初始用首层数据
  // 用 for of 遍历已选择的索引列表的值（值为索引）
  for (const value of selectedIndexList.value) {
    const nextAreaList = options[value].areaList;
    // 没有子列表则结束循环
    if (nextAreaList == undefined) break;
    // 取出子列表
    options = nextAreaList;
  }
  return options;
});

// 已选择项的索引表（不会双向绑定到外部组件）
// 它的长度-1 等同于已选择地址的层级
const selectedIndexList = ref<number[]>([]);

watch(isShowPanel, (value) => {
  // 关闭面板的时候清空缓存的已选择索引表
  if (!value) selectedIndexList.value = [];
});

watchEffect(() => {
  // 首次展开地址列表面板的时候才会请求数据
  // 请求成功后会作为缓存，不再重复请求
  if (isShowPanel.value && allCityData.value.length == 0) {
    requestData().then((data) => {
      allCityData.value = data;
      console.log(data);
    });
  }
});

// 整个组件整体的 DOM
const wholeTarget = ref(null);

// 点击其他区域的时候关闭地址列表面板
onClickOutside(wholeTarget, () => {
  isShowPanel.value = false;
});

// 点击选择项
const handleClickOption = (item: OptionModel, index: number) => {
  selectedIndexList.value.push(index);
  if (!item.areaList) {
    // 没有下一层级了，返回双向绑定结果，并关闭面板
    const result = [] as ValueModel[];
    let nextArea = allCityData.value;
    for (const index of selectedIndexList.value) {
      // 取得该层级下的地址项
      result.push({
        code: nextArea[index].code,
        name: nextArea[index].name,
        level: nextArea[index].level,
      });
      // 往下一层走
      const next = nextArea[index].areaList;
      // 没有下一层则结束循环
      if (next == undefined) break;
      nextArea = next;
    }
    emit("update:value", result);
    isShowPanel.value = false;
  }
};
</script>
<style scoped lang="less">
@outlineColor: rgba(150, 150, 150, 0.5);
.x-city-selector {
  display: inline-block;
  position: relative;
  cursor: pointer;
  user-select: none;
  .select_btn {
    border: 1px solid @outlineColor;
    border-radius: 2px;
    padding: 4px 8px;
    transition: all.2s;
    display: flex;
    align-items: center;
    &:hover {
      border-color: @primaryColor;
    }
    .text {
      margin-right: 4px;
    }
  }
}
// 选择面板
.selector_panel {
  z-index: 1002;
  position: absolute;
  left: 0;
  top: 100%;
  width: 400px;
  padding: 1em;
  background-color: @surfaceColor;
  border: 1px solid @outlineColor;
  border-radius: 2px;
  overflow: hidden;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  // 选择项
  .option {
    padding: 6px 0;
    text-align: center;
    // border: 1px solid rgba(150, 150, 150, 0.1);
    &:hover {
      background-color: @backgroundColor;
    }
  }
}

// 动画效果
.v-enter-active {
  transition: all 0.2s ease-out;
}
.v-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.v-enter-from,
.v-leave-to {
  transform: translateX(8px);
  opacity: 0;
}
</style>
