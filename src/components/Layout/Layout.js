
import React from 'react';
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
`

const Layout = ({ children, login, registry }) => {
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
          {!registry && <ProfileAccess><Icons type="user" /></ProfileAccess>}
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