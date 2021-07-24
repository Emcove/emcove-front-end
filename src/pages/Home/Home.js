import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { useHistory } from "react-router-dom";

import Layout from '../../components/Layout';
import Title from '../../components/Title';
import BusinessList from '../../components/List';
import Icon from '../../components/Icons';
import Search from '../../components/Search';
import Loading from '../../components/Loading';

import CategoriesFilter from './components';

import { colors } from '../../styles/palette';

import UserData from '../../utils/userData';
import BusinessService from '../../services/BusinessService';


const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListContainer = styled.div`
  margin-top: 56px;
  width: 84%;
  max-width: 530px;

  @media (max-width: 768px) {
    width: 100%;
  }
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
  const [isLoading, setLoading] = useState(true);
  const [businessList, setBusiness] = useState([]);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  },[]);

  const handleScroll = () => {
    const scroll = window.scrollY;
    updateScrolledStatus(scroll);
  };

  useEffect(() => {
    // Con esto hago que se filtren los emprendimientos cada vez que se clickea una categoria
    async function filterBusiness () {
      const data = {
        name:encodeURI(searchText),
        productName:encodeURI(searchText),
        categories: categoriesFilter.filter(cat => cat.clicked === true).map(c => c.name.toUpperCase()),
      }
    
      setLoading(true);
      BusinessService.getAllBusiness(data).then(response => {
        setLoading(false);
        if (response) setBusiness(response.data);
      });
    };

    filterBusiness();
  }, [categoriesFilter, searchText]);

  const searchBusiness = async (key) => {
    console.log("search");
    const data = {
      categories: categoriesFilter.filter(cat => cat.clicked === true).map(c => c.name.toUpperCase()),
      name: encodeURI(key),
      productName: encodeURI(key),
    }
  
    setLoading(true);
    BusinessService.getAllBusiness(key && data).then(response => {
      setLoading(false);
      console.log(response.data);
      setBusiness(response.data);
    });
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
        <Title>Emprendimientos</Title>
        
        <SearchingBox className={`search-box${scrolled > 0 ? ' active' : ''}`}>
          <Search
            searchFunction={searchBusiness}
            placeholder="¿Qué estás buscando?"
            searchText={searchText}
            updateSearchText={setSearchText}
          />
          <CategoriesFilter categories={categoriesFilter} onCategoryClicked={handleCategoryClick} />
        </SearchingBox>
        {isLoading && <Loading />}
         <ListContainer>
          {!isLoading && businessList && <BusinessList businessList={businessList} />}
        </ListContainer>
        {user && !userHasBusiness && <AddBusinessButton onClick={() => history.push('/createBusiness')}>
          <Icon type="add" className="add-button__icon" />
        </AddBusinessButton>}
      </Content>
    </Layout>
    
    
  );
}

export default Home;
