import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import axios from "axios";
import qs from "qs";

axios.defaults.paramsSerializer = p => {
  return qs.stringify(p, { arrayFormat: "repeat" })
} 

ReactDOM.render(
  <Main/>, 
  document.getElementById("root")
);