import React from 'react';
import styled, { css } from 'styled-components';

import Icon from "../../../components/Icons";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const LevelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.5;

  + .reputation-graphic__level {
    margin-left: 16px;
  }

  ${props => props.actual && css `
    opacity: 1;
  `}
`;

const ReputationGraphic = ({ average }) => {
  const intAverage = parseInt(average);

  return (
    <Container className="reputation-graphic__container">
      <LevelContainer className="reputation-graphic__level" actual={intAverage === 1}>
        <Icon type="reputation-1" className="reputation-graphic__icon"/>
        {intAverage === 1 && <Icon type="pointing-triangle" className="reputation-graphic__pointer"/>}
      </LevelContainer>
      <LevelContainer className="reputation-graphic__level" actual={intAverage === 2}>
        <Icon type="reputation-2" className="reputation-graphic__icon"/>
        {intAverage === 2 && <Icon type="pointing-triangle" className="reputation-graphic__pointer"/>}
      </LevelContainer>
      <LevelContainer className="reputation-graphic__level" actual={intAverage === 3}>
        <Icon type="reputation-3" className="reputation-graphic__icon"/>
        {intAverage === 3 && <Icon type="pointing-triangle" className="reputation-graphic__pointer"/>}
      </LevelContainer>
      <LevelContainer className="reputation-graphic__level" actual={intAverage === 4}>
        <Icon type="reputation-4" className="reputation-graphic__icon"/>
        {intAverage === 4 && <Icon type="pointing-triangle" className="reputation-graphic__pointer"/>}
      </LevelContainer>
      <LevelContainer className="reputation-graphic__level" actual={intAverage === 5}>
        <Icon type="reputation-5" className="reputation-graphic__icon"/>
        {intAverage === 5 && <Icon type="pointing-triangle" className="reputation-graphic__pointer"/>}
      </LevelContainer>
    </Container>
  );
}

export default ReputationGraphic;
