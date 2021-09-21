
import React from 'react';
import styled, { css } from 'styled-components'
import { useHistory } from "react-router-dom";

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

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Description = styled.span`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ListGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BusinessListItem = ({ business }) => {
  const history = useHistory();
  console.log(business);

  const { name, logo, city, reputation, categories } = business;
  return (
    <div onClick={() => history.push(`/business/${name}`)} className="business-list__item">
    <Card animated>
      <ImageContainer>
        {logo && <Image src={logo} />}
        {!logo && <Icon type="default-image" className="default-logo-list" />}
      </ImageContainer>
      <ListGroup>
        <Content>
          <Title>
            {name}
          </Title>
          <Description>
            {city}
          </Description>
          <CategoriesList categories={categories.map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())}/>
        </Content>
        <Content tertiary>
          <Icon className="reputation-icon" type={`reputation-${Math.round(reputation.averagePoints)}`} />
        </Content>
      </ListGroup>
    </Card>
    </div>
  )
}

export default BusinessListItem;
