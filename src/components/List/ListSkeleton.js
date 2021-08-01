import React from "react";
import styled from "styled-components";

import { colors } from "../../styles/palette";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.div`
  width: 100%;
  height: 80px;
  border: solid 1px ${colors.grayBorder};
  border-radius: 6px;
`;

const ListSkeleton = () => (
  <Container>
    <ListItem />
    <ListItem />
  </Container>
);
export default ListSkeleton;
