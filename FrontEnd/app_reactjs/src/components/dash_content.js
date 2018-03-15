import React, { Component } from 'react';
import { Dash_Messages} from '../components';
import { Route } from 'react-router-dom';
import logo from  '../assets/Logo_INKBook.png';
import axios from 'axios';
const server = require('../config').server;

class Admin extends Component {
  constructor() {
    super();
    this.state = {user:[]};
  }

  componentDidMount() {
    axios.get(`${server}/user`, {headers:{token: window.localStorage.getItem('token')}})
    .then((res) => {
      this.setState({
        user: [res.data.user.username, res.data.user.status]
      })
    })
  }
  render() {
    return (
      <div style={{backgroundColor:'black', opacity: '1', display: 'flex', justifyContent: 'center', zIndex: 2, alignSelf: 'center', flexFlow: 'wrap', height: '100%', width: '100%', borderRadius: 5, height: '92%'}} >
        <Route path='/dashboard/messages' component={Dash_Messages}/>
        <img id='dashboard_background-img' src={logo} />
      </div>
    );
  }
}
class Shop extends Component {
  render() {
    return (
      <div style={{backgroundColor:'black', opacity: '1', zIndex: 2, alignSelf: 'center', width: '98%', borderRadius: 5, height: '92%'}} >

      </div>
    );
  }
}
class Artist extends Component {
  render() {
    return (
      <div style={{backgroundColor:'black', opacity: '1', display: 'flex', justifyContent: 'center', zIndex: 2, alignSelf: 'center', flexFlow: 'wrap', height: '100%', width: '100%', borderRadius: 5, height: '92%'}} >
        <Route path='/dashboard/messages' component={Dash_Messages}/>
        <img id='dashboard_background-img' src={logo} />
      </div>
    );
  }
}
class Client extends Component {
  render() {
    return (
      <div style={{backgroundColor:'black', opacity: '1', zIndex: 2, alignSelf: 'center', width: '98%', borderRadius: 5, height: '92%'}} >

      </div>
    );
  }
}

export {
  Admin,
  Shop,
  Artist,
  Client
}