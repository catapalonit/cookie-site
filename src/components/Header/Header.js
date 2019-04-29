import React, { Component } from 'react';
import './Header.scss';



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
            console.log("hit")
        }
    }
    render() {
        return (
            <div className="Header">

                <nav>
                    <header>
                        <h1> Stacy's Cookies </h1>
                    </header>
                    <div className="Menu-button" onClick={() => this.handleClick()}>
                        <h6>MENU</h6>
                        <img
                            src="https://cdn2.iconfinder.com/data/icons/mobile-banking-ver-3a/100/1-48-512.png"
                            alt="Hamburger Button"
                        />
                    </div>
                    {/* <div> */}
                    <ul>
                        <a href="/Login">LOGIN</a>
                        <a href="/Register">REGISTER</a>
                        <a href="/Cart">CART</a>
                    </ul>
                    {/* </div> */}
                    <div className={"drop-down-" + this.state.menuStatus}>
                        <ul className="drop-down-list">
                            <a href="/Login">LOGIN</a>
                            <a href="/Register">REGISTER</a>
                            <a href="/Cart">CART</a>
                        </ul>
                    </div>
                </nav>
            </div>

        );
    }
}

