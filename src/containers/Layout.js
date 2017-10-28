import React, { Component } from 'react';
import { Grid, Container, Menu } from 'semantic-ui-react';
import { PlayerPanel, UserManager } from './';
import { LiveChatPanel, UploadView } from './';
import { OnAirView, AboutView, AdmView, ReplayView, Logo, UserInfo } from '../components';
import { PLAYER_HEIGHT } from './PlayerPanel';


class Layout extends Component {
  /* This class manages global layout and navigation views */

  tabs = [
    {
      name: 'On Air',
      class: OnAirView,
      required: [],
      default: true,
    },
    {
      name: 'About',
      class: AboutView,
      required: [],
      default: false,
    },
    {
      name: 'Replays',
      class: ReplayView,
      required: [],
      default: false,
    },
    {
      name: 'Uploads',
      class: UploadView,
      required: ['is_adherent'],
      default: false,
    },
    {
      name: 'Adm',
      class: AdmView,
      required: ['is_staff'],
      default: false
    }
  ]

  constructor (props) {
    super(props);
    this.state = {
      current_tab_name: this.getDefaultTab().name,
    }
  }

  changeCurrentView = (new_tab) => {
    this.setState({current_tab_name: new_tab.name});
  }

  getDefaultTab = () => (
    this.tabs.find((tab) => tab.default)
  )

  tabCanShow = (tab) => {
    for (var i = 0; i < tab.required.length; i++) {
      if (tab.required[i] === 'is_staff' && !this.props.user.is_staff)
        return (false);
      if (tab.required[i] === 'is_adherent' && !this.props.user.is_adherent)
        return (false);
    }
    return (true);
  }

  getCurrentTab = () => {
    const current_tab = this.tabs.find((tab) => tab.name === this.state.current_tab_name);

    if (this.tabCanShow(current_tab))
      return (current_tab);
    else
      return (this.getDefaultTab());
  }

  render() {
    const CurrentTab = this.getCurrentTab();

    return (
      <div style={{'width': '100%', 'height': '100%'}}>
        <PlayerPanel/>
        <div
          style={{
            'position': 'absolute',
            'top': PLAYER_HEIGHT,
            'height': 'calc(100% - ' + PLAYER_HEIGHT + ')',
            'width': '100%',
            'paddingTop':'0px',
            'display': 'flex',
            'flexDirection': 'row',
            'flexWrap': 'nowrap',
            'overflow': 'hidden'
          }}
        >
          <div
            style={{
              'maxWidth': '210px',
              'flex': 'none',
              'zIndex': '1',
              'backgroundColor': 'bisque'
            }}
          >
            <Logo/>
            <Menu secondary vertical>
              {
                this.tabs.filter(this.tabCanShow).map((tab) => {
                  return <Menu.Item
                    name={tab.name}
                    active={tab.name === this.state.current_tab_name}
                    onClick={() => {
                        if (tab.name !== this.state.current_tab_name)
                          this.changeCurrentView(tab);
                    }}
                    key={tab.name}
                    style={{'textAlign':'center'}}
                  />
                })
              }
            </Menu>
            <UserInfo user={this.props.user}/>
          </div>
          <div style={{'flex': 'auto', 'zIndex': '0', 'backgroundColor':'beige'}}>
            <CurrentTab.class user={this.props.user}/>
          </div>
          <div style={{'flex': 'none', 'zIndex': '1', 'height': '100%', 'width': '340px', 'backgroundColor':'bisque'}}>
            <LiveChatPanel user={this.props.user}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
