import React, { Component } from 'react'
import axios from 'axios'
import './Register.scss'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser } from '../../ducks/reducer.js'


class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            email: '',
            redirect: false
        }
    }

    handleUsername = (e) => {
        this.setState({ username: e.target.value })
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    handleEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    handleClick = () => {
        axios.post('/api/register', {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }).then(user => {
            this.props.updateUser(user.data)
            this.setState({ redirect: true })
        })
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
        // const usernameTaken = ({
        //     if 
        // }
        return (
            <div className="register-page">
                <h1>Register</h1>
                <input onChange={this.handleUsername} placeholder="Username" />
                <br />
                <input type='password' onChange={this.handlePassword} placeholder="Password" />
                <br />
                <input type='email' onChange={this.handleEmail} placeholder="Email" />
                <br />
                <button onClick={this.handleClick}>Register</button>
                {/* {usernameTaken} */}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { updateUser })(Register)