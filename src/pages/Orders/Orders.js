import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";

import styled, { css } from "styled-components";

import { useHistory } from "react-router-dom";

import UserData from "../../utils";

import Button from "../../components/Button";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Link from "../../components/Link";
import Card from "../../components/Card";
import Icon from "../../components/Icons";
import Modal from "../../components/Modal";
import FeedbackForm from "../../components/FeedbackForm";
import OrderDetail from "../../components/OrderDetail";

import { colors } from "../../styles/palette";

import UserService from '../../services/UserService';
import BusinessService from "../../services/BusinessService"


const Loading = styled.div`
  width: 100%;
  padding: 15% 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
`;

const OrdersContainer = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SingleOrder = styled.div`
  margin-bottom: 12px;
`;

const LogoContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 16px;
`;

const BusinessLogo = styled.img`
  height: 100%;
  width: fit-content;
  display: inline;
`;

const OrderData = styled.div`
  display: flex;
  flex-direction: column;
`;

const BusinessName = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.textColor};
  margin: 0 0 4px;
`;

const Product = styled.p`
  font-size: 16px;
  color: ${colors.textColor};
  margin: 0;
`;

const OrderStatus = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Status = styled.button`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  border: none;
  background-color: transparent;
  font-family: 'Raleway';
  padding: 6px 8px;
  border-radius: 4px;

  ${props => props.type === "PENDIENTE" && css`
    color: ${colors.warning};
  `}

  ${props => props.type === "RECHAZADO" && css`
    color: ${colors.error};
  `}
  
  ${props => props.type === "CANCELADO" && css`
    color: ${colors.error};
  `}

  ${props => props.type === "EN_PREPARACION" && css`
    color: ${colors.primary};
  `}
  
  ${props => props.type === "ENTREGADO" && css`
    color: ${colors.primary};
  `}

  ${props => props.type === "LISTO_PARA_ENTREGAR" && css `
    color: ${colors.success};
  `}

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Options = styled.div`
  position: absolute;
  top: 20px;
  left: 85%;
  display: flex;
  flex-direction: column;
  border: solid 0.5px ${colors.grayBorder};
  background-color: ${colors.white};
  border-radius: 3px;
  transition: box-shadow 0.2s ease-in-out;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 4%);

  @media (max-width: 768px) {
    left: 0;
    top: 33px;
  }
`;

const OrderOption = styled.div`
  padding: 12px 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.primary};

  &:hover {
    cursor: pointer;
    background-color: ${colors.primaryHover};
  }
`;

const Group = styled.div`
  display: flex;
`;

const Orders = () => {
  const history = useHistory();
  const user = UserData.getUserFromStorage();
  
  const [options, showOptions] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [evaluatedUser, setEvaluatedUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [orders, setOrders] = useState({});
  const [order, setOrder] = useState();

  useEffect(() => {
    async function fetchUserOrders() {
      const response = await UserService.getUserOrders();
      return response;
    }

    fetchUserOrders().then(response => {
      if(response.data.status === 500)
        setOrders([]);
      else {
        setOrders(response.data);
      }
      setLoading(false);
    });
  }, []);

  const openEvaluationModal = (businessId) => {
    setEvaluatedUser(businessId);
    setModalVisible(true);
    showOptions(false);
  }

  const openOrderDetailModal = (order) => {
    setOrder(order);
    setDetailModalVisible(true);
  }

  return (
    <Layout>
      <Container className="orders__container">
      {isLoading && 
          <Loading>
            <ReactLoading className="login-button__loading" type="spin" color={colors.primary} height="10%" width="10%" />
          </Loading>
        }
        { !isLoading &&
        <>
        <Link onClick={() => history.push('/home')}>Volver a la home</Link>
        <Title>Pedidos que hice</Title>
        <OrdersContainer>
          {!orders.length && <Product>No encontramos pedidos realizados en tu cuenta</Product>}
          {!!orders.length && orders.map(order => (
            <SingleOrder key={order.id}>
              <Card alignment="space-between" animated onClick={() => openOrderDetailModal(order)}>
                <Group>
                  {order.entrepreneurship.logo && 
                  <LogoContainer>
                    <BusinessLogo
                      src={order.entrepreneurship.logo}
                      alt="business logo"
                    />
                  </LogoContainer>
                  }
                  <OrderData>
                    <BusinessName>{order.entrepreneurship.name}</BusinessName>
                    <Product>{order.product.name}</Product>
                  </OrderData>
                </Group>

                <OrderStatus>
                  <Status type={order.currentState}>{order.currentState}</Status>
                  <Button  key={order.id} backgroundColor="transparent" onClick={(event) => { event.stopPropagation(); showOptions(!options); }}>
                    <Icon className="orders__more-options--icon" type="more-options"/>
                  </Button>
                 {options &&
                    <Options>
                      <OrderOption onClick={() => openEvaluationModal(order.entrepreneurship.id)}>Calificar emprendimiento</OrderOption>
                    </Options>
                  }
                </OrderStatus>
              </Card>
            </SingleOrder>
          ))}
        </OrdersContainer>
        </>
        }
      </Container>
      <Modal key="order-detail-modal" open={detailModalVisible} setVisibility={setDetailModalVisible}>
          {order && <OrderDetail order={order} buyerView={true} />}
      </Modal>
      <Modal open={modalVisible} setVisibility={setModalVisible}>
        <FeedbackForm
          evaluatedEntity={evaluatedUser}
          onClickCancel={() => setModalVisible(false)}
          sendFeedback={BusinessService.registerFeedback}
          sender={user.username}
        />
      </Modal>
    </Layout>
  );
}

export default Orders;
