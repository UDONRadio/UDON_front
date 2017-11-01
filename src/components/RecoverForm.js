import React from 'react';
/*
import { Form } from 'semantic-ui-react';
import { Component } from 'react';
*/
import { GenericForm } from './';

const RecoverForm = (props) => (
  <GenericForm
    url="http://localhost:8000/api/auth/users/create/"
    fields={[
      {name:"username"},
      {name:"password"},
      {name:"email"},
    ]}
  />
)

export default RecoverForm;
