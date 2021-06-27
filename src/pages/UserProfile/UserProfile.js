import React, { useState } from 'react';
import styled from 'styled-components';

import { useHistory } from "react-router-dom";

import Layout from "../../components/Layout";
import Link from "../../components/Link";
import ImageUploader from "../../components/ImageUploader";
import TextInput from "../../components/TextInput";
import Checkbox from "../../components/Checkbox";
import Snackbar from "../../components/Snackbar";
import Card from "../../components/Card";
import Loading from "../../components/Loading";

import UserData from '../../utils';
import Button from '../../components/Button';
import classNames from 'classnames';

import UserService from "../../services/UserService";


const LinkContainer = styled.div`
  display: flex;
  width: 100%;
`;

const DataContainer = styled.div`
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
  width: 100%;
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
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const [avatar, setUserAvatar] = useState(loggedUser.avatar);
  const [editState, setEditState] = useState(false);
  const [snackbarData, setSnackbarData] = useState({});
  const [isLoading, setLoading] = useState(false);
  
  // Account Data
  const [email, setEmail] = useState(loggedUser.email);
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [requiredEmail, setRequiredEmail] = useState(false);
  const [requiredEmailConf, setRequiredEmailConf] = useState(false);
  const [requiredPass, setRequiredPass] = useState(false);
  const [requiredPassConf, setRequiredPassConf] = useState(false);

  // Personal Data
  const [name, setName] = useState(loggedUser.name);
  const [requiredName, setRequiredName] = useState('');
  const [surname, setsurname] = useState(loggedUser.surname);
  const [requiredSurname, setRequiredSurname] = useState('');
  const [city, setCity] = useState(loggedUser.city);
  const [adult, setAdult] = useState(loggedUser.adult);

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

  const hasEqualConfirmation = () => {
    if (email !== emailConfirmation) {
      setRequiredEmail(true);
      setRequiredEmailConf(true);
      setSnackbarData({type: "error", message:"El email y la confirmación del email no coinciden", show:true});
      setTimeout(() => {
        setSnackbarData({show:false});
      }, 1500);
      return false;
    }

    if (password !== passwordConfirmation) {
      setRequiredPass(true);
      setRequiredPassConf(true);
      setSnackbarData({type: "error", message:"La contraseña y la confirmación de la contraseña no coinciden", show:true});
      setTimeout(() => {
        setSnackbarData({show:false});
      }, 1500);
      return false;
    }
      return true;
  }

  const saveChanges = async () => {
    if (!UserData.hasEmptyRequiredFields([email, emailConfirmation, password, passwordConfirmation, name, surname]) && hasEqualConfirmation()) {
      setEditState(false);
      setRequiredEmail(false);
      setRequiredEmailConf(false);
      setRequiredPass(false);
      setRequiredPassConf(false);
      setRequiredName(false);
      setRequiredSurname(false);
      const data = {
        avatar,
        name,
        surname,
        city,
        adult,
        email,
        password
      };
      setLoading(true);

      const resp = await UserService.updateUserData(data);
      if(resp.status === 200){
        setSnackbarData({type: "success", message: "Datos guardados con éxito", show: true})
        setLoading(false);
        setTimeout(() => {
          setSnackbarData({show: false});
        }, 1500);
      }else{
        setSnackbarData({type: "error", message: "Error actualizando datos, contacte al administrador.", show: true});
        setLoading(false);
        setTimeout(() => {
          setSnackbarData({show: false});
        }, 1500);
      }
    }

    setRequiredFields();
  }

  return (
    <Layout className="user-profile">
      {isLoading && <Loading />}
      <LinkContainer>
        <Link onClick={() => history.push('/home')}>Volver al listado</Link>
      </LinkContainer>
      <DataContainer>
        <ImageContainer>
          <ImageUploader
            image={avatar}
            id="user-profile-pic"
            shape="round"
            label="Subir foto de perfil"
            onChange={setUserAvatar}
            iconClass="upload-logo__icon"
          />
        </ImageContainer>
        <Card vertical>
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
              id="emailConfirmation"
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
            {editState && 
            <TextInput 
              id="password"
              label="Contraseña"
              value={password}
              placeholder="Contraseña"
              type="password"
              onChange={setPassword}
              required={requiredPassConf}
              disabled={!editState}
            />}
            <TextInput 
              id="passwordConfirmation"
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
        </Card>
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
      <Snackbar type={snackbarData.type} message={snackbarData.message} show={snackbarData.show} />
    </Layout>
  );
}

export default UserProfile;
