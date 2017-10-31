import React, { Component } from 'react';
import { Button, TextArea, List } from 'semantic-ui-react';

import { SERVER } from '../networkGenerics';

const ChatMessages = (props) => {

  const makeMessage = (msg, index) => (
    <List.Item key={index} className='max-width'>
      {
        msg.type === 'user' && <List.Content>
          <List.Header>{msg.username}</List.Header>
          <List.Description style={{'wordWrap': 'break-word'}}>{msg.content}</List.Description>
        </List.Content>
      }
      {
        msg.type === 'server' && <List.Content>
          <List.Description><i>{msg.content}</i></List.Description>
        </List.Content>
      }
    </List.Item>
  );

  return <List className='dynamic' style={{'minHeight': '0px', overflow:'auto'}}>
    {props.messages.map(makeMessage)}
  </List>
}

const Loading = (props) => {
  return <div className="dynamic" style={{'display':'flex', 'flexFlow': 'column'}}>
    <div className="dynamic"/>
    <div style={{'display': 'flex', 'flexFlow': 'row'}}>
      <div className="dynamic"/>
      Loading...
      <div className="dynamic"/>
    </div>
    <div className="dynamic"/>
  </div>
}


const ChatInput = (props) => {

  function onKeyPress (event) {
    if (event.key === 'Enter' && event.shiftKey === false)
    {
      event.preventDefault();
      props.onSubmit(event);
    }
  }

  var placeholder = (props.logged_in) ? "Allez, viens tchatcher !" : "Register to start chatting !";

  return <div className="fixed">
    <form onSubmit={props.onSubmit}>
    <TextArea
      placeholder={placeholder}
      value={props.value}
      onChange={props.onChange}
      style={{'resize':'none', 'padding':'14px', 'width': '100%'}}
      onKeyPress={onKeyPress}
    />
    <div style={{'display': 'flex', 'flexFlow': 'row unwrap'}}>
      <Button type='button' disabled className="fixed">Like</Button>
      <div className="dynamic"/>
      <Button type='submit' className="fixed" disabled={props.disabled}>Envoyer</Button>
    </div>
    </form>
  </div>
}

class LiveChatPanel extends Component {

  constructor (props) {
    super(props);

    this.state = {
      'messages' : [],
      'text': '',
      'connected': false
    };
  }

  componentDidMount () {
    this.props.user.socket.ready(() => {
      this.props.user.socket.on('chat-message', this.appendMessage)
      this.props.user.socket.emit('chat-join')
    })
  }

  componentWillUnmount () {
    this.props.user.socket.removeListener('chat-message', this.appendMessage)
  }

  appendMessage = (data) => {
    if (!this.state.connected)
      this.setState({'connected': true})
    this.setState({messages: this.state.messages.concat(data)})
  }

  handleChange = (event) => {
      this.setState({text: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.text !== '' && this.state.connected) {
      this.props.user.socket.emit('chat-message', {'content': this.state.text})
      this.setState({
        text: ''
      })
    }
  }

  render () {
    return <div id="live-chat-panel" className="max-height max-width">
      {
        (this.state.connected && <ChatMessages messages={this.state.messages}/>) ||
          <Loading/>
      }
      <ChatInput
        logged_in={this.props.user.logged_in}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        value={this.state.text}
        disabled={!this.state.connected}
      />
    </div>
  }
}

export default LiveChatPanel;
