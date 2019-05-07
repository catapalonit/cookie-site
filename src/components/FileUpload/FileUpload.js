import React, { Component } from 'react';
import axios from 'axios';
import './FileUpload.scss'

export default class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      file: null
    };
  }

  submitFile = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file[0]);
    axios.post(`/api/products`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      // handle your response;
      console.log(response);
    }).catch(error => {
      // handle your error

      console.log(error)
    });
  }

  handleFileUpload = (event) => {
    this.setState({ file: event.target.files });
  }

  render() {
    return (
      <div className="Admin-Page">
        <form onSubmit={this.submitFile}>
          <input label='upload file' type='file' onChange={this.handleFileUpload} />
          <br />
          <button type='submit'>Add a new cookie</button>
        </form>
      </div>
    );
  }
}

