import React from 'react';
import { GenericForm } from '../components';

const RegisterForm = (props) => (
  <GenericForm
    onSubmit={props.register}
    url={props.register_url}
    fields={[
      {name: "username", attrs: {
        required: true,
      }},
      {name: "password", attrs: {
        type: "password",
        required: true
      }},
      {name: "id", attrs: {
        "show": false,
      }}
    ]}
    name="Login"
  />
)

export default RegisterForm;
