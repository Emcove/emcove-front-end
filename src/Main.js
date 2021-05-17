import React from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import { Layout, Menu } from 'antd';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Registry from "./pages/Registry";

import "./index.scss";

const { Header, Footer, Content } = Layout;

const Main = () => (
  <HashRouter>
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="home"><NavLink exact to="/">Home</NavLink></Menu.Item>
          <Menu.Item key="login"><NavLink to="/login">Login</NavLink></Menu.Item>
          <Menu.Item key="registry"><NavLink to="/registry">Registry</NavLink></Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/registry" component={Registry}/>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Mica was here</Footer>
    </Layout>
  </HashRouter>
);

export default Main;