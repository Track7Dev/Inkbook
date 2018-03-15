import React, { Component } from 'react';
import Uploader from 'react-images-upload';
import axios from 'axios';

export default class Image_Uploader extends Component {
  constructor() {
    super();
    this.state = { files: null, preview: null };
    this.files = [];
  }
  componentDidMount() {
    console.log(this.state.files);

  }
  setfiles = (files) => {
    this.setState({files});
  }
  updloadImages = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('image', e.target.files[0])
    axios.post('http://localhost:7777/profile', form, {headers:{token:window.localStorage.getItem('token')}})
    .then((res) => {if(!res.data.token) window.location.replace('/login')})
    .then((res) => window.location.reload())
    .catch((err) => window.location.replace('/login'));
  }
  render() {
    return (
      <form encType='multipart/form-data'  onSubmit={(e) => this.updloadImages(e)}>
        
        <input type='submit' />
        <div style={{backgroundColor:'red', position: 'absolute'}}><input style={{opacity: 0,backgroundColor: 'green',height: '100%', position: 'absolute', width: '100%'}} onChange={(e) => this.updloadImages(e)} height='2px' width='20px' type='file' name='upload' ref={(input) => this.files = input.files} /><img height='200px' width='200px' src='http://localhost:7777/image/shop/track7dev/profile.jpg'/></div>
      </form>
      
    );
  }
}