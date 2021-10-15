import React, { useState, useContext } from 'react';
import styled, { css } from 'styled-components';

import BusinessContext from '../../../context/Business';

import Modal from '../../../components/Modal';
import { colors } from '../../../styles/palette';
import Button from '../../../components/Button';
import Subtitle from '../../../components/Subtitle';

import step2Img from '../../../assets/step2fb.gif';

const Content = styled.div`
  margin-bottom: 32px;
`;

const Container = styled.div`
  flex-direction: column;
  width: 100%;
  display: none;
  margin-bottom: 32px;

  ${props => props.visible && css `
    display: flex;
  `}
`;

const Text = styled.span`
  font-size: 16px;
  color: ${colors.textColor};
  line-height: 1.6;

  ${props => props.steps && css `
    font-weight: bold;
  `}
`;

const ImagesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 24px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);
`;

const ImageContainer = styled.div`
  height: 300px;
`;

const Img = styled.img`
  height: 100%;
`;

const Link = styled.a`
  color: ${colors.primary};
  text-decoration: none;  
`;

const FacebookWizard = ({ visible, handleVisibility }) => {
  const { pageId, setPageId } = useContext(BusinessContext);
  const [step, setStep] = useState(1);

  return (
    <Modal open={visible} setVisibility={handleVisibility} minWidth="70%">
      <Content>
        <Subtitle>Agregar Facebook Messenger</Subtitle>
        <Container visible={step === 1}>
          <Text>Vamos a configurar Facebook Messenger para la página de tu emprendimiento.</Text>
          <Text>Primero, necesitás tener una página de Facebook de empresa. Si ya tenés, hacé click en "Listo".</Text>
          <Text>En caso de no tener, podés crear una desde <Link href="https://www.facebook.com/pages/creation/?ref_type=facebook_business_website" target="_blank" rel="noreferrer">acá.</Link></Text>
        </Container>

        <Container visible={step === 2}>
          <Text>Ahora necesitas agregar a nuestra página en "Dominios de la lista de autorizados".</Text>
          <Text>Llegás a esa parte así:</Text>
          <Text steps>{"Perfil de Facebook > Configuración (Barra lateral izquierda) > Mensajería avanzada"}</Text>
          <ImagesContainer>
            <ImageContainer>
              <Img src={step2Img} alt="step-2-gif" />
            </ImageContainer>
          </ImagesContainer>
        </Container>
        {step > 1 && <Button secondary onClick={() => setStep(step-1)}>Volver</Button>}
        <Button primary onClick={() => setStep(step+1)}>Listo</Button>
      </Content>
    </Modal>
  );
}

export default FacebookWizard;
