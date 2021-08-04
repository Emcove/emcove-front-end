import React, { useState } from "react";

import styled from "styled-components";

import Subtitle from "../../../components/Subtitle";
import Dropdown from "../../../components/Dropdown";
import Button from "../../../components/Button";

import { buildPossibleStatusForOrder } from "../utils";
import { colors } from "../../../styles/palette";

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
`;

const StatusUpdateComponent = ({ order, handleCancel, handleAccept }) => {
  const [selectedStatus, updateSelectedStatus] = useState();
  
  return (
    <ModalContent>
      <Subtitle fontSize="24px">Actualizar estado del pedido Nº {order.id}</Subtitle>
      <Text>Recibiste el pedido el {order.sendDate}</Text>
      {order.status[order.status.length - 1].name !== 'Pendiente' && <Text>Última actualización: {order.status[order.status.length - 1].dateChange} - {order.status[order.status.length - 1].name}</Text>}
      <Dropdown
        label="Próximo estado"
        placeholder="Seleccioná el próximo estado"
        options={buildPossibleStatusForOrder(order)}
        onClickOption={(status) => updateSelectedStatus(status)}
      />
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
          onClick={()=> handleAccept(selectedStatus)}
        >
          Aceptar
        </Button>
      </ButtonsContainer>
    </ModalContent>
  );
}

export default StatusUpdateComponent;
