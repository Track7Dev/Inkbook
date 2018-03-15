import React, { Component } from 'react';
import axios from 'axios';
import '../styles/membersList.css';
const server = require('../config').server;

 class MembersList extends Component {
  constructor() {
    super();
    this.state = {
      members: []
    };
  }
  componentWillMount() {
    axios.get(`${server}/members/all`, {headers:{token:window.localStorage.getItem('token')}})
    .then((res) => {
      this.setState({
        members: res.data.members
      });
      window.localStorage.setItem('token', res.data.token);
    })
    .catch(err => window.location.replace('/login'));
  }

  deleteUser = (username, status) => {
    axios.delete(`${server}/delete-user?u=${username}&s=${status}`, {headers:{token:window.localStorage.getItem('token')}})
    .then((res) => {
      window.localStorage.setItem('token', res.data.token);
      alert(res.data.message);
      axios.get(`${server}/members/all`, {headers:{token:window.localStorage.getItem('token')}})
      .then((res) => {
        this.setState({
          members: res.data.members
        });
      })
    })
    .catch((err) => alert(err));
  }
  
  render() {
    let members = this.state.members;
    let style;
    const status = ['shop', 'artist', 'client'];
    const statusStyle = ['admin_dashboard_display_artist', 'admin_dashboard_display_client', 'admin_dashboard_display_shop'];
    if(members.length > 0){
      members = this.state.members.map((member, i) => {
      if(member.status === status[0]) style = statusStyle[0];
      if(member.status === status[1]) style = statusStyle[1];
      if(member.status === status[2]) style = statusStyle[2];
        return (
          <div className={style} key={i}>
            <div >
              <img height='40px' width='40px' style={{borderRadius: 20}} onError={(e) => e.target.src = 'https://techreport.com/forums/styles/canvas/theme/images/no_avatar.jpg'} src={`http://localhost:7777/image/${member.status}/${member.username}/profile.jpg`} /> 
              {member.username}: {member.name} ({member.status})<div onClick={() => this.deleteUser(member.username, member.status)}>REMOVE</div>
            </div>
          </div>
        );
      });
      return (
        <div style={membersListStyle}> 
          <div>ALL MEMBERS</div>
          <div> {members}  </div>
        </div>
      );
    }
    return (
      <div />
    );
  }
}

const membersListStyle = {
  backgroundColor: 'black',
  marginLeft: 5,  
  position: 'relative', 
  marginTop: 5, 
  color: 'white', 
  padding : '1%', 
  width: '50%'
};

export default MembersList;