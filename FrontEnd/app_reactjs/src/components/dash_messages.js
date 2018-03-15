import React, { Componet, Component } from 'react';
import axios from 'axios';
import adminLogo from '../assets/Crown.png';
import artistLogo from '../assets/TatMachine.png';
import shopLogo from '../assets/Building.png';
import clientLogo from '../assets/Clients.png';
import Messages from './dash_message-display';
import { Route, Link } from 'react-router-dom';
import { isAbsolute } from 'path';
const server = require('../config').server;


export default class Dash_Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {convos: [], user:[], selected: []};
  }

  selectMessage = (user, status) => {
    this.setState({
      selected: [user, status]
    })
  }

  componentDidMount() {
    axios.get(`${server}/user`, {headers: { token: window.localStorage.getItem('token')}})
    .then((r) => {
      axios.get(`${server}/messages/recieved`, {headers:{token:window.localStorage.getItem('token')}})
      .then((res) => { 
        this.setState((props) => {
          props.user = [r.data.user.username, r.data.user.status];
          console.log(this.props.user)
          if(res.data === 'No Messages') return props.convos = res.data;
          return props.convos = res.data.data.map((convo, i) => {
            const status = ['admin', 'shop', 'artist', 'client'];
            const statuslogo = [adminLogo, shopLogo, artistLogo, clientLogo];
            let logo = statuslogo[status.indexOf[String(convo.fromStatus)]];
            if(convo.fromStatus === 'admin') logo = adminLogo;
            if(convo.fromStatus === 'shop') logo = shopLogo;
            if(convo.fromStatus === 'artist') logo = artistLogo;
            if(convo.fromStatus === 'client') logo = clientLogo;
            console.log(statuslogo[status.indexOf[String(convo.fromStatus)]]);
            return (
                <div key={i} onClick={() => this.selectMessage(convo.from, convo.fromStatus)} style={{backgroundColor: '#757575', fontSize: 'calc(5px + 1vw)', color: 'white', textShadow: '1px 1px black', border: '1px solid black', alignItems: 'center', display: 'flex', height: 20, padding: '2%'}}>
                  <img style={{borderRadius: '100%', height:20, width:20, border: '1px solid black', marginRight: '1%'}} onError={(e) => e.target.src = 'https://techreport.com/forums/styles/canvas/theme/images/no_avatar.jpg'} src={`${server}/image/${convo.fromStatus}/${convo.from}/profile.jpg`}/>
                  {convo.from}
                  <img src={logo} style={{marginLeft: 5}} width='7%'/>  
                </div>
            );
          });
        });
      })
      .catch((err) => alert(err));
    });
    
  }
  render() {
    
    return (
      <div style={{width: '100%', display: 'flex', flexDirection: 'row', minWidth: '500px'}}>
        <div style={{backgroundColor:'#1C2833', textAlign: 'left', zIndex:1, position: 'relative', height: '100%', opacity: '0.9', width:'20%'}}>
        <div style={{backgroundColor: 'black', color: 'white', fontSize: 'calc(5px + 1vw)'}}> MESSAGES </div>
          {this.state.convos}
        </div>
        <div style={{width: '80%', height: ' 100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '#212F3C', borderLeft: '2px solid black', opacity: '0.9', position: 'relative', zIndex: 1}} >
          <div style={{display: 'flex', flexDirection: 'column', backgroundColor: 'red', height: '95%', width: '95%', alignSelf: 'center'}} >
            <Route path={`/dashboard/messages/`} component={() => <Messages user={this.state.user} sender={this.state.selected} />} />
          </div>

        </div>
      </div>
    );
  }
}