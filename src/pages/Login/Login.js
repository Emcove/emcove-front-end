import React, { useState } from 'react';

import { useHistory } from "react-router-dom";

import Layout from "../../components/Layout"
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Link from "../../components/Link";


const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const redirect = (view) => {
    history.push(view);
  }

  return (
    <Layout login>
      <div className="login-container">
        <TextInput
          type="text"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <div className="login-inputs">
          <Button primary onClick={() => redirect('/home')}>Iniciar Sesión</Button>
          <Button secondary onClick={() => redirect('/home')}>Second</Button>
          <Link onClick={() => redirect('/registry')}>Registrarme</Link>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
