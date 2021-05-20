
import React from 'react';
import styled, { css } from 'styled-components'

import { useHistory } from "react-router-dom";
import { colors } from '../../styles/palette';

const Container = styled.div`
  background-color: ${colors.white};
  height: 100vh;
  width: 100%;
`;

const Header = styled.div`
  background-color: ${colors.redOrange};
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
  justify-content: center;
  height: calc(100% - 64px - 52px);

  ${props => props.loginContent && css `
      height: calc(100% - 52px);
      background-color: ${colors.background};
  `}
`;

const Footer = styled.div`
  height: 52px;
  box-shadow: 0px -1px 10px 4px rgba(0,0,0,0.09);
`;

const Logo = styled.div`
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
`

const Layout = ({ children, login }) => {
  const history = useHistory();
  const redirectHome = () => {
    history.push("/home");
  }

  return (
    <Container>
      {!login &&
        <Header>
          <div className="components-container" onClick={redirectHome}>
            <Logo/>
            <CompanyName>Emcove</CompanyName>
          </div>
          <ProfileAccess>Perfil</ProfileAccess>
        </Header>
      }
      <Content loginContent={login}>
        {children}
      </Content>
      <Footer />
    </Container>
  )
}


export default Layout;