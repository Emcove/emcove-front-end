import React, { useEffect } from 'react';

import styled from 'styled-components';

import { useHistory } from "react-router-dom";

import Layout from "../../components/Layout";
import Title from '../../components/Title';
import Link from '../../components/Link';
import Card from '../../components/Card';

import { colors } from '../../styles/palette';

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

const OrderStatus = styled.div``;

const Status = styled.span`
  font-size: 16px;
  font-weight: 600;
  text-align: right;
  color: ${colors.success};
`;

const Orders = () => {
  const history = useHistory();
  const { id: userId } = JSON.parse(localStorage.getItem('user'));

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
  });

  return (
    <Layout>
      <Container>
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
