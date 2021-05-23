import React from 'react';
import styled from 'styled-components'

import Layout from '../../components/Layout';
import Title from '../../components/Title';
import List from '../../components/List';
import ListItem from '../../components/List/ListItem';

import { colors } from '../../styles/palette';

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

const AddBusinessButton = styled.button`
  position: absolute;
  top: calc(100vh - 64px - 70px);
  right: 3%;
  border-radius: 100%;
  border: none;
  width: 60px;
  height: 60px;
  background-color: ${colors.cyan};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);
  &:hover {
    cursor: pointer;
    background-color: #37A3D1;
    transition: background-color 0.2s ease-in;
  }
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
          <ListItem animated title="Emprendimiento 4" description="Descripción" />
          <ListItem animated title="Emprendimiento 4" description="Descripción" />
          <ListItem animated title="Emprendimiento 4" description="Descripción" />
          <ListItem animated title="Emprendimiento 4" description="Descripción" />
          <ListItem animated title="Emprendimiento 4" description="Descripción" />
        </List>
        <AddBusinessButton />
      </Content>
    </Layout>
  );
}

export default Home;
