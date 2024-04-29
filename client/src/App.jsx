<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import test from "./config";
import './App.css';
=======
import React from "react";
// import test from "./config";
import Routes from "./Routes";
>>>>>>> 4871c8d76569e9f9bcac5eb5fe5498cdf6edf1f3

function App() {
  // const [data, setData] = useState("");

  // useEffect(() => {
  //   fetch(`${test.url}/`).then(
  //     res => res.text()
  //   ).then(
  //     d => {
  //       setData(d);
  //       console.log(d);
  //     }
  //   )
  // }, []);

  return (
    <Routes />
    // <div>
    //   {typeof data === "undefined" ? <p>LOADING...</p> : data}
    // </div>
  );
}

export default App;
