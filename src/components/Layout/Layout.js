
import React, { useState } from 'react';
import styled, { css } from 'styled-components'

import { useHistory } from 'react-router-dom';
import { colors } from '../../styles/palette';

import Link from '../Link';
import Icons from '../Icons';

import UserData from "../../utils";

const Container = styled.div`
  background-color: ${colors.background};
  width: 100%;
`;

const Header = styled.div`
  background-color: ${colors.error};
  height: 64px;
  box-shadow: 0px 4px 10px 2px rgb(0 0 0 / 19%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  z-index: 15;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 64px 8% 24px;
  min-height: calc(100vh - 53px - 64px - 24px);

  @media (max-width: 768px) {
    padding: 64px 20px 24px;
  }
  
  ${props => props.loginContent && css `
    justify-content: center;
    padding: 0;
    min-height: calc(100vh - 53px);
    
    @media (max-width: 768px) {
      padding: 32px 0 0;
      justify-content: flex-start;
      min-height: calc(100vh - 53px - 32px);
    }
  `}
`;

const Footer = styled.div`
  height: 52px;
  border-top: solid 1px rgba(0,0,0,0.09);
  box-shadow: -1px -4px 11px 2px rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 8%;
  width: 92%;
  z-index: 10;
`;

const ProfileAccess = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 100%;
  border: none;
  background-color: ${colors.white};
  margin-right: 3%;
  :hover {
    cursor: pointer;
  }
`;

const ProfileOptions = styled.div`
  position: absolute;
  right: 5%;
  top: 36px;
  display: flex;
  flex-direction: column;
  border: solid 1px ${colors.grayBorder};
  background-color: ${colors.white};
  border-radius: 3px;
  transition: box-shadow 0.2s ease-in-out;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);

  &:hover {
    box-shadow: 0 8px 16px 0 rgb(0 0 0 / 10%);
  }
`;

const Option = styled.div`
  padding: 12px 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.primary};

  &:hover {
    cursor: pointer;
    background-color: ${colors.primaryHover};
  }

  ${props => props.hideOnMobile && css `
    @media (max-width: 768px) {
      display: none;
    }
  `}
`;

const Layout = ({ children, login, registry, className }) => {
  const [profileOptions, showProfileOptions] = useState(false);
  const history = useHistory();
  const redirectHome = () => {
    history.push("/home");
  }

  const user = UserData.getUserFromStorage();

  const business = user.entrepreneurship.name;
  
  return (
    <Container className={className}>
      {!login &&
        <Header>
          <div className="components-container" onClick={redirectHome}>
            <Icons type="horizontal-color-logo" className="header-color-logo"/>
          </div>
          {!registry && <ProfileAccess onClick={() => showProfileOptions(!profileOptions)}><Icons type="user" /></ProfileAccess>}
          {profileOptions &&
            <ProfileOptions>
              {user && <Option onClick={() => history.push('/userProfile')}>Mi perfil</Option>}
              {user && <Option onClick={() => history.push('/reputation?from=nav-header')}>Mi reputación</Option>}
              {user && <Option onClick={() => history.push('/orders')}>Ver pedidos que hice</Option>}
              {user && user.entrepreneurship && <Option onClick={() => history.push(`/business/${business}`)}>Gestionar mi emprendimiento</Option>}
              {user && user.entrepreneurship && <Option onClick={() => history.push('/businessOrders')}>Pedidos que recibí</Option>}
              {!user && <Option onClick={() => history.push('/')}>Iniciar sesión</Option>}
            </ProfileOptions>
          }
        </Header>
      }
      <Content loginContent={login}>
        {children}
      </Content>
      <Footer>
        <Link>Términos y condiciones</Link>
      </Footer>
    </Container>
  )
}


export default Layout;