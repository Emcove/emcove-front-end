import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { useHistory } from "react-router-dom";

import UserData from "../../utils";

import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Link from "../../components/Link";
import Modal from "../../components/Modal";
import FeedbackForm from "../../components/FeedbackForm";

import OrdersList from "./components/OrdersList";
import StatusUpdateComponent from "./components/StatusUpdateComponent";

import BusinessService from "../../services/BusinessService";


const Container = styled.div`
  width: 100%;
`;

const OrdersContainer = styled.div`
  width: 50%;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const BusinessOrders = () => {
  const history = useHistory();
  const user = UserData.getUserFromStorage();
  
  const [modalFeedbackVisible, setModalFeedbackVisible] = useState(false);
  const [evaluatedUser, setEvaluatedUser] = useState(null);

  const [orderStatusModal, setOrderStatusModalVisibility] = useState(false);
  const [evaluatedOrder, setEvaluatedOrder] = useState(null);

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
    setModalFeedbackVisible(true);
  };

  const onClickStatus = (order) => {
    const { status } = order;
    const currentStatus = status[status.length - 1].name;
    
    if (currentStatus === 'Cancelado' || currentStatus === 'Finalizado') {
      return null;
    }

    setEvaluatedOrder(order);
    setOrderStatusModalVisibility(true);
  };

  const updateOrderStatus = (newStatus) => {
    console.log('orden a actualizar:');
    console.log(evaluatedOrder);

    console.log('nuevo estado:');
    console.log(newStatus);

    setOrderStatusModalVisibility(false);
  };

  return (
    <Layout>
      <Container className="orders__container">
        <Link onClick={() => history.push('/home')}>Volver a la home</Link>
        <Title>Pedidos que recibí</Title>
        <OrdersContainer>
          <OrdersList
            orders={orders}
            onClickStatus={onClickStatus}
            openEvaluationModal={openEvaluationModal}
          />
        </OrdersContainer>
      </Container>
      <Modal open={modalFeedbackVisible} setVisibility={setModalFeedbackVisible}>
        {user && user.entrepreneurship &&
        <FeedbackForm
          evaluatedEntity={evaluatedUser}
          onClickCancel={() => setModalFeedbackVisible(false)}
          sendFeedback={BusinessService.registerFeedback}
          sender={user && user.username}
        />}
      </Modal>
      <Modal open={orderStatusModal} setVisibility={setOrderStatusModalVisibility}>
          {evaluatedOrder &&
            <StatusUpdateComponent
              order={evaluatedOrder}
              handleAccept={(newStatus) => updateOrderStatus(newStatus)}
              handleCancel={() => { setOrderStatusModalVisibility(false); setEvaluatedOrder(null); }}
            />
          }
      </Modal>
    </Layout>
  );
}

export default BusinessOrders;
