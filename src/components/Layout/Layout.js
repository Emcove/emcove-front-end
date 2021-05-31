
import React, { useState } from 'react';
import styled, { css } from 'styled-components'

import { useHistory } from 'react-router-dom';
import { colors } from '../../styles/palette';

import Link from '../Link';
import Icons from '../Icons';

const Container = styled.div`
  background-color: ${colors.background};
  height: 100vh;
  width: 100%;
`;

const Header = styled.div`
  background-color: ${colors.error};
  height: 64px;
  box-shadow: 0px 4px 10px 2px rgb(0 0 0 / 19%);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: calc(100% - 64px - 92px);
  overflow: scroll;
  padding: 20px 8%;
  ${props => props.loginContent && css `
      height: calc(100% - 52px);
      justify-content: center;
      padding: 0;
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
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  background-color: ${colors.white};
`;

const CompanyName = styled.h1`
  margin-left: 18px;
  color: ${colors.textColor};
`

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
`;

const Layout = ({ children, login, registry }) => {
  const [profileOptions, showProfileOptions] = useState(false);
  const history = useHistory();
  const redirectHome = () => {
    history.push("/home");
  }

  return (
    <Container>
      {!login &&
        <Header>
          <div className="components-container" onClick={redirectHome}>
            <Logo><Icons type="logo" /></Logo>
            <CompanyName>Emcove</CompanyName>
          </div>
          {!registry && <ProfileAccess onClick={() => showProfileOptions(!profileOptions)}><Icons type="user" /></ProfileAccess>}
          {profileOptions &&
            <ProfileOptions>
              <Option onClick={() => history.push('/userProfile')}>Mi perfil</Option>
              <Option>Mi reputación</Option>
              <Option>Ver pedidos que hice</Option>
              <Option>Gestionar mi emprendimiento</Option>
              <Option>Gestionar mis pedidos</Option>
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