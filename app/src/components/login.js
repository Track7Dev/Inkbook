import React, { Component } from 'react';
import { PassEncrypt } from './crptKey';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: null, password: null, status: ''}
    this.parent = this.props.parent;
    
  }
  componentDidMount() {
    if(localStorage.getItem('admin') === 'true') {this.setState({status: 'ADMINISTRATOR'});}
  }
  inputVal(form, val) {
    this.setState({
      [form]: val.split(' ').join('')
    })
  }
  render(){
    if (!localStorage.getItem('username')){
      
    return (
      <form onSubmit={(e) => {e.preventDefault(); this.setState(props => props.password = PassEncrypt(props.password)); const user = Object.assign(this.state); this.parent.login(user); e.target.reset();}} id="form-login">
        <span>Username:</span>
        <input onChange={(e) => {this.inputVal('username', e.target.value);}} type="text" />
        <span>Password:</span>
        <input onChange={(e) => {this.inputVal('password', e.target.value);}} type="password" />
        <input type="submit" hidden/>
      </form>
    );
  } else { return (<div id='func-logout'>{localStorage.getItem('username')} (<span>{this.state.status}</span>)   <button id='btn-logout' onClick={() => { this.parent.logout(); }}>Logout</button></div>);}
  }
};