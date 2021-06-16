import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { useHistory } from "react-router-dom";

import UserData from "../../utils";

import Button from "../../components/Button";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Link from "../../components/Link";
import Card from "../../components/Card";
import Icon from "../../components/Icons";

import { colors } from "../../styles/palette";

const Container = styled.div`
  width: 100%;
`;

const OrdersContainer = styled.div`
  width: 50%;
`;

const SingleOrder = styled.div`
  margin-bottom: 12px;
`;

const LogoContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
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

const BusinessName = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.textColor};
  margin-bottom: 4px;
`;

const Product = styled.span`
  font-size: 16px;
  color: ${colors.textColor};
`;

const OrderStatus = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Status = styled.span`
  font-size: 16px;
  font-weight: 600;
  text-align: right;
  color: ${colors.success};
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

const Orders = () => {
  const history = useHistory();
  const user = UserData.getUserFromStorage();
  
  const [options, showOptions] = useState(false);

  const orders = [{
    business: {
      image: undefined,
      name: 'Dulcinea',
    },
    product: {
      name: 'Torta decorada',
    },
    status: 'FINALIZADA',
  }];

  useEffect(() => {
    // get orders from userId
    console.log(user);
  });

  return (
    <Layout>
      <Container className="orders__container">
        <Link onClick={() => history.push('/home')}>Volver a la home</Link>
        <Title>Pedidos que hice</Title>
        <OrdersContainer>
          {orders.map(order => (
            <SingleOrder>
              <Card alignment="space-between">
                {order.business.images && 
                <LogoContainer>
                  <BusinessLogo
                    src={order.business.image}
                    alt="business logo"
                  />
                </LogoContainer>
                }
                <OrderData>
                  <BusinessName>{order.business.name}</BusinessName>
                  <Product>{order.product.name}</Product>
                </OrderData>
                <OrderStatus>
                  <Status>{order.status}</Status>
                  <Button backgroundColor="transparent" onClick={() => showOptions(!options)}>
                    <Icon className="orders__more-options--icon" type="more-options"/>
                  </Button>
                 {options &&
                    <Options>
                      <OrderOption>Calificar emprendimiento</OrderOption>
                    </Options>
                  }
                </OrderStatus>
              </Card>
            </SingleOrder>
          ))}
        </OrdersContainer>
      </Container>
    </Layout>
  );
}

export default Orders;
