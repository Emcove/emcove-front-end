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
import OrdersFilter from "../../components/OrdersFilter";
import OrderDetail from "../../components/OrderDetail";

import OrdersList from "./components/OrdersList";
import StatusUpdateComponent from "./components/StatusUpdateComponent";

import BusinessService from "../../services/BusinessService";
import UserService from "../../services/UserService";
import { colors } from "../../styles/palette";

const Container = styled.div`
  width: 100%;
`;

const OrdersContainer = styled.div`
  width: 60%;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Text = styled.span`
  font-size: 16px;
  color: ${colors.textColor};
  margin: 0;
`;

const BusinessOrders = () => {
  const history = useHistory();
  const user = UserData.getUserFromStorage();

  const [orders, setOrders] = useState([]);
  
  const [modalFeedbackVisible, setModalFeedbackVisible] = useState(false);
  const [evaluatedUser, setEvaluatedUser] = useState(null);

  const [orderStatusModal, setOrderStatusModalVisibility] = useState(false);
  const [evaluatedOrder, setEvaluatedOrder] = useState(null);

  const [orderDetailModal, setOrderDetailModalVisibility] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    BusinessService.getBusinessOrders().then(response => {
      if (response.status === 200) {
        setOrders(response.data.sort((a, b) => {
          const arrayADate = a.updateDate.split('-');
          const arrayBDate = b.updateDate.split('-');
          
          return new Date(`${arrayBDate[2]}-${arrayBDate[1]}-${arrayBDate[0]}`) - new Date(`${arrayADate[2]}-${arrayADate[1]}-${arrayADate[0]}`);
        }));
      }
      setLoading(false);
    })
  }, []);

  const openEvaluationModal = (clientId) => {
    setEvaluatedUser(clientId);
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
        sortedOrders = orders.sort((a, b) => {
          const arrayADate = a.updateDate.split('-');
          const arrayBDate = b.updateDate.split('-');
          
          return new Date(`${arrayADate[2]}-${arrayADate[1]}-${arrayADate[0]}`) - new Date(`${arrayBDate[2]}-${arrayBDate[1]}-${arrayBDate[0]}`);
        });
        setOrders(sortedOrders);
      } else {
        sortedOrders = orders.sort((a, b) => {
          const arrayADate = a.updateDate.split('-');
          const arrayBDate = b.updateDate.split('-');
          
          return new Date(`${arrayBDate[2]}-${arrayBDate[1]}-${arrayBDate[0]}`) - new Date(`${arrayADate[2]}-${arrayADate[1]}-${arrayADate[0]}`);
        });
        setOrders(sortedOrders);
      }
      setLoading(false);
    }, 1000);
  };

  const updateOrderStatus = (newStatus, deliveryPointId, reason) => {
    const updatedOrders = [ ...orders ];
    setLoading(true);
    BusinessService.updateOrderStatus(evaluatedOrder.id, newStatus, deliveryPointId, reason).then(response => {
      if (response.status === 200) {
        updatedOrders.splice(orders.indexOf(evaluatedOrder), 1, response.data);
        setOrders(updatedOrders);
      }
      setLoading(false);
    });

    setOrderStatusModalVisibility(false);
  };

  const displayOrderDetail = (order) => {
    setEvaluatedOrder(order);
    setOrderDetailModalVisibility(true);
  };

  return (
    <Layout>
      <Container className="orders__container">
        <Link onClick={() => history.push('/home')}>Volver a la home</Link>
        <Title>Pedidos que recibí</Title>
        <OrdersContainer>
          <OrdersFilter filterOrders={filterOrdersByStatus} orderByDate={sortOrdersByDate} />
          {isLoading && <ListSkeleton businessList squaredImage tertiaryData />}
          {!isLoading && !!orders.length &&
          <OrdersList
            orders={orders}
            onClickStatus={onClickStatus}
            openEvaluationModal={openEvaluationModal}
            displayOrderDetail={displayOrderDetail}
          />}
          {!isLoading && !orders.length && <Text>No encontramos pedidos</Text>}
        </OrdersContainer>
      </Container>
      <Modal key="feedback-modal" open={modalFeedbackVisible} setVisibility={setModalFeedbackVisible}>
        {user && user.entrepreneurship && evaluatedUser &&
        <FeedbackForm
          evaluatedEntity={evaluatedUser}
          onClickCancel={() => setModalFeedbackVisible(false)}
          sendFeedback={UserService.registerFeedback}
          sender={user && user.entrepreneurship.name}
        />}
      </Modal>
      <Modal key="status-modal" open={orderStatusModal} setVisibility={setOrderStatusModalVisibility}>
        {evaluatedOrder &&
          <StatusUpdateComponent
            order={evaluatedOrder}
            handleAccept={(newStatus, deliveryPointId, reason) => updateOrderStatus(newStatus, deliveryPointId, reason)}
            handleCancel={() => { setOrderStatusModalVisibility(false); setEvaluatedOrder(null); }}
            deliveryPoints={evaluatedOrder.entrepreneurship.deliveryPoints}
          />
        }
      </Modal>
      <Modal key="order-detail-modal" open={orderDetailModal} setVisibility={setOrderDetailModalVisibility}>
        {evaluatedOrder && <OrderDetail order={evaluatedOrder}/>}
      </Modal>
    </Layout>
  );
}

export default BusinessOrders;
