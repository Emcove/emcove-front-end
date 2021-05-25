import React from 'react';
import styled from 'styled-components'

import Layout from '../../components/Layout';
import Title from '../../components/Title';

// import { colors } from '../../styles/palette';

const Content = styled.div`
  width: 84%;
  max-width: 530px;
`;

const Setup = () => {
  return (
    <Layout>
      <Content>
        <Title>Crear mi emprendimiento</Title>
      </Content>
    </Layout>
  );
}

export default Setup;
