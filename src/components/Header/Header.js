import React, { Component } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';



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
    render() {
        return (
            <div className="Header">

                <nav>
                    <header>
                        {/* <h1> Stacy's Cookies </h1> */}
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
                        <Link to="/Register">REGISTER</Link>
                        <Link to="/Cart">CART</Link>
                        <Link to="/Contact">CONTACT</Link>
                    </ul>
                    <div className={"drop-down-" + this.state.menuStatus}> {/* set to only display when menuStatus is open  */}
                        <ul className="drop-down-list">
                            <Link to="/Login">LOGIN</Link>
                            <Link to="/Register">REGISTER</Link>
                            <Link to="/Cart">CART</Link>
                            <Link to="/Contact">CONTACT</Link>
                        </ul>
                    </div>
                </nav>
            </div>

        );
    }
}

