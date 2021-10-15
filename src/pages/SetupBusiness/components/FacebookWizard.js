import React, { useState, useContext } from 'react';
import styled, { css } from 'styled-components';

import BusinessContext from '../../../context/Business';

import Modal from '../../../components/Modal';
import { colors } from '../../../styles/palette';
import Button from '../../../components/Button';
import Subtitle from '../../../components/Subtitle';

import step2Img from '../../../assets/step2fb.gif';
import step3Img from '../../../assets/step3fb.gif';
import TextInput from '../../../components/TextInput';

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

const InputGroup = styled.div`
  margin-top: 24px;
  width: 60%;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const FacebookWizard = ({ visible, handleVisibility }) => {
  const { pageId, setPageId } = useContext(BusinessContext);
  const [step, setStep] = useState(pageId ? 3 : 1);

  const handleDoneClick = () => {
    if (step === 3) {
      setStep(1);
      handleVisibility(false);
    }
    
    setStep(step+1);
  }

  const closeModal = () => {
    setStep(1);
    handleVisibility(false);
  }

  return (
    <Modal open={visible} setVisibility={closeModal} minWidth="70%">
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

        <Container visible={step === 3}>
          <Text>Por último, necesitamos conocer el Identificador de tu página de Facebook, ese lo vas a encontrar acá:</Text>
          <Text steps>{'Perfil de Facebook > Click en botón "Ver más" > Información > Identificador de la página'}</Text>
          <ImagesContainer>
            <ImageContainer>
              <Img src={step3Img} alt="step-3-gif" />
            </ImageContainer>
          </ImagesContainer>
          <InputGroup>
            <Text>Una vez que encuentres tu Identificador, pegalo acá:</Text>
            <TextInput
              id="facebook_page_id"
              value={pageId}
              required={false}
              type="text"
              onChange={setPageId}
              placeholder="Identificador de página"
            />
          </InputGroup>
        </Container>

        <ButtonContainer>
          {step > 1 && <Button secondary onClick={() => setStep(step-1)}>Volver</Button>}
          <Button primary onClick={() => handleDoneClick()}>{step === 3 ? "Guardar" : "Listo"}</Button>
        </ButtonContainer>
      </Content>
    </Modal>
  );
}

export default FacebookWizard;
