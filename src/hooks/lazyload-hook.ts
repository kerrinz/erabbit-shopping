import { useIntersectionObserver } from "@vueuse/core";
import { ref, type UnwrapRef } from "vue";

export declare type Callback = () => Promise<unknown>;

/**
 * 懒加载响应式函数，进入dom视图时才会触发
 * @param {HTMLElement} dom - 监听的目标元素
 * @param {Callback} callBack - 异步函数
 */
export const useLazyload = <D = unknown>(callBack: () => Promise<D>) => {
  const result = ref<D | null>(null);
  const dom = ref<HTMLElement | null>(null);
  const { stop } = useIntersectionObserver(
    dom,
    ([{ isIntersecting }]) => {
      // 当进入可视区域时
      if (isIntersecting) {
        // 停止 Observer
        stop();
        // 异步回调函数，取值
        callBack().then((data) => {
          result.value = data as UnwrapRef<D>;
        });
      }
    },
    {
      // 触发回调函数所需的dom进入视图的大小比例
      threshold: 0,
    }
  );
  return { result, dom };
};
