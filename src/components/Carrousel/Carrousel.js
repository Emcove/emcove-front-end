import React, { useState } from 'react';
import styled, { css } from 'styled-components'

import { colors } from '../../styles/palette';

import Icon from '../Icons';

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
`;

const Preview = styled.img`
    height: 100%;
    max-width: 100%;
    width: fit-content;
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
`;

const Carrousel = ({ images }) => {
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
    <div>
      <DirectionButton onClick={() => updateActual(-1)}>
        {'<'}
      </DirectionButton>
      <Container>
        <Preview
          src={actual.image}
          alt="preview"
        />
      </Container>
      <DirectionButton onClick={() => updateActual(1)}>
        {'>'}
      </DirectionButton>
    </div>
  );
}

export default Carrousel;
