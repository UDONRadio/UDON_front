import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';


/*
** TODO: handle form submission errors
*/

class LoginForm extends Component {

  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onError = this.onError.bind(this);
    this.genErrors.bind(this);
    this.state = {
      'username':'',
      'password':'',
      'loading': false,
      'form_errors': {},
    }
  }

  onError (response) {
    this.setState({'loading':false})
    if (response.status === 400) {
      this.setState({'form_errors': response.json})
      console.log(response.json);
    }
  }

  handleChange (e, { name, value }) {
      this.setState({ [name]: value });
  }

  handleSubmit () {
    this.setState({'loading': true})
    this.props.login(this.state, this.onError);
  }

  genErrors() {
    var arr = [];
    for (var key in this.state.form_errors) {
      arr.push({'name': key, 'reason': this.state.form_errors[key]})
    }
    return arr.map((field) => <Message key={field.name} error header={field.name} content={field.reason}/>)
  }

  render () {
    const { username, password } = this.state;

    return <Form onSubmit={this.handleSubmit} loading={this.state.loading} error={this.state.form_errors !== {}}>
          <Form.Input placeholder='Username' name='username' value={username} onChange={this.handleChange}/>
          <Form.Input type='password' placeholder='Password' name='password' value={password} onChange={this.handleChange}/>
          <Form.Button content='Sign In'/>
          {this.genErrors()}
        <a onClick={ (e) => {this.props.toggleRecover();} } style={{'cursor': 'pointer'}}>mot de passe oublie ?</a>
      </Form>
  }
}

export default LoginForm;
