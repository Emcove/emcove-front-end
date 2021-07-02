import React, { useEffect,useState } from 'react';
import styled from 'styled-components'
import { useHistory } from "react-router-dom";

import Layout from '../../components/Layout';
import Title from '../../components/Title';
import BusinessList from '../../components/List';
import BusinessListItem from '../../components/List/BusinessListItem';
import Icon from '../../components/Icons';
import Loading from '../../components/Loading';

import { colors } from '../../styles/palette';

import UserData from '../../utils/userData';
import BusinessService from '../../services/BusinessService';


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

const Home = () => {
  const [isLoading, setLoading] = useState(false);
  const [businessList, setBusiness] = useState([]);

  const history = useHistory();
  const userHasBusiness = UserData.hasBusiness();
  const user = UserData.getUserFromStorage();

  useEffect(() => {
    BusinessService.getAllBusiness().then(response => {
      setLoading(false);
      setBusiness(response.data);
    });
  },[]);

  return (
    
    <Layout>
      {isLoading && <Loading />}
      {!isLoading &&
      <>
      <Content>
        <Title>Emprendimientos</Title>
        <BusinessList businessList={businessList} />
        {user && !userHasBusiness && <AddBusinessButton onClick={() => history.push('/createBusiness')}>
          <Icon type="add" className="add-button__icon" />
        </AddBusinessButton>}
      </Content>
    </>
    }
    </Layout>
    
    
  );
}

export default Home;
