import React from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Registry from "./pages/Registry";
import SetupBusiness from "./pages/SetupBusiness";
import UserProfile from "./pages/UserProfile";

import "./styles/index.scss";

const Main = () => (
  <HashRouter>
    <div className="main">
      <div className="routing-settings">
        <span key="home"><NavLink exact to="/home">Home</NavLink></span>
        <span key="login"><NavLink exact to="/">Login</NavLink></span>
        <span key="registry"><NavLink exact to="/registry">Registry</NavLink></span>
        <span key="setup-business"><NavLink exact to="/createBusiness">Setup Business</NavLink></span>
        <span key="userProfile"><NavLink exact to="/userProfile`">User Profile</NavLink></span>
      </div>
      <>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/" component={Login}/>
        <Route exact path="/registry" component={Registry}/>
        <Route exact path="/createBusiness" component={SetupBusiness}/>
        <Route exact path="/userProfile" component={UserProfile}/>
      </>
    </div>
  </HashRouter>
);

export default Main;