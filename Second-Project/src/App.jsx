import { useState, useEffect } from "react";

function App() {
  const [pass, setPass] = useState("");
  const [len, setLen] = useState(8);
  const [isNumTrue, setNumTrue] = useState(false);
  const [isSymTrue, setSymTrue] = useState(false);
  const [isUpperTrue, setUpperTrue] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  // const [isLowerTrue, setLowerTrue] = useState(true);

  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const num = "1234567890";
  const symbol = "!@#$%^&*()_-=+[]{}:;'/?.>,<|";

  const generate = () => {
    let createpass = "";
    let all = lower;
    if (isUpperTrue) all += upper;
    if (isNumTrue) all += num;
    if (isSymTrue) all += symbol;

    for (let i = 0; i < len; i++) {
      createpass = createpass + all[Math.floor(Math.random() * all.length)];
    }
    setPass(createpass);
    setIsCopied(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(pass);
    setIsCopied(true);
    // alert("Copied");
  };

  useEffect(() => {
    generate();
  }, [len, isNumTrue, isSymTrue, isUpperTrue]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-indigo-700">
          🔐 Password Generator
        </h1>

        <div className="bg-gray-100 rounded-lg px-4 py-3 text-lg font-mono break-words">
          {pass}
        </div>

        <div className="flex gap-4">
          <button
            onClick={copy}
            className={`w-full px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 
                      ${
                        isCopied
                          ? "bg-green-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
          >
            {isCopied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={generate}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg w-full"
          >
            Regenerate
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold">Length: {len}</label>
          <input
            type="range"
            min="8"
            max="20"
            step="1"
            value={len}
            onChange={(e) => setLen(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold">
            Character Types:
          </label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={(e) => setNumTrue(e.target.checked)}
                checked={isNumTrue}
              />
              <span className="text-sm">Include Numbers (123)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={(e) => setSymTrue(e.target.checked)}
                checked={isSymTrue}
              />
              <span className="text-sm">Include Symbols (#$&)</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked disabled />
              <span className="text-sm">Include Lowercase (abc)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={(e) => setUpperTrue(e.target.checked)}
                checked={isUpperTrue}
              />
              <span className="text-sm">Include Uppercase (ABC)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
