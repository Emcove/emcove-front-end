
import React, { useRef } from 'react';
import styled, { css } from 'styled-components'

import Icon from '../Icons';

import { colors } from '../../styles/palette';

const InputContainer = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  position: relative;
  overflow: hidden;
  border: dashed 1px ${colors.lightGray};
  background-color: ${colors.white};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: rgba(0,0,0,0.015);
  }

  ${props => props.withImage && css `
    border: solid 1px rgba(0,0,0,0.05);
    transition: box-shadow .08s linear,min-width .15s cubic-bezier(0.4,0.0,0.2,1);
    
    &:hover {
      box-shadow:  0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
    }
  `}

  ${props => props.disabled && css `
    cursor: unset;
  `}

  ${props => props.shape === "round" && css `
    min-width: 132px;
    height: 132px;
    border-radius: 100%;
  `}

  ${props => props.shape === "squared" && css `
    min-width: 100px;
    max-width: 100px;
    height: 80px;
    border-radius: 3px;
  `}

  ${props => props.width && css `
    width: ${props.width};
  `}

  ${props => props.height && css `
    height: ${props.height};
  `}
`;

const ImageInput = styled.input`
  visibility: hidden;
  width: 0;          
  height: 0;
`;

const MiniLabel = styled.span`
  font-size: 12px;
  color: ${colors.lightGray};
`;

const Preview = styled.img`
  height: 100%;
  width: auto;
  display: inline;

  ${props => props.shape === "round" && css `
    max-width: 132px;
  `}

  ${props => props.shape === "squared" && css `
    max-width: 100%;
  `}
`;

const ImageUploader = ({ image, id, shape, label, onChange, disabled, iconClass, width, height }) => {
  const inputLogoRef = useRef(id);

  const handleInputClick = (e) => {
    e.preventDefault();
    const input = inputLogoRef.current;

    // Simulo click en el input file, es simplemente para que se
    // haga click en la imagen del logo y no en un input feo de "cargar archivo"
    if (input) {
      input.click();
    }
  }

  const updateImage = (event) => {
    const file = event.currentTarget.files[0];
    const reader = new FileReader();

    if (file) {
      reader.onload = () => {
        onChange(reader.result, inputLogoRef);
      };
  
      reader.readAsDataURL(file);
    }
  }

  return (
    <>
      <InputContainer
        shape={shape}
        onClick={(e) => handleInputClick(e)}
        withImage={!!image}
        width={width}
        height={height}
      >
          { !image && 
          <>
            <Icon type="upload" className={iconClass} />
            {label &&  <MiniLabel>{label}</MiniLabel>}
          </>
          }
          { image &&
            <Preview
              src={image}
              shape={shape}
              alt="business logo"
              className="logo-image"
            />
          }
        </InputContainer>
        <ImageInput 
          type="file"
          accept="image/*"
          id="logoInput"
          data-required={false}
          onChange={updateImage}
          ref={inputLogoRef}  
          disabled={disabled}
        />
    </>
  )
}


export default ImageUploader;
