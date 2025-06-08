import { useState } from "react";

function App() {
  const [pass, setPass] = useState("");
  const [len, setLen] = useState(8);
  const [isNumTrue, setNumTrue] = useState(false);
  const [isSymTrue, setSymTrue] = useState(false);
  const [isUpperTrue, setUpperTrue] = useState(false);
  // const [isLowerTrue, setLowerTrue] = useState(true);

  let createpass = "";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const num = "1234567890";
  const symbol = "!@#$%^&*()_-=+[]{}:;'/?.>,<|";

  const run = () => {
    let all = lower;
    if (isUpperTrue) all += upper;
    if (isNumTrue) all += num;
    if (isSymTrue) all += symbol;

    for (let i = 0; i < len; i++) {
      createpass = createpass + all[Math.floor(Math.random() * all.length)];
    }
    setPass(createpass);
  };

  const lenChange = (e) => {
    setLen(Number(e.target.value));
    run();
  };

  const numChange = (e) => {
    setNumTrue(e.target.checked);
    run();
  };
  const upperChange = (e) => {
    setUpperTrue(e.target.checked);
    run();
  };
  const symChange = (e) => {
    setSymTrue(e.target.checked);
    run();
  };

  const copy = () => {
    navigator.clipboard.writeText(pass);
  };

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
        onChange={lenChange}
      />

      <div>Length: {len}</div>

      <div>Character Used: </div>
      <label>
        <input
          type="checkbox"
          name="number"
          value="number"
          onChange={numChange}
          checked={isNumTrue}
        />{" "}
        123
      </label>
      <label>
        <input
          type="checkbox"
          name="symbols"
          value="symbols"
          onChange={symChange}
          checked={isSymTrue}
        />{" "}
        #$&
      </label>
      <label>
        <input type="checkbox" name="lowercase" value="lowercase" checked /> abc
      </label>
      <label>
        <input
          type="checkbox"
          name="uppercase"
          value="uppercase"
          onChange={upperChange}
          checked={isUpperTrue}
        />{" "}
        ABC
      </label>

      <button onClick={run}>Generate</button>
    </>
  );
}

export default App;
