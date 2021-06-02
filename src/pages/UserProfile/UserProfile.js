import React, { useState } from 'react';
import styled from 'styled-components';

import { useHistory } from "react-router-dom";

import Layout from "../../components/Layout";
import Link from "../../components/Link";
import ImageUploader from "../../components/ImageUploader";
import TextInput from "../../components/TextInput";
import Checkbox from "../../components/Checkbox";
import Snackbar from "../../components/Snackbar";

import UserData from '../../utils';
import Button from '../../components/Button';
import classNames from 'classnames';

const LinkContainer = styled.div`
  display: flex;
  width: 100%;
`;

const DataContainer = styled.div`
  width: 40%;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 32px;
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
`;

const ButtonContainer = styled.div`
  width: 40%;
  padding: 0 8px 0 0;
`;

const UserProfile = () => {
  const history = useHistory();
  const [userAvatar, setUserAvatar] = useState('');
  const [editState, setEditState] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Account Data
  const [email, setEmail] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [requiredEmail, setRequiredEmail] = useState(false);
  const [requiredEmailConf, setRequiredEmailConf] = useState(false);
  const [requiredPass, setRequiredPass] = useState(false);
  const [requiredPassConf, setRequiredPassConf] = useState(false);

  // Personal Data
  const [name, setName] = useState('');
  const [requiredName, setRequiredName] = useState('');
  const [surname, setsurname] = useState('');
  const [requiredSurname, setRequiredSurname] = useState('');
  const [city, setCity] = useState('');
  const [adult, setAdult] = useState(false);

  const setRequiredFields = () => {
    if (email === '') {
      setRequiredEmail(true);
    }

    if (emailConfirmation === '') {
      setRequiredEmailConf(true);
    }

    if (password === '') {
      setRequiredPass(true);
    }

    if (passwordConfirmation === '') {
      setRequiredPassConf(true);
    } 

    if (name === '') {
      setRequiredName(true);
    } 

    if (surname === '') {
      setRequiredSurname(true);
    } 
  }

  const saveChanges = () => {
    if (!UserData.hasEmptyRequiredFields([email, emailConfirmation, password, passwordConfirmation, name, surname])) {
      setEditState(false);
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 2000);
    }

    setRequiredFields();
  }

  return (
    <Layout className="user-profile">
      <LinkContainer>
        <Link onClick={() => history.push('/home')}>Volver al listado</Link>
      </LinkContainer>
      <DataContainer>
        <ImageContainer>
          <ImageUploader
            image={userAvatar}
            id="user-profile-pic"
            shape="round"
            label="Subir foto de perfil"
            onChange={setUserAvatar}
            iconClass="upload-logo__icon"
          />
        </ImageContainer>
        <InputGroup>
          <TextInput 
            id="name"
            label="Nombre"
            value={name}
            placeholder="Nombre"
            type="text"
            required={requiredName}
            onChange={setName}
            disabled={!editState}
          />
          <TextInput 
            id="surname"
            label="Apellido"
            value={surname}
            placeholder="Apellido"
            type="text"
            required={requiredSurname}
            onChange={setsurname}
            disabled={!editState}
          />
        </InputGroup>
        <InputGroup>
          <TextInput 
            id="localization"
            label="Localidad"
            value={city}
            placeholder="Localidad"
            type="text"
            onChange={setCity}
            disabled={!editState}
          />
          <Checkbox
            id="adultCheckbox"
            label="Soy mayor de 18 años"
            checked={adult}
            onClick={() => setAdult(!adult)}
            disabled={!editState}
          />
        </InputGroup>
        <InputGroup>
          <TextInput
            id="email"
            label="Correo electrónico"
            value={email}
            placeholder="Correo electrónico"
            type="email"
            onChange={setEmail}
            required={requiredEmail}
            disabled={!editState}
          />
          <TextInput 
            id="email-confirmation"
            label="Confirmar correo electrónico"
            value={emailConfirmation}
            placeholder="Confirmar correo electrónico"
            type="email"
            onChange={setEmailConfirmation}
            required={requiredEmailConf}
            disabled={!editState}
            className={classNames('confirmation-input', { 'confirmation-input__hidden': !editState, 'confirmation-input__visible': editState })}
          />
        </InputGroup>
        <InputGroup>
          <TextInput 
            id="password"
            label="Contraseña"
            value={password}
            placeholder="Contraseña"
            type="password"
            onChange={setPassword}
            required={requiredPassConf}
            disabled={!editState}
          />
          <TextInput 
            id="password"
            label="Confirmar contraseña"
            value={passwordConfirmation}
            placeholder="Confirmar contraseña"
            type="password"
            onChange={setPasswordConfirmation}
            required={requiredPass}
            disabled={!editState}
            className={classNames('confirmation-input', { 'confirmation-input__hidden': !editState, 'confirmation-input__visible': editState })}
          />
        </InputGroup>
        <ActionsContainer>
          <ButtonContainer>
           {!editState && <Button primary onClick={() => setEditState(true)}>Editar</Button>}
           {editState && <Button primary onClick={() => saveChanges()}>Guardar</Button>}
          </ButtonContainer>
          <ButtonContainer>
            {editState && <Button secondary onClick={() => setEditState(false)}>Cancelar</Button>}
          </ButtonContainer>
        </ActionsContainer>
      </DataContainer>
      <Snackbar type="success" message="Datos guardados con éxito" show={showSnackbar}/>
    </Layout>
  );
}

export default UserProfile;
