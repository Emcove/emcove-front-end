import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { useHistory } from "react-router-dom";

import UserData from "../../utils";

import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Link from "../../components/Link";
import Modal from "../../components/Modal";
import FeedbackForm from "../../components/FeedbackForm";
import ListSkeleton from "../../components/List/ListSkeleton";

import OrdersList from "./components/OrdersList";
import StatusUpdateComponent from "./components/StatusUpdateComponent";

import BusinessService from "../../services/BusinessService";
import OrdersFilter from "../../components/OrdersFilter";

const Container = styled.div`
  width: 100%;
`;

const OrdersContainer = styled.div`
  width: 60%;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const BusinessOrders = () => {
  const history = useHistory();
  const user = UserData.getUserFromStorage();

  const [orders, setOrders] = useState([]);
  
  const [modalFeedbackVisible, setModalFeedbackVisible] = useState(false);
  const [evaluatedUser, setEvaluatedUser] = useState(null);

  const [orderStatusModal, setOrderStatusModalVisibility] = useState(false);
  const [evaluatedOrder, setEvaluatedOrder] = useState(null);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    BusinessService.getBusinessOrders().then(response => {
      if (response.status === 200) {
        setOrders(response.data.sort((a, b) => new Date(b.updateDate) - new Date(a.updateDate)));
      }
      setLoading(false);
    })
  }, []);

  const openEvaluationModal = (businessId) => {
    setEvaluatedUser(businessId);
    setModalFeedbackVisible(true);
  };

  const onClickStatus = (order) => {
    const { currentState } = order;
  
    if (currentState === 'CANCELADO' || currentState === 'FINALIZADO') {
      return null;
    }

    setEvaluatedOrder(order);
    setOrderStatusModalVisibility(true);
  };

  const filterOrdersByStatus = (status) => {
    setLoading(true);
    BusinessService.getBusinessOrders(status).then(response => {
      if (response.status === 200) {
        setOrders(response.data);
      }
      setLoading(false);
    });
  };

  const sortOrdersByDate = (asc) => {
    let sortedOrders;
    setLoading(true);

    setTimeout(() => {
      if (asc) {
        sortedOrders = orders.sort((order1, order2) => new Date(order1.updateDate) - new Date(order2.updateDate))
        setOrders(sortedOrders);
      } else {
        sortedOrders = orders.sort((order1, order2) => new Date(order2.updateDate) - new Date(order1.updateDate))
        setOrders(sortedOrders);
      }
      setLoading(false);
    }, 1000);
  };

  const updateOrderStatus = (newStatus) => {
    BusinessService.updateOrderStatus(evaluatedOrder.id, newStatus).then(response => {
      console.log(response);
    });

    setOrderStatusModalVisibility(false);
  };  

  return (
    <Layout>
      <Container className="orders__container">
        <Link onClick={() => history.push('/home')}>Volver a la home</Link>
        <Title>Pedidos que recibí</Title>
        <OrdersContainer>
          <OrdersFilter filterOrders={filterOrdersByStatus} orderByDate={sortOrdersByDate} />
          {isLoading && <ListSkeleton businessList squaredImage tertiaryData />}
          {!isLoading && orders.length &&
          <OrdersList
            orders={orders}
            onClickStatus={onClickStatus}
            openEvaluationModal={openEvaluationModal}
          />}
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
