<template>
  <span class="x-static-checkbox" :class="{ active: checked }" @click="$emit('onTap', checked)">
    <span class="icon">
      <svg t="1676724570817" viewBox="0 0 1879 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3655">
        <path
          d="M801.590751 981.530636c-19.384971 0-38.030058-7.250867-52.087861-20.420809L348.337572 587.024277c-30.039306-27.96763-31.075145-74.43237-2.36763-103.731791s76.504046-30.187283 106.543353-2.219654L795.079769 800.554913 1416.434682 65.257803c26.487861-31.223121 73.988439-35.810405 106.099422-10.062427 32.110983 25.747977 36.698266 71.916763 10.358382 103.287861L859.893642 954.894798c-13.317919 15.833526-32.850867 25.452023-53.715607 26.635838h-4.587284z"
          p-id="3656"
        ></path>
      </svg>
    </span>
    <label v-if="label"> {{ label }}</label>
  </span>
</template>

<script setup lang="ts">
import { ref, toRef, watch } from "vue";

const props = withDefaults(
  defineProps<{
    value: boolean;
    label: string | undefined;
  }>(),
  {
    label: undefined,
  }
);
const emit = defineEmits<{
  (e: "onTap"): ((prev: boolean) => void) | undefined;
  "update:value": () => void | undefined;
}>();

const checked = toRef(props, "value");
watch(checked, () => console.log(checked.value));
</script>
<style lang="less" scoped>
.x-static-checkbox {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  &.active {
    .icon {
      background-color: @primaryColor;
      border-radius: 2px;
      > svg {
        visibility: visible;
      }
    }
  }
  .icon {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 1px solid @primaryColor;
    > svg {
      visibility: hidden;
      fill: @onPrimaryColor;
      width: inherit;
      height: inherit;
      vertical-align: top;
      display: inline-block;
    }
  }
  label {
    margin-left: 8px;
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
  }
}
</style>
