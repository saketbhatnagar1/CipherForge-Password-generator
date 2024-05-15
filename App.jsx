import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(6);
  const [numberallowed, setnumberallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState("");

  //use ref hook
  const passwordref = useRef(null);
  const copypasswrodtoclipboard = useCallback(() => {
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberallowed) {
      str += "0123456789";
    }
    if (charallowed) {
      str += "!@#$%^&*()+=-}]{[';`~";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [length, numberallowed, charallowed, setpassword]);

  // passwordgenerator();

  useEffect(() => {
    passwordgenerator();
  }, [length, numberallowed, charallowed, passwordgenerator]);

  return (
    <div className="container">
      <div className="field">
        <label>Password generator</label>
        <input
          type="text"
          value={password}
          className="input"
          placeholder="password"
          readOnly
          ref={passwordref}
        ></input>
        <button onClick={copypasswrodtoclipboard}>CopyPassword</button>
      </div>
      <div className="range">
        <label>Length:{length}</label>
        <input
          type="range"
          min={6}
          max={20}
          onChange={(e) => {
            setLength(e.target.value);
          }}
        ></input>
      </div>
      <label>Numbers allowed</label>
      <input
        className="checkbox"
        type="checkbox"
        defaultChecked={numberallowed}
        onChange={() => {
          setnumberallowed((prev) => !prev);
        }}
      ></input>
      <label>Characters allowed</label>
      <input
        className="checkbox"
        type="checkbox"
        defaultChecked={charallowed}
        onChange={() => {
          setcharallowed((prev) => !prev);
        }}
      ></input>
      <br></br>
      <button onClick={passwordgenerator}>Reset</button>
    </div>
  );
}

export default App;
