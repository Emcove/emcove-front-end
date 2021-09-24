import React, { useState } from 'react';
import styled, { css } from 'styled-components'

import { colors } from '../../styles/palette';

import Icon from '../Icons';

const CarrouselContainer = styled.div`
  position: relative;
  display: flex;

  &:hover {
    cursor: pointer;
  }

  &:hover .direction-button {
    visibility: visible;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  position: relative;
  overflow: hidden;
  border: solid 1px rgba(0,0,0,0.05);
  background-color: ${colors.white};
  min-width: 100px;
  max-width: 100px;
  height: 80px;
  border-radius: 3px;

  ${props => props.width && css `
    min-width: ${props.width};
    max-width: ${props.width};
  `}

  ${props => props.height && css `
    height ${props.height};
  `}

  @media (max-width: 768px) {
    max-width: 49px;
    max-height: 135px;
  }
`;

const Preview = styled.img`
    height: 100%;
    max-width: 100%;
    width: auto;
    display: inline;
`;

const DirectionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  font-weight: 600;
  font-size: 10px;
  width: 14px;
  height: 14px;
  position: absolute;
  top: 40%;
  visibility: hidden;
  transition: visibility ease-in 0.3s;

  ${props => props.left && css `
    left: -4px;
    z-index: 3;
  `}

  ${props => props.right && css `
    right: -4px;
  `}

  ${props => props.buttonsWidth && css `
    width: ${props.buttonsWidth};
    height: ${props.buttonsWidth};
  `}
  
  &:hover {
    cursor: pointer;
  }
`;

const Carrousel = ({ images = [], width, height, buttonsWidth }) => {
  const [actual, setNewActual] = useState({ image: images[0], index: 0 });
  
  const updateActual = (direction) => {
    let newIndex = actual.index + direction;

    if (newIndex === -1) {
      newIndex = images.length - 1;
    } else if (newIndex === images.length) {
      newIndex = 0;
    }

    setNewActual({ image: images[newIndex], index: newIndex })
  }
  return (
    <CarrouselContainer>
      {images.length > 1 &&
      <DirectionButton
        left
        className="direction-button"
        onClick={() => updateActual(-1)}
        buttonsWidth={buttonsWidth}
      >
        {'<'}
      </DirectionButton>}
      <Container width={width} height={height}>
        {!actual.image && <Icon type="default-image" className="default-image__icon"/>}
        {actual.image &&
        <Preview
          src={actual.image}
          alt="preview"
        />}
      </Container>
      {images.length > 1 &&
      <DirectionButton
        right
        className="direction-button"
        onClick={() => updateActual(1)}
        buttonsWidth={buttonsWidth}
      >
        {'>'}
      </DirectionButton>
      }
    </CarrouselContainer>
  );
}

export default Carrousel;
