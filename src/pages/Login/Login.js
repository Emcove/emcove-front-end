import React, { useState } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import ReactLoading from "react-loading";

import Layout from "../../components/Layout";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Link from "../../components/Link";
import Logo from "../../components/Logo";
import Snackbar from "../../components/Snackbar/Snackbar";

import { colors } from "../../styles/palette";

import AuthenticationService from "../../services/AuthenticationService";

AuthenticationService.logout();

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [requiredUsername, setRequiredUsername] = useState(false);
  const [requiredPass, setRequiredPass] = useState(false);
  const [snackBarError, setSnackBarError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const redirect = (view) => {
    history.push(view);
  };

  const submitForm = async () => {
    if (username !== '' && password !== '') {
      setIsLoading(true);

      const resp = await AuthenticationService.login(username,password);
       
      if (resp.status === 200) {
        redirect("/home");
      }else{
        setIsLoading(false); 
        setSnackBarError(true);
        setTimeout(() => {
          setSnackBarError(false);
        }, 2000);
      }    
    }

    if (username === '') {
      setRequiredUsername(true);
    }
    
    if (password === '') {
      setRequiredPass(true);
    }
  };

  return (
    <Layout login>
      <Snackbar
            type="error"
            show={snackBarError}
            message="Usuario o contraseña incorrectos"
          >
      </Snackbar>
      <div className="login-container">
        <Logo />
        <div className="login-inputs">
          <TextInput
            label="Nombre de usuario"
            placeholder="Nombre de usuario"
            type="username"
            value={username}
            required={requiredUsername}
            id="username"
            onChange={setUsername}
          />
          <TextInput
            label="Contraseña"
            placeholder="Contraseña"
            type="password"
            id="password"
            value={password}
            required={requiredPass}
            onChange={setPassword}
          />
        </div>
        <div className="login-button__container">
          <Button primary onClick={submitForm} className="login-button">
            {!isLoading && "Iniciar Sesión"}
            {isLoading && 
              <LoadingContainer>
                <ReactLoading className="login-button__loading" color={colors.white} height="20px" width="20px" />
              </LoadingContainer>
            }
          </Button>
        </div>
        <div className="login-registry-section">
          <Link onClick={() => redirect('/registry')}>¿No tenés cuenta? Registrate</Link>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
