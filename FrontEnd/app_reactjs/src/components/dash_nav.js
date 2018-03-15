import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import mailLogo from '../assets/Mail.png';
const server = require('../config').server;

export default class Dashboard_Nav extends Component {
  constructor() {
    super();
    this.state = {opened: false, username: null, name: null, status: null, profileImg: null}
    this.files = [];
  }
  logout = () => {
    axios.get(`${server}/logout`)
    .then((res) => {
      window.localStorage.removeItem('token');
      window.location.replace('/');
    })
    .catch(err => console.error(err));
  }
  updloadImages = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('image', e.target.files[0]);
    axios.post(`${server}/profile`, form, {headers:{token:window.localStorage.getItem('token')}})
    .then((res) => {if(!res.data.token) window.location.replace('/login'); })
    .then((res) => this.setState({profileImg: `${server}/image/${this.state.status}/${this.state.username}/profile.jpg?c=${Date.now()}`}))
    .catch((err) => window.location.replace('/login'));
  }

  componentDidMount() {
    axios.get('http://localhost:7777/user', {headers: {token: window.localStorage.getItem('token')}})
    .then((user) => {

      console.log(user);
      this.setState({username: user.data.user.username, name: user.data.user.name, status: user.data.user.status, profileImg: `http://localhost:7777/image/${user.data.user.status}/${user.data.user.username}/profile.jpg?c=${Date.now()}`});
    })
  }

  render() {
    let size;
    if(this.state.opened) size= 0;
    if(!this.state.opened) size = -100;
    return (
      <div>
        <div style={{left: `${size}%`}} id='dashboard_nav_profile_drawer'>
          <div id='dashboard_nav_profile_wrapper'>
              <form id='dashboard_nav_profile_drawer_img'>
              <input style={{opacity: 0,backgroundColor: 'green',height: '100%', width: '100%',cursor:'pointer', position: 'absolute', width: '100%'}} 
                     onChange={(e) => this.updloadImages(e)} type='file' name='upload'  />
                
                <img onError={(e) => this.setState({profileImg: 'https://techreport.com/forums/styles/canvas/theme/images/no_avatar.jpg'})} width='100%' height= '100%' src={this.state.profileImg}/>
              </form>
              <br />
              <br />
              <br/>
              <br/>
              <div className='dashboard_nav_profile_drawer_info'>{this.state.username }</div>
              <div className='dashboard_nav_profile_drawer_info'>{this.state.name}</div>
              <div className='dashboard_nav_profile_drawer_info'><span>Rank: </span><span>Pts: 100</span></div>
              <div className='dashboard_nav_profile_drawer_info'>Rating</div>
              <div className='dashboard_nav_profile_drawer_logout' onClick={() => this.logout()}>Logout</div>

          </div>
        <div />
        </div>
        <div id='dashboard_nav'>
          <br/>
          <hr/>
          <img onClick={() => this.setState({opened: !this.state.opened})}className='dashboard_nav_profile' src={this.state.profileImg}/>
          <Link to='/dashboard/messages'><div className='dashboard_nav_btn'><img src={mailLogo} width='100%' height='80%'/></div></Link>
          <div className='dashboard_nav_btn' />
          <div className='dashboard_nav_btn' />
          <div className='dashboard_nav_btn' />
          <div className='dashboard_nav_btn' />
          <div className='dashboard_nav_btn' />
        </div>
      </div>
    );
  }
}