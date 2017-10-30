import React, { Component } from 'react';
import { Button, TextArea, List } from 'semantic-ui-react';

import { SERVER } from '../networkGenerics';

const ChatMessages = (props) => {

  const makeMessage = (msg, index) => (
    <List.Item key={index} className='max-width'>
      <List.Content>
        <List.Header>{msg.user}</List.Header>
        <List.Description style={{'wordWrap': 'break-word'}}>{msg.content}</List.Description>
      </List.Content>
    </List.Item>
  );

  return <List className='dynamic' style={{'minHeight': '0px', overflow:'auto'}}>
    {props.messages.map(makeMessage)}
  </List>
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
      <Button type='submit' className="fixed">Envoyer</Button>
    </div>
    </form>
  </div>
}

class LiveChatPanel extends Component {

  constructor (props) {
    super(props);

    this.state = {
      'messages' : [],
      'username': null,
      'text': '',
    };
    this.socketbis = new WebSocket(SERVER.chat_url);
    this.socketbis.onmessage = function (e) {
      alert(e.data);
    }
    this.socketbis.onopen = () => {
      this.socketbis.send("hello world");
    }
    if (this.socketbis.readyState == WebSocket.OPEN) this.socketbis.onopen();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.user.username !== this.state.username) {
      /*
      ** NOTE: Might need to trigger a disconnect or something similar on node
      ** side when new username is empty
      */
      if (nextProps.user.username !== null)
        ;//this.socket.emit('change username', nextProps.user.username);
      else
        ;//this.socket.emit('logout');
      this.setState({
        username: nextProps.user.username
      });
    }
  }

  handleChange (event) {
      this.setState({text: event.target.value});
  }

  handleSubmit (event) {
    event.preventDefault();
    if (this.state.text === '')
      return ;

  }

  render () {
    return <div id="live-chat-panel" className="max-height max-width">
      <ChatMessages messages={this.state.messages}></ChatMessages>
      <ChatInput
        logged_in={this.props.user.logged_in}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        value={this.state.text}
      />
    </div>
  }
}

export default LiveChatPanel;
