import axios from 'axios';
import { PassEncrypt } from '../components/crptKey';
export const SHOW_USERS = 'SHOW_USERS';
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const login = (user) => {
    const data = axios.post(`http://localhost:5000/login`, user); 
    return {
        type: LOGIN,
        payload:data
    }
};

export const logout = () => {
    const user = localStorage.getItem('username');
    console.log(`Logging Out ${user}`);
    localStorage.clear();
    console.log(`Logged out User: ${user}`);
    axios.get('http://localhost:5000/logout');
    return {
        type:LOGOUT
    }
};


export const showUsers = () => {
    console.log('Action:Show Users');
   const data = axios.get('http://localhost:5000/users');
  return {
      type: SHOW_USERS,
      payload: data,      
  }
};

export const removeUser = (username) => {
    console.log(`Removing ${username}`);
    if(username !== null) {
    axios.get(`http://localhost:5000/remove-user/${username}`);
  return {
      type: REMOVE_USER,
      payload:username
  }
} 

};

export const addUser = (user) => {
    console.log('Adding User');
    let data;
    if(user.username !== null ) {
        console.log(user);
    data = axios.post('http://localhost:5000/user', user);
    if (user.password !== user.confirm) { alert('Passwords Dont Match!'); data = {};}
  return {
      type: ADD_USER,
      payload: data
  }
}
};