
import React from 'react';
import styled, { css } from 'styled-components'

import { colors } from '../../../styles/palette';

import Card from '../../Card';

const Image = styled.div`
  width: 56px;
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
    <Card animated>
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
