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
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: ${colors.white};
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

    &:active {
      border: none;
    }
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
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
      </Content>
    </Layout>
  );
}

export default Setup;
