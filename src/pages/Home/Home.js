import React from 'react';
import styled from 'styled-components'

import Layout from '../../components/Layout';
import Title from '../../components/Title';
import List from '../../components/List';
import ListItem from '../../components/List/ListItem';

const Content = styled.div`
  width: 84%;
  max-width: 530px;
`;

const TertiaryTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const TertiaryDescription = styled.span`
  font-size: 13px;
  color: rgba(0, 0, 0, 0.4);
`;

const Home = () => {
  return (
    <Layout>
      <Content>
        <Title>Emprendimientos</Title>
        <List>
          <ListItem animated title="Emprendimiento 1" description="Descripción" />
          <ListItem animated title="Emprendimiento 2" description="Descripción" />
          <ListItem animated title="Emprendimiento 3" description="Descripción" />
          <ListItem animated title="Emprendimiento 4" description="Descripción" />
          <ListItem animated title="Emprendimiento 5" description="Descripción">
            <div className="home-page__complete-orders">
              <TertiaryTitle>2</TertiaryTitle>
              <TertiaryDescription>Encargos</TertiaryDescription>
              <TertiaryDescription>realizados</TertiaryDescription>
            </div>
          </ListItem>
        </List>
      </Content>
    </Layout>
  );
}

export default Home;
