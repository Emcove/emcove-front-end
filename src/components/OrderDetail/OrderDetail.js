
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../styles/palette';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  width: 100%;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OrderTitle = styled.h1`
  font-size: 24px;
  margin: 0 0 4px;
  color: ${colors.textColor};
`;

const OrderSubtitle = styled.h2`
  font-size: 20px;
  margin: 0 0 20px;
  color: ${colors.textColor};
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.grayBorder};
  margin: 16px 0 20px;
`;

const Text = styled.span`
  font-size: 14px;
  color: ${colors.textColor};
  margin: 4px 0 4px;
`;

const PropsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PropText = styled.span`
  font-size: 16px;
  color: ${colors.textColor};
  margin: 6px 0;
`;

const OrderDetail = ({ order }) => {
  const { id, product, createDate, updateDate, currentState, details, totalPrice, productSnapshot, user } = order;
  return (
    <Container>
      <OrderTitle>Pedido {id} - {product.name}</OrderTitle>
      <OrderSubtitle>Hecho por {user.name} {user.surname}</OrderSubtitle>
      <Text>Recibido el {createDate}</Text>
      <Text>Última actualización <strong>{updateDate}</strong> a <strong>{currentState.replaceAll('_', ' ')}</strong></Text>
      <Separator />
      <OrderSubtitle>Detalles</OrderSubtitle>
      <PropsContainer>
        {productSnapshot.chosenProps.map(prop => <PropText key={`${prop.name}-${prop.chosenOption}`}>{prop.name}: <strong>{prop.chosenOption}</strong></PropText>)}
        <PropText key="order-details">Aclaraciones: <strong>{details}</strong></PropText>
      </PropsContainer>
      {totalPrice &&
      <>
        <Separator />
        <Group>
          <Text>Precio total:</Text>
          <Text>{totalPrice}</Text>
        </Group>
      </>
      }
    </Container>
);
}


export default OrderDetail;
