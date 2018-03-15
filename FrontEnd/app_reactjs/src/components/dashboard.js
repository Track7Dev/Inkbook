import React, { Component } from 'react';
import '../styles/dashboard.css';
import logo from  '../assets/Logo_INKBook.png';
import { Admin, Client, Shop, Artist } from './dash_content';
import { Route } from 'react-router-dom';
import axios from 'axios';
import { Dashboard_Nav } from './index';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = { display: null, status: null };
  }

  render() {
    if(!window.localStorage.getItem('token')) window.location.replace('/login');
    axios.get('http://localhost:7777/verify', { headers:{token: window.localStorage.getItem('token')}})
    .then((res) => {
      const acceptedStatus = ['admin','shop', 'artist', 'client'];
      const statusComponents = [Admin, Shop, Artist, Client];
      if(!res.data.message || !acceptedStatus.includes(res.data.status)) {
        window.localStorage.removeItem('token'); 
        window.location.replace('/login');
      }
      const component = statusComponents[acceptedStatus.indexOf(res.data.status)];
      if(this.state.display !== component) this.setState({display: component, state: res.data.status});      
    })
    .catch((err) => {
      window.localStorage.removeItem('token'); window.location.reload();
    });
    return (
      <div id='dashboard'>
        <Dashboard_Nav />
        <div id='dashboard_display'>
        <Route path={`/dashboard`} component={this.state.display} />

        
        </div>
      </div>
    );
  }
}