import React from 'react';
/*
import { Form } from 'semantic-ui-react';
import { Component } from 'react';
*/
import { GenericForm } from './';

const RecoverForm = (props) => /*(
  <a>not implemented</a>
)*/(
  <GenericForm
    url="http://localhost:8000/api/auth/users/create/"
    fields={[
      {name:"username"},
      {name:"password", attrs:{
        "type": "password"
      }},
      {name:"email"},
      {name:"id", attrs:{
        "show": false,
        "read_only": false,
      }}
    ]}
  />
)

export default RecoverForm;
