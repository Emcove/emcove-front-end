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
      <h1>Simple SPA</h1>
      <ul className="header">
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/registry">Registry</NavLink></li>
      </ul>
      <div className="content">
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/registry" component={Registry}/>
      </div>
    </div>
  </HashRouter>
);

export default Main;
