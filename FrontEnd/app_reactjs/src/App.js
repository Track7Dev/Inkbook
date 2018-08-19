import React, { Component } from 'react';
import './App.css';
import { Home, MembersList, Login, Dashboard, Image_Uploader } from './components';
import {Route, Link} from 'react-router-dom';
import axios from 'axios';
import IBLogo from './assets/IB.png';

class App extends Component {
  constructor(){
    super();
    this.state = {
      inBeta: true,
      version: '0.1'
    };
  }

  render() {
    let appStatus;
    this.state.inBeta ? appStatus = <span style={{color: 'red'}}>BETA</span> : appStatus = <span style={{color: 'green'}}>STABLE</span>;
    console.log("test" + process.env.REACT_APP_TEST);
    return (
      <div className="App">
        <header className="App-header">
        <div onClick={() => window.location.replace('/')} style={{cursor: 'pointer'}}><img src={IBLogo} width='65px' /></div>
        </header>
        <div className="App-intro">
          <Route exact path='/' component={Home}/>
          <Route path='/uploader' component={Image_Uploader} />
          <Route path='/login' component={Login} />
          <Route path='/admin' component={MembersList}/>
          <Route path='/dashboard' component={Dashboard} />  
        </div>
        <footer className='App-footer'>
        <div style={{position: 'relative', left: '2%'}}>© Copyright 2017 <span style={{color:'red'}}>Track Seven Entertainment & Designs</span></div> 
        <div style={{position: 'absolute', right: '2%'}}>{appStatus} V{this.state.version} <span style={{ backgroundColor: 'rgb(37, 37, 37)', borderBottom: '1px solid white', borderRight: '1px solid white', borderLeft: '1px solid white', marginLeft:5, padding: 5, borderBottomLeftRadius:5, borderBottomRightRadius:5}}>POWERED By: <span style={{color:'rgb(33, 165, 231)'}}>Lambda School</span></span></div>
        </footer>  
      </div>
    );
  }
}

export default App;
