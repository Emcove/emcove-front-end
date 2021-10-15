import React, { useState } from "react";

import styled, { css } from "styled-components";

import Subtitle from "../../../components/Subtitle";
import Dropdown from "../../../components/Dropdown";
import Button from "../../../components/Button";

import { buildPossibleStatusForOrder } from "../utils";
import { colors } from "../../../styles/palette";
import OrderStatusEvolution from "../../../components/OrderStatusEvolution";

const ModalContent = styled.div`
  padding: 12px 0 40px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const Text = styled.div`
  color: ${colors.textColor};
  font-size: 16px;
  margin: 24px 0;

  ${props => props.item && css `
    font-weight: 500;
    margin: 0;
  `}
`;

const DeliveryPointsList = styled.div`
  
`;

const AddressItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: solid 1px ${colors.grayBorder};
  padding: 12px 0;
`;

const RadioButton = styled.div`
  height: 14px;
  width: 14px;
  border-radius: 100%;
  border: solid 1px ${colors.grayBorder};
  margin-right: 16px;

  &:hover {
    cursor: pointer;
  }

  ${props => props.selected && css `
    background-color: ${colors.primary};
  `}
`;

const StatusUpdateComponent = ({ order, handleCancel, handleAccept, deliveryPoints }) => {
  const [selectedStatus, updateSelectedStatus] = useState('');
  const [selectedAddressIdx, setSelectedAddressIdx] = useState(-1);

  return (
    <ModalContent>
      <Subtitle fontSize="24px">Actualizar estado del pedido Nº {order.id}</Subtitle>
      <Text>Recibiste el pedido el <strong>{order.createDate}</strong></Text>
      <OrderStatusEvolution orderTrackingData={order.orderTrackingData} />
      <Dropdown
        label="Próximo estado"
        placeholder="Elegí el próximo estado"
        options={buildPossibleStatusForOrder(order)}
        onClickOption={(status) => updateSelectedStatus(status)}
      />
      {selectedStatus === 'LISTO PARA ENTREGAR' && !!deliveryPoints.length &&
      <>
      <Text>Elegí la dirección en donde deben retirar el pedido:</Text>
      <DeliveryPointsList>
        { deliveryPoints.map((add, idx) => (
          <AddressItem>
            <RadioButton selected={selectedAddressIdx === idx} onClick={() => setSelectedAddressIdx(idx)} />
            <Text item>{add.address.street} {add.address.number}, {add.address.department} {add.address.state}</Text>
          </AddressItem>
        ))}
      </DeliveryPointsList>
      </>
      }
      <ButtonsContainer>
        <Button
          backgroundColor="transparent"
          color={colors.primary}
          large
          onClick={() => handleCancel()}
        >
          Cancelar
        </Button>
        <Button
          primary
          large
          onClick={()=> handleAccept(selectedStatus.replaceAll(' ', '_'), deliveryPoints[selectedAddressIdx].id)}
        >
          Aceptar
        </Button>
      </ButtonsContainer>
    </ModalContent>
  );
}

export default StatusUpdateComponent;
