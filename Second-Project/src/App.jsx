import { useState, useEffect } from "react";

function App() {
  const [pass, setPass] = useState("");
  const [len, setLen] = useState(8);
  const [isNumTrue, setNumTrue] = useState(false);
  const [isSymTrue, setSymTrue] = useState(false);
  const [isUpperTrue, setUpperTrue] = useState(false);
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
  };

  const copy = () => {
    navigator.clipboard.writeText(pass);
    alert("Copied");
  };

  useEffect(() => {
    generate();
  }, [len, isNumTrue, isSymTrue, isUpperTrue]);

  return (
    <>
      <div className="">Password Genrator</div>
      <div>{pass}</div>
      <button onClick={copy}>Copy</button>

      <input
        type="range"
        min="8"
        max="20"
        step="1"
        value={len}
        onChange={(e) => {
          setLen(Number(e.target.value));
        }}
      />

      <div>Length: {len}</div>

      <div>Character Used: </div>
      <label>
        <input
          type="checkbox"
          name="number"
          onChange={(e) => {
            setNumTrue(e.target.checked);
          }}
          checked={isNumTrue}
        />{" "}
        123
      </label>
      <label>
        <input
          type="checkbox"
          name="symbols"
          onChange={(e) => {
            setSymTrue(e.target.checked);
          }}
          checked={isSymTrue}
        />{" "}
        #$&
      </label>
      <label>
        <input type="checkbox" name="lowercase" checked /> abc
      </label>
      <label>
        <input
          type="checkbox"
          name="uppercase"
          onChange={(e) => {
            setUpperTrue(e.target.checked);
          }}
          checked={isUpperTrue}
        />{" "}
        ABC
      </label>

      <button onClick={generate}>Generate</button>
    </>
  );
}

export default App;
