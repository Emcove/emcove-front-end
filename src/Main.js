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
import Reputation from "./pages/Reputation";
import BusinessDetail from "./pages/BusinessDetail";
import Orders from "./pages/Orders";
import BusinessOrders from "./pages/BusinessOrders";

import "./styles/index.scss";

const Main = () => (
  <HashRouter>
    <div className="main">
      <div className="routing-settings">
        <span key="home"><NavLink exact to="/home">Home</NavLink></span>
        <span key="login"><NavLink exact to="/">Login</NavLink></span>
        <span key="registry"><NavLink exact to="/registry">Registry</NavLink></span>
        <span key="setupBusiness"><NavLink exact to="/createBusiness">Setup Business</NavLink></span>
        <span key="userProfile"><NavLink exact to="/userProfile`">User Profile</NavLink></span>
        <span key="reputation"><NavLink exact to="/reputation`">Reputation</NavLink></span>
        <span key="businessDetail"><NavLink exact to="/business">Business Detail</NavLink></span>
        <span key="orders"><NavLink exact to="/orders`">Pedidos</NavLink></span>
        <span key="businessOrder"><NavLink exact to="/businessOrders`">Pedidos de emprendimiento</NavLink></span>
      </div>
      <>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/" component={Login}/>
        <Route exact path="/registry" component={Registry}/>
        <Route exact path="/createBusiness" component={SetupBusiness}/>
        <Route exact path="/userProfile" component={UserProfile}/>
        <Route exact path="/reputation" component={Reputation}/>
        <Route exact path="/business" component={BusinessDetail}/>
        <Route exact path="/orders" component={Orders}/>
        <Route exact path="/businessOrders" component={BusinessOrders}/>
        {/* <Route exact path="/:{business}/detail" component={Orders}/> */}
      </>
    </div>
  </HashRouter>
);

export default Main;