import React, { Component } from 'react';
import axios from 'axios';
import './Contact.scss';


export default class ContactForm extends Component {

    handleSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        axios({
            method: "POST",
            url: "http://localhost:3002/send",
            data: {
                name: name,
                email: email,
                message: message
            }
        }).then((response) => {
            if (response.data.msg === 'success') {
                alert("Message Sent.");
                this.resetForm()
            } else if (response.data.msg === 'fail') {
                alert("Message failed to send.")
            }
        })
    }

    resetForm() {
        document.getElementById('contact-form').reset();
    }

    render() {
        return (
            <div className="contact-page">
                <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <div>
                        <label for="name">Name</label>
                        < br />
                        <input type="text" id="name" />
                        < br />
                        < br />
                        <label for="exampleInputEmail1">Email address</label>
                        < br />
                        <input type="email" id="email" aria-describedby="emailHelp" />
                        < br />
                        < br />
                        <label for="message">Message</label>
                        < br />
                        <textarea className="form-control" rows="5" id="message"></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

