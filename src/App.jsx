import { useCallback, useEffect, useRef, useState } from "react";
import { VariableSizeList } from "react-window";

function App() {
  const [data, setData] = useState([]);
  const listRef = useRef();
  const sizeMap = useRef({});

  useEffect(() => {
    fetch("../public/data.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log("Failed", err));
  }, []);

  const setItemSize = useCallback((index, size) => {
    sizeMap.current[index] = size;
    listRef.current.resetAfterIndex(index);
  }, []);

  const getItemSize = (index) => sizeMap.current[index] || 200;

  const Row = ({ index, style }) => {
    const rowRef = useRef();

    useEffect(() => {
      if (rowRef.current) {
        const height = rowRef.current.getBoundingClientRect().height;
        setItemSize(index, height);
      }
    }, [index, setItemSize]);

    return (
      <div
        ref={rowRef}
        className="flex flex-col md:flex-row lg:flex-row border-2 border-indigo-600 p-2 gap-y-4"
        style={{ ...style, height: "auto" }}
      >
        <img
          src={data[index].image}
          alt=""
          className="w-36 h-44 object-cover mr-5"
        />
        <div className="flex flex-col">
          <div className="flex text-xl font-semibold mb-2">
            <span>{data[index].id}. </span>
            <h1>{data[index].headline}</h1>
          </div>
          <p className="text-gray-700">{data[index]?.paragraph}</p>
        </div>
      </div>
    );
  };

  return (
    <main className="h-screen flex justify-center items-center p-2 m-4">
      <VariableSizeList
        ref={listRef}
        className="no-scrollbar"
        height={700}
        width={800}
        itemCount={data.length}
        itemSize={getItemSize}
        estimatedItemSize={200}
      >
        {({ index, style }) => <Row index={index} style={style} />}
      </VariableSizeList>
    </main>
  );
}

export default App;
