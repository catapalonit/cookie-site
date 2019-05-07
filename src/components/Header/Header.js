import React, { Component } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import axios from 'axios'

export default class Header extends Component {
    constructor() {
        super();
        this.state = {
            menuStatus: 'closed'
        }
    }
    handleClick = () => {
        if (this.state.menuStatus === 'open') {
            this.setState({
                menuStatus: 'closed'
            })
        } else {
            this.setState({
                menuStatus: 'open'
            })
        }
    }

    handleSignout = () => {
        axios.delete("/api/signout").then(response => {
            console.log(response)
        })
    }
    render() {
        return (
            <div className="Header">

                <nav>
                    <header>
                        <a className="name" href="/">Stacy's Cookies</a>

                    </header>
                    <div className="Menu-button" onClick={() => this.handleClick()}>
                        <h6>MENU</h6>
                        <img
                            src="https://cdn2.iconfinder.com/data/icons/mobile-banking-ver-3a/100/1-48-512.png"
                            alt="Menu Button"
                        />
                    </div>
                    <ul>
                        <Link to="/Login">LOGIN</Link>
                        <Link to="/Cart">CART</Link>
                        <Link to="/Contact">CONTACT</Link>
                        <a href="/" onClick={() => this.handleSignout()}>SIGN OUT</a>


                    </ul>
                    <div className={"drop-down-" + this.state.menuStatus}> {/* set to only display when menuStatus is open  */}
                        <ul className="drop-down-list">
                            <Link to="/Login">LOGIN</Link>
                            <Link to="/Cart">CART</Link>
                            <Link to="/Contact">CONTACT</Link>
                            <a href="/" onClick={() => this.handleSignout()}>SIGN OUT</a>

                        </ul>
                    </div>
                </nav>
            </div>

        );
    }
}

