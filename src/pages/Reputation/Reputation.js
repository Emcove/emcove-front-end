import React, { useEffect,useState } from 'react';

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
import UserData from '../../utils';

const Subtitle = styled.h2 `
  font-size: 18px;
  color: ${colors.textColor};
`;

const Container = styled.div`
  width: 100%;
`;

const Reputation = ({ username }) => {
  const location = useLocation();
  const history = useHistory();
  const [reputation, setReputation] = useState({});
  const { from } = queryString.parse(location.search);

  useEffect(() => {
    async function fetchReputation () {
      const response = await UserService.getMyBusinessReputation();
      return response;
    }

    async function fetchUserReputation () {
      const response = await UserService.getMyReputation();
      return response;
    }
  
    if (from === "nav-header") {
      fetchUserReputation().then(response => {
        setReputation(response.data);
      });
    } else if (from === "business-detail") {
      fetchReputation().then(response => {
        setReputation(response.data);
      });
    }
  }, [from, username]);
 
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
        <Link onClick={() => history.push('/home')}>Volver al listado</Link>
        <Title>Reputación</Title>
        <Subtitle>{setPageSubtitle()}</Subtitle>
        <ReputationGraphic average={reputation.average}/>
        <CommentsList comments={reputation.comments || []} wording={setEmptyMessage()} />
      </Container>
    </Layout>
  );
}

export default Reputation;
