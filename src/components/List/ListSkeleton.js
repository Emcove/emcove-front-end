import React from "react";
import styled, { css, keyframes } from "styled-components";

import { colors } from "../../styles/palette";
import Card from "../Card";

const pulse = keyframes`
  0% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 80px;
  ${props => props.height && css `
    height: ${props.height};
  `}
`;

const TextPlaceholder = styled.div`
  height: 18px;
  background-color: ${colors.skeletonGray};
  width: 30%;
  margin: 8px 0;
  border-radius: 4px;

  ${props => props.width && css `
    width: ${props.width};
  `}

  animation: ${pulse} 0.7s infinite alternate;
`;

const ImagePlaceholder = styled.div`
  min-width: 80px;
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-color: ${colors.skeletonGray};
  animation: ${pulse} 0.7s infinite alternate;

  ${props => props.squaredImage && css `
    width: 100px;
    border-radius: 3px;
  `}
`;

const TextPlaceholderContainer = styled.div`
  width: 100%;
  margin-left: 12px;
`;

const ListSkeleton = ({ height, businessList, squaredImage, tertiaryData }) => (
  <Container>
    <Card>
      <ListItem height={height}>
        {businessList && <ImagePlaceholder squaredImage />}
        <TextPlaceholderContainer>
          <TextPlaceholder width="30%" />
          <TextPlaceholder width="15%" />
        </TextPlaceholderContainer>
        {tertiaryData && <TextPlaceholder width="20%" />}
      </ListItem>
    </Card>
    <Card>
    <ListItem height={height}>
        {businessList && <ImagePlaceholder squaredImage />}
        <TextPlaceholderContainer>
          <TextPlaceholder width="30%" />
          <TextPlaceholder width="15%" />
        </TextPlaceholderContainer>
        {tertiaryData && <TextPlaceholder width="20%" />}
      </ListItem>
    </Card>
  </Container>
);
export default ListSkeleton;
