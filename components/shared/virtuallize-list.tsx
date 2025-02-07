import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type VirtualizedListProps = {
  items: Array<any>;
  itemHeight: number;
  renderItem: Function;
  className: string;
  style: object;
  buffer?: number;
};
export default function VirtualizedList({
  items,
  itemHeight,
  renderItem,
  className,
  style,
  buffer = 2,
}: VirtualizedListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const requestFrameRef = useRef(0);

  //visiable area height
  const containerHeight = useMemo(() => {
    return containerRef.current?.clientHeight || 0;
  }, [containerRef.current?.clientHeight]);

  //total list height, for expand the container and scroll bar
  const totalHeight = useMemo(() => {
    return items.length * itemHeight;
  }, [items.length, itemHeight]);

  //calculate the visible range
  const { startIndex, endIndex } = useMemo(() => {
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const startIdx = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
    const endIdx = Math.min(
      items.length - 1,
      startIdx + visibleCount + buffer * 2
    );
    return {
      startIndex: startIdx,
      endIndex: endIdx,
    };
  }, [scrollTop, containerHeight, itemHeight, buffer, items.length]);

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex + 1);
  }, [items, startIndex, endIndex]);

  const handleScroll = useCallback((e: any) => {
    if (requestFrameRef.current) {
      cancelAnimationFrame(requestFrameRef.current);
    }
    requestFrameRef.current = requestAnimationFrame(() => {
      setScrollTop(e.target.scrollTop);
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    setScrollTop(containerRef.current.scrollTop);
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ ...style, overflowY: "auto", position: "relative" }}
    >
      {/* 总高度占位元素 */}
      <div style={{ height: totalHeight }}> </div>
      {/* 可见项渲染容器 */}
      <div
        style={{
          position: "absolute",
          top: startIndex * itemHeight,
          width: "100%",
        }}
      >
        {visibleItems.map((item, index) => (
          <div key={startIndex + index} style={{ height: itemHeight }}>
            {renderItem(item, startIndex + index)}
          </div>
        ))}
      </div>
    </div>
  );
}
