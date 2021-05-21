import React from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Registry from "./pages/Registry";

import "./styles/index.scss";

const Main = () => (
  <HashRouter>
    <div className="main">
      <div className="routing-settings">
        <span key="home"><NavLink exact to="/home">Home</NavLink></span>
        <span key="login"><NavLink exact to="/">Login</NavLink></span>
        <span key="registry"><NavLink exact to="/registry">Registry</NavLink></span>
      </div>
      <>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/" component={Login}/>
        <Route exact path="/registry" component={Registry}/>
      </>
    </div>
  </HashRouter>
);

export default Main;