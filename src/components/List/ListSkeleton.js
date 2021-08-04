import React from "react";
import styled, { css } from "styled-components";

import { colors } from "../../styles/palette";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 80px;
  border: solid 1px ${colors.grayBorder};
  border-radius: 6px;
  margin-bottom: 8px;
  padding: 0 12px;
  ${props => props.height && css `
    height: ${props.height};
  `}
`;

const TextPlaceholder = styled.div`
  height: 18px;
  background-color: ${colors.lightGray};
  width: 30%;
  margin: 4px 0;

  ${props => props.width && css `
    width: ${props.width};
  `}
`;

const ListSkeleton = ({ height }) => (
  <Container>
    <ListItem height={height}>
      <TextPlaceholder width="20%" />
      <TextPlaceholder width="12%" />
    </ListItem>
    <ListItem height={height}>
      <TextPlaceholder width="20%" />
      <TextPlaceholder width="12%" />
    </ListItem>
  </Container>
);
export default ListSkeleton;
