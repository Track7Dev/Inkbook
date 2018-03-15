import React, { Component } from 'react';
import welcomeLogo from '../assets/WelcomeLogo.jpg';
import signinLogo from '../assets/home_signin.jpg';
import signupLogo from '../assets/home_signup.jpg';
import siteInfo from '../assets/Site-Info.png';
import '../styles/home.css';
export default class Home extends Component {
  render() {
    return (
      <div id='home_wrapper'>
        <div id='home_welcome-banner'><img src={welcomeLogo} width='100%' height= '100%' /></div>
        
        <div style={{ marginTop: '2%', width: '70%', justifyContent: 'center', display: 'flex', flexFlow: 'wrap', whiteSpace: 'wrap', overflow: 'hidden'}}>
          <div onClick={() => this.props.history.push('/login')} className='home_membership'><img src={signinLogo} width='100%' height='100%' /> </div>
          <div onClick={() => this.props.history.push('/signup')} className='home_membership'><img src={signupLogo} width='100%' height='100%' /> </div>
        </div>
        <div id='home_site-info'> <img src={siteInfo} width='100%' height='100%' /> </div>
      </div>
    );
  }
}