import { time } from "console";
import { useCallback, useEffect, useRef } from "react";

// 定义配置项接口
interface ThrottleOptions {
  /**
   * 是否在节流开始时立即执行（首次调用立即触发）
   * @default true
   */
  leading?: boolean;
  /**
   * 是否在节流结束后执行最后一次调用
   * @default true
   */
  trailing?: boolean;
}

/**
 * 自定义节流 Hook
 * @param fn 需要节流的函数
 * @param delay 节流时间（毫秒）
 * @param options 配置项 { leading, trailing }
 * @returns 节流后的函数
 */
export function useThrottle<T extends (...args: any[]) => any[]>(
  fn: T,
  delay: number,
  options: ThrottleOptions = { leading: true, trailing: true }
) {
  const fnRef = useRef(fn);
  // 使用 ref 存储最新的函数引用，确保节流函数内部始终调用最新版本
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const lastArgsRef = useRef<Parameters<T> | null>(null);

  // 跟踪组件挂载状态，避免卸载后执行回调
  const isMountedRef = useRef(true);

  //防止组件卸载后执行回调导致内存泄漏
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  // 核心节流逻辑
  const throttle = useCallback(
    (...args: Parameters<T>) => {
      const { leading, trailing } = options;
      const now = Date.now();
      // 记录最后一次调用的参数
      lastArgsRef.current = args;

      // 如果定时器不存在，说明可以触发新调用
      if (!timer.current) {
        if (leading) {
          fnRef.current(...args);
        }
        // 设置定时器处理 trailing 调用
        timer.current = setTimeout(() => {
          // 检查组件是否已卸载
          if (!isMountedRef.current) return;
          // trailing 模式下执行最后一次调用
          if (trailing && lastArgsRef.current) {
            // 类似 lodash 的 leading/trailing 模式
            fnRef.current(...lastArgsRef.current);
            lastArgsRef.current = null;
          }
          // 清除定时器，允许下一次调用
          timer.current = null;
        }, delay);
      }
    },
    [delay, options.leading, options.trailing]
  );
  return throttle;
}

// const throttledScroll = useThrottle((position: number) => {
//   console.log('Scroll position:', position);
// }, 200, { leading: true, trailing: true });
