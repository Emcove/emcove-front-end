import React, { useEffect, useState } from "react";

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
import Snackbar from "../../components/Snackbar";

import { colors } from "../../styles/palette";

import BusinessService from "../../services/BusinessService"

const Container = styled.div`
  width: 100%;
`;

const OrdersContainer = styled.div`
  width: 50%;
`;

const SingleOrder = styled.div`
  margin-bottom: 12px;
`;

const ProductImageContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 12px;
`;

const ProductImage = styled.img`
  height: 100%;
  width: fit-content;
  display: inline;
  font-size: 12px;
`;

const OrderData = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const Buyer = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.textColor};
  margin: 0;
`;

const OrderDate = styled.span`
  font-size: 12px;
  color: ${colors.textColor};
  margin-bottom: 4px;
`;

const Product = styled.p`
  font-size: 16px;
  color: ${colors.textColor};
  margin: 4px 0;
`;

const PropertiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ProductProps = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.lightGray};
  margin: 4px 4px 4px 4px;
`;

const OrderStatus = styled.div`
  display: flex;
  align-items: center;
  width: 15%;
`;

const Status = styled.p`
  font-size: 16px;
  font-weight: 600;
  text-align: right;
  

  ${props => props.type === "Pendiente" && css`
    color: ${colors.warning};
  `}

  ${props => props.type === "Rechazado" && css`
    color: ${colors.error};
  `}
  
  ${props => props.type === "Cancelado" && css`
    color: ${colors.error};
  `}

  ${props => props.type === "Aprobado" && css`
    color: ${colors.success};
  `}
  
  ${props => props.type === "En progreso" && css`
    color: ${colors.success};
  `}
  
  ${props => props.type === "Finalizado" && css`
    color: ${colors.primary};
  `}
`;

const MoreOptions = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Options = styled.div`
  position: absolute;
  left: 22px;
  top: 12px;
  display: flex;
  flex-direction: column;
  border: solid 0.5px ${colors.grayBorder};
  background-color: ${colors.white};
  border-radius: 3px;
  transition: box-shadow 0.2s ease-in-out;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 4%);
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

const BusinessOrders = () => {
  const history = useHistory();
  const user = UserData.getUserFromStorage();
  
  const [options, showOptions] = useState(false);
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
    showOptions(false);
  }

  return (
    <Layout>
      <Container className="orders__container">
        <Link onClick={() => history.push('/home')}>Volver a la home</Link>
        <Title>Pedidos que recibí</Title>
        <OrdersContainer>
          {orders.map(order => (
            <SingleOrder key={order.id}>
              <Card alignment="flex-start">
                <ProductImageContainer>
                  <ProductImage
                    src={""}
                    alt="business logo"
                  />
                </ProductImageContainer>
                <OrderData>
                  <OrderDate>{order.sendDate}</OrderDate>
                  <Buyer>{order.user.name} {order.user.surname}</Buyer>
                  <Product>{order.product.name}</Product>
                  <PropertiesContainer>
                    {order.product.properties.map(prop => 
                      <ProductProps>{prop.name}: {prop.value}</ProductProps>
                    )}
                  </PropertiesContainer>
                </OrderData>
                <>
                <OrderStatus>
                  <Status type={order.status[order.status.length - 1].name}>{order.status[order.status.length - 1].name}</Status>
                  <MoreOptions>
                    <Button backgroundColor="transparent" onClick={() => showOptions(!options)}>
                      <Icon className="orders__more-options--icon" type="more-options"/>
                    </Button>
                    {options &&
                      <Options>
                        {order.status[order.status.length - 1].name !== 'Finalizado' && <OrderOption>Actualizar estado</OrderOption>}
                        {order.status[order.status.length - 1].name === 'Finalizado' &&
                          <OrderOption onClick={() => openEvaluationModal(order.business.id)}>Calificar comprador</OrderOption>
                        }
                      </Options>
                    }
                  </MoreOptions>
                </OrderStatus>
                </>
              </Card>
            </SingleOrder>
          ))}
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
