import React from "react";
// import test from "./config";
import Routes from "./Routes";

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
