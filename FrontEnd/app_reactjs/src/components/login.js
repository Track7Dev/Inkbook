import React, { Component } from 'react';
import axios from 'axios';
import '../styles/login.css';
import logo from '../assets/Logo_INKBook.png';
const server = require('../config').server;

export default class Login extends Component {
  constructor() {
    super();
    this.state = {username: '', password: '', status: 'shop', display: <div />};   
  }

  componentDidMount(){
    if(window.localStorage.getItem('token')){
      axios.get(`${server}/verify`, {headers:{token:window.localStorage.getItem('token')}})
      .then((res) => {
        if(res.data.message === true) return window.location.replace(`/dashboard`);
        window.localStorage.removeItem('token');
        window.location.reload();
      })
      .catch(err => window.localStorage.removeItem('token'));
    }
    if(!window.localStorage.getItem('token'))
    this.setState({
      display:      
        <div className='app_container'>
        <form id='login_form' onSubmit={(e) => {
          e.preventDefault();
          this.signin();
        }} style={{color:'white'}} autoCapitalize='off' autoComplete='off'>
          
          <img onClick={() => this.props.history.push('/')} src={logo} width='30%' />
          <br/>
          <br/>
          <input placeholder='Username' className='login_form_input' onChange={(e) => this.setState({username: e.target.value})}  name='username' type='text'/>
          <br/>
          <br/>
          <input placeholder='Password' className='login_form_input' onChange={(e) => this.setState({password: e.target.value})}  name='password' type='password'/>
          <br/>
          <select id='login_form_status' onChange={(e) => this.setState({status: e.target.value})}>
            <option value="shop">SHOP</option>
            <option value="artist">ARTIST</option>
            <option value="client">CLIENT</option>
            <option value="admin">ADMIN</option>
          </select>
          <br />
          <input type='submit' value='LOGIN' hidden/>
        </form>
      </div>
    });
  }
 
  signin = () => {
    const { username, password, status } = this.state;
    if ( !username || !password || !status ) return alert('MISSING CREDENTIALS');
    axios.post(`${server}/signin`, {username, password, status})
    .then((res) => {
      if(!res.data.token) return alert('CREDENTIALS DO NOT MATCH');
      window.localStorage.setItem('token', res.data.token);
      window.location.replace(`/dashboard`);
    })
    .catch((err) => alert('CREDENTIALS DO NOT MATCH'));
  }
  render() {
    return (
      <div>
        {this.state.display}
      </div>
    );
  }
};