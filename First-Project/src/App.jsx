import { useState } from 'react'
import CountButton from './components/Button'
import Card from './components/Card'


function App() {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [sign, setsign] = useState(" ");
  const [fin, setFin] = useState("");

  const arrnum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const arrsign = ["+", "-", "*", "/"];

  const click = () => {
    const numX = Number(x);
    const numY = Number(y);

    if (sign === "+") setFin(numX + numY);
    else if (sign === "-") setFin(numX - numY);
    else if (sign === "*") setFin(numX * numY);
    else if (sign === "/") setFin(numX / numY);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Calculator</h1>

        <div className="flex justify-center items-center gap-2 text-xl mb-4">
          <span>{x}</span>
          <span>{sign}</span>
          <span>{y}</span>
          <span>=</span>
          <span className="font-bold text-green-600">{fin}</span>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-4">
          {arrnum.map((item) => (
            <button
              key={item}
              onClick={() => {
                if (sign === " ") setX((prev) => prev + item.toString());
                else setY((prev) => prev + item.toString());
              }}
              className="bg-gray-200 hover:bg-gray-300 p-3 rounded-xl text-lg font-medium"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex justify-between gap-2 mb-4">
          {arrsign.map((item) => (
            <button
              key={item}
              onClick={() => setsign(item)}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl w-full font-semibold"
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={click}
          className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl font-bold text-lg"
        >
          Calculate
        </button>
      </div>
    </div>
  );
}



// function App(){
//   return (
//     <>
//       <Card name="Aryan" age="18"/>
//       <Card name="AG" age="21"/>
//       <Card />
//     </>
//   )
// }


export default App
