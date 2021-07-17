
import React from 'react';
import styled, { css } from 'styled-components'

import { colors } from '../../../styles/palette';

import Card from '../../Card';
import CategoriesList from '../../CategoriesList';
import Icon from '../../Icons';

const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-color: transparent;
  display: inline-table;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  position: relative;
  overflow: hidden;
  border: solid 1px rgba(0,0,0,0.05);
  background-color: ${colors.white};
  min-width: 80px;
  max-width: 80px;
  height: 80px;
  border-radius: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 12px;
  ${props => props.tertiary && css`
    align-items: flex-end;
  `}
`;

const Title = styled.h3`
  font-weight: bold;
  font-size: 18px;
  margin: 0 0 8px;
  color: ${colors.textColor};
`;

const Description = styled.span`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.4);
`;

const ListGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// const TertiaryTitle = styled.span`
//   font-size: 20px;
//   font-weight: 600;
// `;

// const TertiaryDescription = styled.span`
//   font-size: 13px;
//   color: rgba(0, 0, 0, 0.4);
// `;

const BusinessListItem = ({ business }) => {
  return (
    <Card animated >
      <ImageContainer>
        {business.logo && <Image src={business.logo} />}
        {!business.logo && <Icon type="default-image" className="default-logo-list" />}
      </ImageContainer>
      <ListGroup>
        <Content>
          <Title>
            {business.name}
          </Title>
          <Description>
            {business.city}
          </Description>
          <CategoriesList categories={business.categories.map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())}/>
        </Content>
        <Content tertiary>
          {/* Esto lo dejé porque lo habías hecho vos antes por si en un futuro lo usas
          <div className="home-page__complete-orders">
            <TertiaryTitle>2</TertiaryTitle>
            <TertiaryDescription>Encargos</TertiaryDescription>
            <TertiaryDescription>realizados</TertiaryDescription>
          </div>
          */}
        </Content>
      </ListGroup>
    </Card>
  )
}

export default BusinessListItem;
