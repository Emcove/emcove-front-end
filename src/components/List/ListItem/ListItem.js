
import React from 'react';
import styled, { css } from 'styled-components'

import { colors } from '../../../styles/palette';

const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  margin-bottom: 8px;
  border-radius: 4px;
  background-color: #fff;
  transition: box-shadow 0.2s ease-in-out;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);
  &:hover {
    cursor: pointer;
    box-shadow: 0 8px 16px 0 rgb(0 0 0 / 10%);
  }
`;

const Image = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 100%;
  background-color: ${colors.success};
  display: inline-table;
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

const ListItem = ({ children, title, description }) => {
  return (
    <Card>
      <Image>
      </Image>
      <ListGroup>
        <Content>
          <Title>
            {title}
          </Title>
          <Description>
            {description}
          </Description>
        </Content>
        <Content tertiary>
          {children}
        </Content>
      </ListGroup>
    </Card>
  )
}

export default ListItem;
