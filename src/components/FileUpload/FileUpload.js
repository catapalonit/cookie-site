import React, { Component } from 'react';
import axios from 'axios';
import './FileUpload.scss'

export default class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      image: "",
      name: "",
      price: 0
    };
  }

  submitFile = (event) => {
    event.preventDefault();
    const formData = new FormData();
    console.log(this.state.file)
    formData.append('file', this.state.file[0]);
    axios.post(`/api/products`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      // handle your response;
      axios.post('/api/products', {
        image: this.state.image,
        name: this.state.name,
        price: this.state.price
      })
      console.log(response);
    })
      .catch(error => {
        // handle your error
        console.log(error)
      });
  }

  handleFileUpload = (event) => {
    this.setState({ file: event.target.files }, () => {
      console.log(this.state.file)
    });
  }
  handleName = (e) => {
    this.setState({ name: e.target.value })
  }
  handlePrice = (e) => {
    this.setState({ price: e.target.value })
  }

  render() {
    return (
      <div className="Admin-Page">
        <h1>Add a new product</h1>
        <form onSubmit={this.submitFile}>
          <input label='image' type='file' onChange={this.handleFileUpload} />
          <br />
          <input label='name' placeholder="Cookie Name" type='text' onChange={this.handleName} />
          <br />
          <input label='price' type='text' placeholder="Cookie Price" onChange={this.handlePrice} />
          <br />
          <button type='submit'>Add a new cookie</button>
        </form>
      </div>
    );
  }
}

