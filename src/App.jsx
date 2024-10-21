import { useEffect, useState } from "react";
import { VariableSizeList } from "react-window";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("../public/data.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log("Failed", err));
  }, []);

  const dataSize = data.map((item) => Math.round(item.paragraph.length));
  console.log("data:", dataSize);

  //const getItemSize = (index) => dataSize[index].length;

  const getItemSize = (index) =>
    dataSize[index] < 440 ? 210 : dataSize[index] * 0.25 + 100;

  const Row = ({ index, style }) => (
    <div
      className="flex border-4 border-indigo-600 justify-center h-auto"
      style={style}
    >
      <img
        src={data[index].image}
        alt=""
        className="w-36 h-44 mr-5 flex items-center"
      />
      <div className="px-4">
        <div className="flex">
          <h1 className="text-2xl font-semibold">{data[index].id}. </h1>
          <h1 className="text-2xl font-semibold">{data[index].headline}</h1>
        </div>
        <h1 className="text-md font-semibold text-full">
          {data[index].paragraph}
        </h1>
      </div>
    </div>
  );

  return (
    <main className="h-full flex justify-center items-center p-4">
      <VariableSizeList
        height={700}
        width={800}
        itemCount={data.length}
        itemSize={getItemSize}
      >
        {Row}
      </VariableSizeList>
    </main>
  );
}

export default App;
