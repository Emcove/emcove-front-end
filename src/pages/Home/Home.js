import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

import { useHistory } from "react-router-dom";

import Layout from '../../components/Layout';
import List from '../../components/List';
import ListItem from '../../components/List/ListItem';
import Icon from '../../components/Icons';
import Search from '../../components/Search';

import CategoriesFilter from './components';

import { colors } from '../../styles/palette';

import UserData from '../../utils/userData';

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListContainer = styled.div`
  margin-top: 132px;
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
  position: fixed;
  top: calc(100vh - 64px - 70px);
  right: 3%;
  border-radius: 100%;
  border: none;
  width: 60px;
  height: 60px;
  background-color: ${colors.white};
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
  transition: box-shadow .08s linear,min-width .15s cubic-bezier(0.4,0.0,0.2,1);
  &:hover {
    cursor: pointer;
    box-shadow: 0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%);
  }
`;

const SearchingBox = styled.div`
  position: fixed;
  padding-top: 32px;
  background-color: ${colors.background};
  width: 100%;
  transition: all 0.15s linear;
`;

const Home = () => {
  const categories = ['Belleza', 'Artesanal', 'Cocina', 'Servicios', 'Herramientas', 'Deco'];
  const history = useHistory();
  const userHasBusiness = UserData.hasBusiness();
  const user = UserData.getUserFromStorage();

  const [categoriesFilter, updateCategoriesFilter] =  useState(categories.map(cat => { return { name: cat, clicked: false }}));
  const [scrolled, updateScrolledStatus] = useState(0);

  const handleScroll = () => {
    const scroll = window.scrollY;
    console.log('asd');
    updateScrolledStatus(scroll);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    // Con esto hago que se filtren los emprendimientos cada vez que se clickea una categoria
    async function filterBusiness () {
      console.log(categoriesFilter.find(cat => cat.clicked === true));
    };

    filterBusiness();
  }, [categoriesFilter]);

  const searchBusiness = (key) => {
    // llamar a funcion para buscar emprendimientos
    console.log(key);
  }

  const handleCategoryClick = (category) => {
    updateCategoriesFilter(prevState => {
      const newFilteredCategories = prevState.map(cat => {
        if (cat.name === category.name) {
          return { name: cat.name, clicked: !category.clicked };
        }

        return cat;
      });

      return newFilteredCategories;
    });
  }
  
  return (
    <Layout>
      <Content>
        <SearchingBox className={`search-box${scrolled > 0 ? ' active' : ''}`}>
          <Search
            searchFunction={searchBusiness}
            placeholder="Buscar emprendimientos por nombre o productos"
          />
          <CategoriesFilter categories={categoriesFilter} onCategoryClicked={handleCategoryClick} />
        </SearchingBox>
        <ListContainer>
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
        </ListContainer>
        {user && !userHasBusiness && <AddBusinessButton onClick={() => history.push('/createBusiness')}>
          <Icon type="add" className="add-button__icon" />
        </AddBusinessButton>}
      </Content>
    </Layout>
  );
}

export default Home;
