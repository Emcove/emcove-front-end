import React, { useState } from "react";

import styled, { css } from "styled-components";

import { useHistory } from "react-router-dom";

import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Icon from "../../../components/Icons";

import { colors } from "../../../styles/palette";
import Carrousel from "../../../components/Carrousel/Carrousel";

const SingleOrder = styled.div`
  margin-bottom: 12px;

  &:hover {
    cursor: pointer;
  }
`;

const OrderData = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(70% - 12px);
  margin-left: 12px;

  @media (max-width: 768px) {
    width: 40%;
  }
`;

const Buyer = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.textColor};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const OrderDate = styled.span`
  font-size: 12px;
  color: ${colors.textColor};
  margin-bottom: 4px;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const Product = styled.p`
  font-size: 16px;
  color: ${colors.textColor};
  margin: 4px 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
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

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const OrderStatus = styled.div`
  display: flex;
  align-items: center;
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

  &:hover {
    cursor: pointer;
  }

  ${props => props.type === "PENDIENTE" && css`
    color: ${colors.warning};

    &:hover {
      background-color: ${colors.warningHover};
    }
  `}

  ${props => props.type === "RECHAZADO" && css`
    color: ${colors.error};

    &:hover {
      cursor: default;
    }
  `}
  
  ${props => props.type === "CANCELADO" && css`
    color: ${colors.error};

    &:hover {
      cursor: default;
    }
  `}

  ${props => props.type === "EN_PREPARACION" && css`
    color: ${colors.primary};

    &:hover {
      background-color: ${colors.primaryHover};
    }
  `}
  
  ${props => props.type === "ENTREGADO" && css`
    color: ${colors.primary};

    &:hover {
      cursor: default;
    }
  `}

  ${props => props.type === "LISTO_PARA_ENTREGAR" && css `
    color: ${colors.success};

    &:hover {
      background-color: ${colors.successHover};
    }
  `}

  @media (max-width: 768px) {
    font-size: 14px;
  }
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
  min-width: 160px;

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
  border-bottom: solid 1px ${colors.grayBorder};

  &:hover {
    cursor: pointer;
    background-color: ${colors.primaryHover};
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const OrderItem = ({ order, openEvaluationModal, onClickStatus, displayOrderDetail }) => {
  const history = useHistory();
  const [options, showOptions] = useState(false);

  const { updateDate, user, productSnapshot, currentState } = order;
  const images = productSnapshot.images.map(image => image.image);

  return (
    <SingleOrder>
      <Card alignment="flex-start">
        <Carrousel images={images} />
        <OrderData>
          <OrderDate>Última modificación {updateDate}</OrderDate>
          <Buyer>{user.name} {user.surname}</Buyer>
          <Product>{productSnapshot.productName}</Product>
          <PropertiesContainer>
            {productSnapshot.chosenProps.map(prop => 
              <ProductProps key={prop.name}>{prop.name}: {prop.chosenOption}</ProductProps>
            )}
          </PropertiesContainer>
        </OrderData>
        <>
        <OrderStatus>
          <Status
            type={currentState}
            onClick={() => onClickStatus(order)}
          >
            {currentState.replaceAll('_', ' ')}
          </Status>
          <MoreOptions>
            <Button backgroundColor="transparent" onClick={() => showOptions(!options)}>
              <Icon className="orders__more-options--icon" type="more-options"/>
            </Button>
            {options &&
              <Options>
                <OrderOption key="order-detail" onClick={() => { showOptions(!options); displayOrderDetail(order); }}>
                  Ver detalle del pedido
                </OrderOption>
                <OrderOption key="user-reputation" onClick={() => history.push(`/reputation?from=business-orders&id=${order.user.id}`)}>
                  Ver reputación de usuario
                </OrderOption>
                {(currentState === 'ENTREGADO' || currentState === 'CANCELADO' || currentState === 'RECHAZADO') &&
                  <OrderOption key="rate-user" onClick={() => { showOptions(!options); openEvaluationModal(order.user.id); }}>Calificar comprador</OrderOption>
                }
              </Options>
            }
          </MoreOptions>
        </OrderStatus>
        </>
      </Card>
    </SingleOrder>
  );
}

export default OrderItem;
