import React from 'react';
import { GenericForm } from '../components';

const LoginForm = (props) => (
  <div>
    <GenericForm
      onSubmit={props.login}
      url={props.login_url}
      fields={[
        {name: "username", attrs: {
          required: true,
        }},
        {name: "password", attrs: {
          type: "password",
          required: true
        }}
      ]}
      name="Login"
    />
  <a
    onClick={ (e) => {props.toggleRecover();} }
    style={{'cursor': 'pointer'}}
  >mot de passe oublie ?
  </a>
  </div>
)

export default LoginForm;
