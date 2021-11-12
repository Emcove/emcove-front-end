
import React from 'react';
import styled, { css } from 'styled-components';

import { colors } from '../../styles/palette';

const EvolutionContainer = styled.div`
  margin-bottom: 32px;
`;

const EvolutionGraphic = styled.div`
  width: 6px;
  margin-right: 12px;
  margin-top: 1px;

  background-color: ${colors.primary};

  ${props => props.length && css `
      height: ${`${props.length}px`};
  `}

  ${props => (props.type === 'LISTO_PARA_ENTREGAR' || props.type === 'ENTREGADO') && css `
    background-color: ${colors.success};
  `}
`;

const Status = styled.div`
  display: flex;
`;

const StatusText = styled.span`
  font-family: 'Raleway';
  font-size: 14px;
`;

const OrderStatusEvolution = ({ orderTrackingData }) => {
  const calculateGraphicLenght = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const auxDate = (date2 && new Date(date2)) || new Date();

    return 16 + Math.round(Math.abs((new Date(date1) - auxDate) / oneDay));
  }
  return (
    <EvolutionContainer>
    {orderTrackingData.map((status, index) => (
      <Status>
        <EvolutionGraphic type={status.state} length={calculateGraphicLenght(status.creationDate, orderTrackingData[index+1]?.creationDate)}/>
        <StatusText>{status.creationDate} - <strong>{status.state..replace(/_/g, " ")}</strong></StatusText>
      </Status>
    ))}
  </EvolutionContainer>
  );
}


export default OrderStatusEvolution;
