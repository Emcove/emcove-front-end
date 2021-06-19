import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import Link from "../Link";
import Icon from "../Icons";
import Title from "../Title";
import Button from "../Button";
import TextInput from "../TextInput";

import { colors } from "../../styles/palette";

import UserData from '../../utils';

const FormContainer = styled.div`
  margin: auto auto 60px auto;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

const LevelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: opacity ease-in 0.2s;
  opacity: 0.5;

  + .reputation-graphic__level {
    margin-left: 16px;
  }

  ${props => props.actual && css `
    opacity: 1;
  `}

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const ActionsContainer = styled.div`
  align-self: center;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const RequiredMessage = styled.span`
  font-size: 12px;
  color: ${colors.error};
  line-height: 3;
`;

const FeedbackForm = ({ evaluatedEntity, onClickCancel, sendFeedback }) => {
  const [reputationValue, setReputationValue] = useState(0);
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackDescription, setFeedbackDescription] = useState('');
  const [requiredTitle, setRequiredTitle] = useState(false);
  const [requiredLvl, setRequiredLevel] = useState(false);

  const sendUserReputation = async () => {
    const user = UserData.getUserFromStorage();

    if (reputationValue === 0) {
      return setRequiredLevel(true);
    }

    if (feedbackTitle === '') {
      return setRequiredTitle(true);
    }

    const data = {
      title: feedbackTitle,
      description: feedbackDescription,
      value: reputationValue,
      username: user && user.username,
      entityId: evaluatedEntity,
    };

    const resp = await sendFeedback(data);

    if(resp.status === 200){
      onClickCancel();
    }else{

    }
  }

  return (
    <FormContainer>
      <Title>¿Cómo fue tu experiencia con este pedido?</Title>
      <Container className="reputation-graphic__container">
        <LevelContainer className="reputation-graphic__level" actual={reputationValue === 1} onClick={() => setReputationValue(1)}>
          <Icon type="reputation-1" className="reputation-graphic__icon"/>
          {reputationValue === 1 && <Icon type="pointing-triangle" className="reputation-graphic__pointer"/>}
        </LevelContainer>
        <LevelContainer className="reputation-graphic__level" actual={reputationValue === 2} onClick={() => setReputationValue(2)}>
          <Icon type="reputation-2" className="reputation-graphic__icon"/>
          {reputationValue === 2 && <Icon type="pointing-triangle" className="reputation-graphic__pointer"/>}
        </LevelContainer>
        <LevelContainer className="reputation-graphic__level" actual={reputationValue === 3} onClick={() => setReputationValue(3)}>
          <Icon type="reputation-3" className="reputation-graphic__icon"/>
          {reputationValue === 3 && <Icon type="pointing-triangle" className="reputation-graphic__pointer"/>}
        </LevelContainer>
        <LevelContainer className="reputation-graphic__level" actual={reputationValue === 4} onClick={() => setReputationValue(4)}>
          <Icon type="reputation-4" className="reputation-graphic__icon"/>
          {reputationValue === 4 && <Icon type="pointing-triangle" className="reputation-graphic__pointer"/>}
        </LevelContainer>
        <LevelContainer className="reputation-graphic__level" actual={reputationValue === 5} onClick={() => setReputationValue(5)}>
          <Icon type="reputation-5" className="reputation-graphic__icon"/>
          {reputationValue === 5 && <Icon type="pointing-triangle" className="reputation-graphic__pointer"/>}
        </LevelContainer>
      </Container>
      {requiredLvl && <RequiredMessage>Elegí un valor</RequiredMessage>}
      <TextInput
        type="text"
        value={feedbackTitle}
        label="Título"
        placeholder="Título"
        id="feedbackTitle"
        onChange={setFeedbackTitle}
        required={requiredTitle}
      />
      <TextInput
        type="text"
        value={feedbackDescription}
        label="Descripción de la experiencia"
        placeholder="Contanos un poco más"
        id="feedbackDescription"
        onChange={setFeedbackDescription}
        multiline
      />
      <ActionsContainer>
        <Button primary onClick={() => sendUserReputation()}>Enviar</Button>
        <Link secondary onClick={onClickCancel}>Cancelar</Link>
      </ActionsContainer>
    </FormContainer>
  );
}

export default FeedbackForm;
