import { defineStore, storeToRefs } from "pinia";

// 参数1：store的唯一表示
// 参数2：对象，可以提供state actions getters
/* 示例：计数器 */
const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      count: 0,
    };
  },
  // 提供计算属性，属于拓展功能
  getters: {
    double(): number {
      return this.count * 2;
    },
  },
  actions: {
    increment() {
      this.count++;
    },
    incrementAsync() {
      setTimeout(() => {
        this.count++;
      }, 1000);
    },
  },
});

export default useCounterStore;

/* 在组件中的使用方式 */
const counter = useCounterStore();
// 如果直接从pinia中解构数据，会丢失响应式
// const { count, double } = counter;
// 使用storeToRefs可以保证解构出来的数据也是响应式的
const { count, double } = storeToRefs(counter);
console.log(count, double);
