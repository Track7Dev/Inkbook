import React, { Component } from 'react';
import { showUsers, addUser, removeUser, login, logout} from '../actions';
import { connect } from 'react-redux';
import { Users } from './users';
import Login from './login';
import Signup from './signup';
import '../index.css';


class App extends Component {
  componentDidMount(){
    if(window.localStorage.getItem('admin')){
      this.props.showUsers();
    }
    
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">INKBook</h1>
          <Login parent={this.props} />
        </header>
        <div className="list-users">
        <Users users={this.props.users} parent={this.props}/>
        <Signup parent={this.props}/>        
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    users : state.usersR
  };
};

export default connect(mapStateToProps, { showUsers, addUser, removeUser, login, logout})(App);
