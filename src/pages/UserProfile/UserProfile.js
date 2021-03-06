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
import ConfirmationModal from "../../components/ConfirmationModal";
import Location from "../../components/Location";

import UserData from '../../utils';
import Button from '../../components/Button';
import classNames from 'classnames';

import UserService from "../../services/UserService";

import { colors } from "../../styles/palette";

const Container = styled.div`
  padding: 24px 0 0;

  @media (max-width: 768px) {
    padding: 24px 20px 0;
    width: 100%
  }
`;

const LinkContainer = styled.div`
  display: flex;
  width: 100%;
`;

const DataContainer = styled.div``;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px 0 20px;
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    padding: 16px 0 0;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const DeleteAccountButton = styled.button`
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  color: ${colors.error};
  font-weight: 300;
  font-size: 12px;
  align-self: center;
  font-family: 'Raleway';

  &:hover {
    cursor: pointer;
  }
`;

const UserProfile = () => {
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const history = useHistory();
  const [avatar, setUserAvatar] = useState(loggedUser?.avatar ||??'');
  const [editState, setEditState] = useState(false);
  const [snackbarData, setSnackbarData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [confirmationModal, setModalVisible] = useState(false);

  // Account Data
  const [email, setEmail] = useState(loggedUser?.email ||??'');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [requiredEmail, setRequiredEmail] = useState(false);
  const [requiredEmailConf, setRequiredEmailConf] = useState(false);
  const [requiredPass, setRequiredPass] = useState(false);
  const [requiredPassConf, setRequiredPassConf] = useState(false);
  const [username, setUsername] = useState(loggedUser?.username ||??'')
  const [requiredUsername, setRequiredUsername] = useState(false);

  // Personal Data
  const [name, setName] = useState(loggedUser?.name ||??'');
  const [requiredName, setRequiredName] = useState('');
  const [surname, setsurname] = useState(loggedUser?.surname ||??'');
  const [requiredSurname, setRequiredSurname] = useState('');
  const [city, setCity] = useState(loggedUser?.city ||??'');
  const [adult, setAdult] = useState(loggedUser?.adult ||??false);

  // Location
  const [locationModal, showLocationModal] = useState(false); 

  const emptyInputs = () => {
    setUserAvatar('');
    setEmail('');
    setUsername('');
    setName('');
    setsurname('');
    setCity('');
    setAdult(false);
  }

  const setRequiredFields = () => {
    if (email === '')??{
      setRequiredEmail(true);
    }

    if (emailConfirmation === '')??{
      setRequiredEmailConf(true);
    }

    if (password === '')??{
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

    if (username === '') {
      setRequiredUsername(true);
    } 
  }

  const hasEqualConfirmation = () => {
    if (email !== emailConfirmation)??{
      setRequiredEmail(true);
      setRequiredEmailConf(true);
      setSnackbarData({type: "error", message:"El email y la confirmaci??n del email no coinciden", show:true});
      setTimeout(() => {
        setSnackbarData({show:false});
      }, 1500);
      return false;
    }

    if (password !== passwordConfirmation)??{
      setRequiredPass(true);
      setRequiredPassConf(true);
      setSnackbarData({type: "error", message:"La contrase??a y la confirmaci??n de la contrase??a no coinciden", show: true});
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
      if (resp.status === 200) {
        setSnackbarData({type: "success", message: "Datos guardados con ??xito", show: true})
        setLoading(false);
        setTimeout(() => {
          setSnackbarData({show: false});
        }, 1500);
      } else {
        setSnackbarData({type: "error", message: "Error actualizando datos, intent?? m??s tarde.", show: true});
        setLoading(false);
        setTimeout(() => {
          setSnackbarData({show: false});
        }, 1500);
      }
    }

    setRequiredFields();
  }

  const deleteProfile = async () => {
    setLoading(true);
    const resp = await UserService.deleteUser(loggedUser.username);

    if (resp.status === 200) {
      setEditState(false);
      setSnackbarData({ type: "success", message: "Cuenta eliminada con exito", show: true });
      emptyInputs();
      setLoading(false);
      setTimeout(() => {
        setSnackbarData({show: false});
        history.push('/');
      }, 1500);
    } else {
      setSnackbarData({type: "error", message: "Error actualizando datos, intent?? m??s tarde.", show: true});
      setLoading(false);
      setTimeout(() => {
        setSnackbarData({show: false});
      }, 1500);
    }
  }

  const deleteClick = () => {
    setModalVisible(true);
  }

  const handleAcceptClick = () => {
    setModalVisible(false);
    deleteProfile();
  }

  return (
    <>
    {isLoading && <Loading />}
    <Layout className="user-profile">
      <ConfirmationModal
        title="Est??s por eliminar tu cuenta"
        message="??Est??s seguro de que quer??s hacerlo?"
        onAccept={handleAcceptClick}
        onCancel={setModalVisible} 
        isVisible={confirmationModal}
      />
      <Container>
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
          <LinkContainer className="delivery-points__button">
            <Link bold onClick={() => showLocationModal(true)}>Agregar/ver direcci??n de entrega</Link>
          </LinkContainer>
          <Card vertical>
            <InputGroup>
              <TextInput 
                id="username"
                label="Nombre de usuario"
                value={username}
                placeholder="Nombre de usuario"
                type="text"
                required={requiredUsername}
                onChange={setUsername}
                disabled={!editState}
                full
              />
            </InputGroup>
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
                full
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
                full
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
                full
              />
              <Checkbox
                id="adultCheckbox"
                label="Soy mayor de 18 a??os"
                checked={adult}
                onClick={() => setAdult(!adult)}
                disabled={!editState}
              />
            </InputGroup>
            <InputGroup>
              <TextInput
                id="email"
                label="Correo electr??nico"
                value={email}
                placeholder="Correo electr??nico"
                type="email"
                onChange={setEmail}
                required={requiredEmail}
                disabled={!editState}
                full
              />
              <TextInput 
                id="emailConfirmation"
                label="Confirmar correo electr??nico"
                value={emailConfirmation}
                placeholder="Confirmar correo electr??nico"
                type="email"
                onChange={setEmailConfirmation}
                required={requiredEmailConf}
                disabled={!editState}
                className={classNames('confirmation-input', { 'confirmation-input__hidden': !editState, 'confirmation-input__visible': editState })}
                full
              />
            </InputGroup>
            <InputGroup>
              {editState && 
              <TextInput 
                id="password"
                label="Contrase??a"
                value={password}
                placeholder="Contrase??a"
                type="password"
                onChange={setPassword}
                required={requiredPassConf}
                disabled={!editState}
                full
              />}
              <TextInput 
                id="passwordConfirmation"
                label="Confirmar contrase??a"
                value={passwordConfirmation}
                placeholder="Confirmar contrase??a"
                type="password"
                onChange={setPasswordConfirmation}
                required={requiredPass}
                disabled={!editState}
                className={classNames('confirmation-input', { 'confirmation-input__hidden': !editState, 'confirmation-input__visible': editState })}
                full
              />
            </InputGroup>
          </Card>
          <ActionsContainer>
            <ButtonContainer>
            {!editState && <Button primary onClick={() => setEditState(true)}>Editar</Button>}
            {editState && <Button primary onClick={() => saveChanges()}>Guardar</Button>}
            {editState && <Button secondary onClick={() => setEditState(false)}>Cancelar</Button>}
            </ButtonContainer>
            {editState && <DeleteAccountButton onClick={() => deleteClick()}>Eliminar cuenta</DeleteAccountButton>}
          </ActionsContainer>
        </DataContainer>
      </Container>
      <Snackbar type={snackbarData.type} message={snackbarData.message} show={snackbarData.show} />
      <Location visible={locationModal} closeModal={showLocationModal} limit={1} locations={loggedUser.deliveryPoints} />
    </Layout>
    </>
  );
}

export default UserProfile;
