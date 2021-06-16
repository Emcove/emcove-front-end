import React, { useEffect } from 'react';

import styled from 'styled-components';

import { useHistory, useLocation } from "react-router-dom";
import queryString from 'query-string';

import Layout from "../../components/Layout";
import Title from '../../components/Title';
import Link from '../../components/Link';

import CommentsList from './components/CommentsList';
import ReputationGraphic from './components/ReputationGraphic';

import { colors } from '../../styles/palette';

const Subtitle = styled.h2 `
  font-size: 18px;
  color: ${colors.textColor};
`;

const Container = styled.div`
  width: 100%;
`;

const EmptyMessage = styled.span`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.4);
`;


const Reputation = ({ username }) => {
  const location = useLocation();
  const history = useHistory();

  const { from } = queryString.parse(location.search);

  const reputation = {
    average: 3,
    comments: [{
      username: 'Messi',
      title: 'Messi',
      description: 'La verdad que la interaccion con este usuario messirve',
      commentValue: 5,
    }, {
      username: 'El kun',
      title: 'Malardo',
      description: 'Este chabon se la paso dando vueltas, no contestaba los mensajes y retrasó un montón la entrega',
      commentValue: 1,
    }, {
      username: 'Otro user',
      title: 'Estuvo bien',
      description: 'El proceso fue sencillo de llevar, el pedido se realizó con detalle',
      commentValue: 4,
    }, {
      username: 'Otro user 2',
      title: 'Estuvo bien',
      description: 'El proceso fue sencillo de llevar, el pedido se realizó con detalle pero tardó en responder',
      commentValue: 3,
    }, {
      username: 'Otro user 3',
      title: 'No lo recomiendo',
      description: 'No recomiendo aceptar pedidos de esta persona aunque la transacción se realizó con éxito fue muy dificil coordinar',
      commentValue: 2,
    }],
  };

  useEffect(() => {
    if (from === "nav-header") {
      // Get logged user reputation data
    } else {
      // get username reputation data 
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
        { !!reputation.comments.length && <CommentsList comments={reputation.comments} />}
        { reputation.comments.length === 0 && <EmptyMessage>{setEmptyMessage()}</EmptyMessage>}
      </Container>
    </Layout>
  );
}

export default Reputation;
