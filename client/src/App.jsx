import React, { useState, useEffect } from "react";
import test from "./config";

import SupportFormatText from "./components/atoms/SupportFormatText";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch(`${test.url}/`).then(
      res => res.text()
    ).then(
      d => {
        setData(d);
        console.log(d);
      }
    )
  }, []);

  return (
    <div>
      {typeof data === "undefined" ? <p>LOADING...</p> : data}
      <SupportFormatText formats = {[ "bmp", "dng", "jpeg"]}/>
    </div>
  );
}

export default App;
