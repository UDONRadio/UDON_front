import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';


/*
** TODO: handle form submission errors
*/

class LoginForm extends Component {

  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onError = this.onError.bind(this);
    this.state = {
      'username':'',
      'password':'',
    }
  }

  onError (err) {
    console.log(err.message)
    console.log(err.response.body)
    const a = await err.response.json()
    console.log(a)
    console.log(a.username)
    console.log(a.password)
  }

  handleChange (e, { name, value }) {
      this.setState({ [name]: value });
  }

  handleSubmit () {
    this.props.login(this.state, this.onError);
  }

  render () {
    const { username, password } = this.state;

    return <Form onSubmit={this.handleSubmit}>
          <Form.Input placeholder='Username' name='username' value={username} onChange={this.handleChange}/>
          <Form.Input type='password' placeholder='Password' name='password' value={password} onChange={this.handleChange}/>
          <Form.Button content='Sign In'/>
        <a onClick={ (e) => {this.props.toggleRecover();} } style={{'cursor': 'pointer'}}>mot de passe oublie ?</a>
      </Form>
  }
}

export default LoginForm;
