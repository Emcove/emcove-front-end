
import styled from 'styled-components'

import { colors } from '../../styles/palette';

const Container = styled.div`
  background-color: ${colors.white};
  height: 100vh;
  width: 100%;
`;

const Header = styled.div`
  background-color: ${colors.green};
  height: 64px;
  box-shadow: 0px 4px 10px 2px rgb(0 0 0 / 19%);
`;

const Content = styled.div`
  height: calc(100% - 64px - 52px);
`;

const Footer = styled.div`
  border-top: solid 1px ${colors.lightGray};
  background-color: ${colors.orange};
  height: 52px;
`;

const Layout = ({ type }) => {
  return (
    <Container>
      <Header></Header>
      <Content> </Content>
      <Footer />
    </Container>
  )
}


export default Layout;