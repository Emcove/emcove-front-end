import React, { useEffect, useState } from "react";

import styled, { css } from "styled-components";

import { useHistory } from "react-router-dom";

import UserData from "../../utils";

import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Link from "../../components/Link";
import Modal from "../../components/Modal";
import FeedbackForm from "../../components/FeedbackForm";

import BusinessService from "../../services/BusinessService"
import OrdersList from "./components/OrdersList";

const Container = styled.div`
  width: 100%;
`;

const OrdersContainer = styled.div`
  width: 50%;
`;

const BusinessOrders = () => {
  const history = useHistory();
  const user = UserData.getUserFromStorage();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [evaluatedUser, setEvaluatedUser] = useState(null);

  const orders = [{
    id: 8,
    sendDate: "17/07/2021",
    user: {
      username: 'PauloDybala',
      name: 'Paulo',
      surname: 'Dybala',
      id: 8,
    },
    product: {
      name: 'Muffin',
      properties: [{
        name: "Sabor",
        value: "Chocolate",
      }, {
        name: "Cobertura",
        value: "Crema de manteca",
      }, {
        name: "Relleno",
        value: "Mermelada de frutilla",
      }],
      quantity: 12,
    },
    status: [{
      dateChange: "17/07/2021",
      name: "Pendiente",
    }],
  }, {
    id: 7,
    sendDate: "14/07/2021",
    user: {
      username: 'GerardP',
      name: 'Gerard',
      surname: 'Piqué',
      id: 6,
    },
    product: {
      name: 'Galletita',
      properties: [{
        name: "Sabor",
        value: "Vainilla",
      }, {
        name: "Cobertura",
        value: "Masapán",
      }, {
        name: "Forma",
        value: "Pelota",
      }],
      quantity: 6,
    },
    status: [{
      dateChange: "14/07/2021",
      name: "Pendiente",
    }, {
      dateChange: "17/07/2021",
      name: "Aprobado",
    }],
  },{
    id: 5,
    sendDate: "10/07/2021",
    user: {
      username: 'messi1',
      name: 'Lionel',
      surname: 'Messi',
      id: 4,
    },
    product: {
      name: 'Torta decorada',
      properties: [{
        name: "Sabor",
        value: "Vainilla",
      },
      {
        name: "Relleno",
        value: "Dulce de leche",
      }],
      quantity: 1,
    },
    status: [{
      dateChange: "10/07/2021",
      name: "Pendiente",
    }, {
      dateChange: "13/07/2021",
      name: "Aprobado",
    }, {
      dateChange: "17/07/2021",
      name: "Finalizado",
    }],
  }];

  useEffect(() => {
    // get orders from business
    console.log(user);
  });

  const openEvaluationModal = (businessId) => {
    setEvaluatedUser(businessId);
    setModalVisible(true);
  }

  return (
    <Layout>
      <Container className="orders__container">
        <Link onClick={() => history.push('/home')}>Volver a la home</Link>
        <Title>Pedidos que recibí</Title>
        <OrdersContainer>
          <OrdersList orders={orders} openEvaluationModal={openEvaluationModal} />
        </OrdersContainer>
      </Container>
      <Modal open={modalVisible} setVisibility={setModalVisible}>
        {user && user.entreprernship &&
        <FeedbackForm
          evaluatedEntity={evaluatedUser}
          onClickCancel={() => setModalVisible(false)}
          sendFeedback={BusinessService.registerFeedback}
          sender=""
        />}
      </Modal>
    </Layout>
  );
}

export default BusinessOrders;
