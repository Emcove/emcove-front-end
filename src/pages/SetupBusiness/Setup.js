import React, { useState, useRef } from 'react';
import styled from 'styled-components'

import { useHistory } from 'react-router-dom';

import Layout from '../../components/Layout';
import Icon from '../../components/Icons';
import Link from '../../components/Link';

import { colors } from '../../styles/palette';

const Content = styled.div`
  padding: 8px 8%;
  width: 100%;
`;

const Logo = styled.button`
  min-width: 100px;
  height: 100px;
  border-radius: 100%;
  border: dashed 1px ${colors.lightGray};
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

    &:hover {
      cursor: pointer;
    }
`;

const LogoUploader = styled.input`
    visibility: hidden;
    width: 0;          
    height: 0;
`;

const MiniLabel = styled.span`
  font-size: 12px;
  color: ${colors.lightGray};
`;

const NameInput = styled.input`
  width: 50%;
  border: none;
  border-bottom: solid 1px ${colors.lightGray};
  background-color: transparent;
  font-size: 32px;
  color: ${colors.textColor};
  margin-left: 24px;
  align-self: center;

  &:focus-visible {
    outline: none;
    border-bottom-color: #9BC53D;
  }
`; 

const Setup = () => {
  const history = useHistory();
  const inputLogoRef = useRef("logo");
  const [name, setName] = useState('');

  const handleLogoClick = (e) => {
    e.preventDefault();
    const input = inputLogoRef.current;

    // Simulo click en el input file, es simplemente para que se
    // haga click en la imagen del logo y no en un input feo de "cargar archivo"
    if (input) {
      input.click();
    }
  }

  const updateLogo = (event) => {
    console.log(event.currentTarget.value);
  }

  return (
    <Layout>
      <Content>
        <Link onClick={() => history.push("/home")}>Volver al listado</Link>
        <div className="setup-business__essentials">
          <Logo onClick={(e) => handleLogoClick(e)}>
            <Icon type="upload" className="upload-logo__icon" />
            <MiniLabel>Logo</MiniLabel>
          </Logo>
          <LogoUploader 
            type="file"
            accept="image/*"
            id="logo"
            data-required={false}
            onChange={updateLogo}
            ref={inputLogoRef}  
          />
          <div className="setup-business__name">
            <NameInput
              type="text"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Nombre de emprendimiento"
            />
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default Setup;
