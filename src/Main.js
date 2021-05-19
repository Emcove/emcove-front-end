import React from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Registry from "./pages/Registry";

import "./index.scss";

const Main = () => (
  <HashRouter>
    <div>
      <div className="routing-settings">
        <span key="home"><NavLink exact to="/">Home</NavLink></span>
        <span key="login"><NavLink to="/login">Login</NavLink></span>
        <span key="registry"><NavLink to="/registry">Registry</NavLink></span>
      </div>
      <>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/registry" component={Registry}/>
      </>
    </div>
  </HashRouter>
);

export default Main;