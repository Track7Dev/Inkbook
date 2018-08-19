import React, { Component } from 'react';
import axios from 'axios';
const server = process.env.REACT_APP_SERVER;

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: [], message: null};
  }
  componentWillReceiveProps(){
    const messageWrap = document.getElementById('message-display');
    messageWrap.scrollTop = messageWrap.offsetTop;
  }
  componentDidMount() {
    if(!this.props.sender[0] || !this.props.sender[1]) return;
    axios.get(`${server}/message/${this.props.sender[0]}/${this.props.sender[1]}`, {headers:{token:window.localStorage.getItem('token')}})
    .then((res) => {
      this.setState({
        messages: res.data
      });
    });
  }

  sendMessage = () => {
    const message = {
      to:this.props.sender[0],
      toStatus: this.props.sender[1],
      message: this.state.message
    }
    axios.post(`${server}/create-message`, message, {headers:{token:window.localStorage.getItem('token')}})
    .then((res) => {
      axios.get(`${server}/message/${this.props.sender[0]}/${this.props.sender[1]}`, {headers:{token:window.localStorage.getItem('token')}})
      .then((res) => {
        this.setState({
          messages: res.data
        });
      });
    });
  }

  render() {
    let display;
    
    if(this.state.messages.length > 0) display = <form onSubmit={(e)=>{e.preventDefault(); this.sendMessage();}} style={{width: '100%', height: '10%',display: 'flex', backgroundColor: 'pink', alignItems: 'center'}}><input onChange={(e) => this.setState({message:e.target.value})} type='text' style={{paddingLeft: 5, fontSize: 'calc(8px + 1vw)', width: '100%', height: '100%'}} /><input type='submit' style={{display:'flex', backgroundColor: 'green', alignItems: 'center', height: '95%', padding: 5}} value='send'/></form>;
    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: 'orange', height: '100%', padding: '2%'}}>
        <div id='message-display' style={{overflowY: 'scroll', display: 'flex', flexDirection: 'column', padding:'1%'}}>
          {this.state.messages.map((message, i) => {
          if(message.sender[0] === this.props.user[0]) return <div key={i} style={{backgroundColor: 'purple', marginBottom: '2%', width: '40%', alignSelf: 'flex-end'}}> {message.message}:{message.sender[0]}</div>;
          return <div key={i} style={{backgroundColor: 'blue',width: '40%', alignSelf: 'flex-start', marginBottom: '2%'}}> {message.sender[0]}: {message.message} </div>;
          })}
        </div>
        <br/>
        {display}
      </div>
    );
  }
};

