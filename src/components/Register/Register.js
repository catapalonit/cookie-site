import React, { Component } from "react";
import './Register.scss'
import { Link, Redirect } from 'react-router-dom'
import axios from "axios";

export default class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            redirect: false
        }
    }

    handleUsername = e => {
        this.setState({ username: e.target.value })
    }
    handlePassword = e => {
        this.setState({ password: e.target.value })
    }

    handleClick = e => {
        const { username, password } = this.state;

        axios.post("/api/login", { username, password }).then(res => {
            this.setState({ redirect: true })
        })
    }

    handleEnter = e => {
        if (e.key === "Enter") {
            this.handleClick()
        }
        console.log("hit")
    }



    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/Main' />
        }
        return (
            <div className="register-page">
                <h1>Register</h1>
                <input type="text" onChange={this.handleUsername} placeholder="Username" />
                < br />
                <input type="password" onChange={this.handlePassword} onKeyPress={this.handleEnter} placeholder="Password" />
                < br />
                <button onClick={this.handleClick} onKeyPress={this.handleEnter}>Sign Up</button>
            </div>
        );
    }
}