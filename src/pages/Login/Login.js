import React, { useState } from 'react';

import { useHistory } from "react-router-dom";

import Layout from "../../components/Layout"
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Link from "../../components/Link";
import Logo from "../../components/Logo";

import UserService from "../../services/UserService"
import Snackbar from '../../components/Snackbar/Snackbar';


const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [requiredUsername, setRequiredUsername] = useState(false);
  const [requiredPass, setRequiredPass] = useState(false);
  const [snackBarError, setSnackBarError] = useState(false)
  
  const redirect = (view) => {
    history.push(view);
  }

  const submitForm = () => {
    if (username !== '' && password !== '') {
      UserService.login(username,password).then( resp =>{
          if(resp){
            redirect("/home")
          }else{
            setSnackBarError(true)
            setTimeout(() => {
              setSnackBarError(false);
            }, 2000);
          }
        }
      )
    }
    
    if (username === '') {
      setRequiredUsername(true);
    }
    if (password === '') {
      setRequiredPass(true);
    }
  }

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
        <div className="login-button">
          <Button primary onClick={submitForm}>Iniciar Sesión</Button>
        </div>
        <div className="login-registry-section">
          <Link onClick={() => redirect('/registry')}>¿No tenés cuenta? Registrate</Link>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
