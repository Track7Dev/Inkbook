import React, { Component } from 'react';
import { PassEncrypt } from './crptKey';

export default class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm: '',
      fname: '',
      lname: '',
      age: 27,
      dob: '',
      email: '',
      gender: '',
      userClass: "",
    }
    this.addUserHost = 'http://localhost:3000/user';
    this.addUser = this.props.parent.addUser;
  }
  inputVal = (form, val) => {
    this.setState({
      [form]: val.split(' ').join('')
    })
  }

  selectForm = (userClass) => {
    switch(userClass){
      case "client":
      case "artist":
      case "shop":
      this.setState({ userClass });
      break;
      default:
      return;
    }
  }
  
  render(){
    if (!localStorage.getItem('username')){
    return (
      <form  id="form-signup" onSubmit={(e) => { 
        e.preventDefault(); 
        this.setState(props => props.password = PassEncrypt(props.password));

        const user = Object.assign(this.state);
        this.addUser(user); 
         this.setState({
         username: '',
         password: '',
         confirm: '',
         fname: '',
         lname: '',
         age: '00',
         dob: '',
         email: '',
         gender: '',
         userClass: ''
         });
         e.target.reset();
      }}>
        <br/>
        <div>{this.state.username}</div>
        <label>Client:</label>
        <input type="radio" name="user-class" onChange={() => {this.selectForm("client");}} value="client" />
        <label>Artist:</label>
        <input type="radio" name="user-class" onChange={() => {this.selectForm("artist");}} value="artist" />
        <label>Shop:</label>
        <input type="radio" name="user-class" onChange={() => {this.selectForm("shop");}} value="shop" />
        
        <br/>
        <label>Username:</label>
        <br/>
        <input type="text" value={ this.state.username } onChange={(e) => { this.inputVal('username', e.target.value ); }} required/>
        <br/>
        <label>Password:</label>
        <br/>
        <input  type="password" value={ this.state.password }  onChange={(e) => { this.inputVal('password', e.target.value ); }} required/>
        <br/>
        <label>Confirm Password:</label>
        <br/>
        <input  type="password" value={ this.state.confirm } onChange={(e) => { this.inputVal('confirm', e.target.value ); }} required/>
        <br/>
        <label>First Name:</label>
        <br/>
        <input type="text" onChange={(e) => { this.inputVal('fname', e.target.value ); }} required/>
        <br/>
        <label>Last Name:</label>
        <br/>
        <input type="text" onChange={(e) => { this.inputVal('lname', e.target.value ); }} required/>
        <br/>
        <label>Male:</label>
        <input type="radio" value="male" name="gender" onChange={(e) => { this.inputVal('gender', e.target.value ); }} required/>
        <label>Female</label>
        <input type="radio" value="female" name="gender" onChange={(e) => { this.inputVal('gender', e.target.value ); }} required/>
        <br/>
        <label>DOB:</label>
        <br/>
        <input type="date" onChange={(e) => { this.inputVal('dob', e.target.value ); }} required />
        <br/>
        <label>Email:</label>
        <br/>
        <input type="email" onChange={(e) => { this.inputVal('email', e.target.value ); }} />
        <br/>
        <br/>
        <input type="submit"/>
      </form>
    );
  } else { return(<div></div>);}
  }
};