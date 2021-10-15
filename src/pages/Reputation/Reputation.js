import React, { useEffect,useState } from 'react';
import ReactLoading from "react-loading";

import styled from 'styled-components';

import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

import Layout from "../../components/Layout";
import Title from '../../components/Title';
import Link from '../../components/Link';

import CommentsList from './components/CommentsList';
import ReputationGraphic from './components/ReputationGraphic';

import { colors } from '../../styles/palette';

import UserService from '../../services/UserService';

const Subtitle = styled.h2 `
  font-size: 18px;
  color: ${colors.textColor};
`;

const Container = styled.div`
  width: 100%;
`;

const Loading = styled.div`
  width: 100%;
  padding: 15% 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Reputation = ({ username }) => {
  const location = useLocation();
  const history = useHistory();
  const [reputation, setReputation] = useState({});
  const [isLoading, setLoading] = useState(true);
  const { from, id } = queryString.parse(location.search);

  useEffect(() => {
    async function fetchBusinessReputation(id) {      
      const response = await UserService.getBusinessReputation(id);
      return response;
    }

    async function fetchUserReputation() {
      const response = await UserService.getMyReputation();
      return response;
    }

    async function getUserReputation(username) {
      const response = await UserService.getUserReputation(username);
      return response;
    }

    switch(from) {
      case "nav-header":
        fetchUserReputation().then(response => {
          setLoading(false);
          setReputation(response.data);
        });
        break;
      case "business-detail":
        fetchBusinessReputation(id).then(response => {
          setLoading(false);
          setReputation(response.data);
          console.log(reputation.comments)
        });
        break;
      case "business-orders":
        getUserReputation(id).then(response => {
          setLoading(false);
          setReputation((response && response.data) || {})
        });
        break;
      default:
        fetchUserReputation().then(response => {
          setLoading(false);
          setReputation(response.data);
        });
        break;
    }

  }, [from, id]);
 
  const setPageSubtitle = () => {
    switch (from) {
      case 'nav-header': 
        return "Experiencia que otros usuarios tuvieron con vos";
      case 'orders-list':
        if (username) {
          return `Experiencia que otros usuarios tuvieron con ${username}`;
        }
        return "Experiencia que tuvieron otros usuarios";
      default:
        return "Experiencia que otros usuarios tuvieron con pedidos";
    }
  }

  const setEmptyMessage = () => {
    switch (from) {
      case 'nav-header': 
        return "Todavía no tenés comentarios, concretá pedidos con emprendedores y conseguí su opinión.";
      case 'orders-list':
        if (username) {
          return `Todavía no hay comentarios sobre ${username}`;
        }
        return "Sin comentarios";
      default:
        return "Todavía no tenés comentarios de otros usuarios";
    }
  }

  return (
    <Layout>
      <Container>
        {isLoading && 
          <Loading>
            <ReactLoading className="login-button__loading" type="spin" color={colors.primary} height="10%" width="10%" />
          </Loading>
        }
        { !isLoading &&
        <>
          <Link onClick={() => history.push('/home')}>Volver al listado</Link>
          <Title>Reputación</Title>
          <Subtitle>{setPageSubtitle()}</Subtitle>
          <ReputationGraphic average={reputation.averagePoints}/>
          <CommentsList comments={reputation.comments || []} wording={setEmptyMessage()} />
        </>
        }
      </Container>
    </Layout>
  );
}

export default Reputation;
