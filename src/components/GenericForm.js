import React, { Component } from 'react';
import { Form, Popup } from 'semantic-ui-react';
import { request } from '../networkGenerics';

const makeField = (props) => {

  const form_types = {
    'email':'email',
    'string': 'text',
    'integer': 'number',
  }

  var input_attrs = {};
  input_attrs['type'] = form_types[props.attrs.type]
  if (input_attrs['type'] === 'text' && props.attrs.max_length)
    input_attrs['maxLength'] = props.attrs.max_length;

  const field = <Form.Field
    key={props.name}
    required={props.attrs.required}
    disabled={props.attrs.read_only}
  >

    <label>{props.attrs.label}</label>

    <input {...input_attrs} onChange={props.onChange}/>

  </Form.Field>


  if (props.attrs.help_text)
    return <Popup key={props.name}
      trigger={field}
      content={props.attrs.help_text}
    />
  else
    return field

}

class GenericForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      'options': null,
    }
  }

  componentDidMount () {
    const req = this.getRequest();
    req(this.props.url, {
      method: 'OPTIONS',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((options) => {
      this.setState({
        options: options,
      })
    }).catch((error) => {
      console.error(error)
    })
  }

  getRequest = () => (
    this.props.request || request
  )

  getActions = () => (
    this.state.options.actions[this.props.method || "POST"]
  )

  getFields = () => (
    this.props.fields || []
  )

  getFieldNames = () => {
    var names = {};
    this.getFields().forEach((item) => {
      names[item.name] = true;
    })
    for (var key in this.getActions()) {
      names[key] = true;
    }
    return Object.keys(names);
  }

  onChange = (name, value) => {
    this.setState({
      ['field_' + name]: value
    });
  }

  onError (response) {
    console.log(response)
    this.setState({'loading':false})
    if (response.status === 400) {
      this.setState({'form_errors': response.json})
    }
  }

  onSubmit = () => {
    /*console.log(this.getFieldNames())*/
  }

  makeFieldsArray = () => {
    var array = [];
    const actions = this.getActions();

    this.getFields().forEach((field) => {
      array.push(Object.assign({
        name: field.name,
        attrs: actions[field.name]
      }, field))
    })

    for (var key in actions) {
      if (!array.find((field) => field.name === key)) // eslint-disable-line no-loop-func
        array.push({
          name: key,
          attrs: actions[key]
        });
    }
    return array;
  }

  render () {
    return this.state.options && <Form onSubmit={this.onSubmit}>
      {
        this.makeFieldsArray().map((props) => ({
          onChange: this.onChange,
          value: this.state['field_' + props.name],
          ...props,
        })).map(makeField)
      }
      <Form.Button content={this.state.options.name}/>
    </Form>
  }

}

export default GenericForm;
