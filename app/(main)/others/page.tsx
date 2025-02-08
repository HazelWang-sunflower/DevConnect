"use client";
import { withAuth } from "@/components/perssion/withAuth";
import VirtualizedList from "@/components/shared/virtuallize-list";
import { FixedSizeList as List } from "react-window";
function OthersPage() {
  const Row = ({ index, style }: { index: number; style: any }) => (
    <div style={style}>Row {index}</div>
  );

  const data = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    content: `Item ${i + 1}`,
  }));

  return (
    <div className="container flex-wrap justify-center">
      <List
        className="w-full "
        height={150}
        itemCount={1000}
        itemSize={35}
        width={300}
      >
        {Row}
      </List>

      <div>
        <p>Customized Virtualized List Component</p>
        <div className="h-[300px]">
          <VirtualizedList
            items={data}
            itemHeight={50}
            style={{ height: "100%" }}
            renderItem={(
              item: { id: number; content: string },
              index: number
            ) => (
              <div
                style={{
                  height: 50,
                  borderBottom: "1px solid #eee",
                  padding: "10px 20px",
                  background: index % 2 === 0 ? "#f8f8f8" : "white",
                }}
              >
                {item.content}
              </div>
            )}
            className="bg-white"
          ></VirtualizedList>
        </div>
      </div>
    </div>
  );
}

export default withAuth(OthersPage);
