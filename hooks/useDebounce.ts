import { useCallback, useEffect, useRef } from "react";

export function useDebounce<T extends (...args: any[]) => any[]>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  const fnRef = useRef(fn);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  // 始终使用最新的回调函数
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  // 处理组件卸载时的清理
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        // 只在组件仍挂载时执行回调
        if (isMountedRef.current) {
          fnRef.current(...args);
        }

        timer.current = null;
      }, delay);
    },
    [delay]
  );
}

export default useDebounce;
