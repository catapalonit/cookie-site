import React, { Component } from 'react';
import './Main.scss';

import Data from "./Data"

export default class Header extends Component {
    constructor() {
        super();
        this.state = {
            cookie

        }
    }

    render() {
        return (
            <div className="Main">
                <div className="Card">
                    <div key="id">
                        <img src={this.props.cookie.image} alt="cookie" />
                        <h3>{this.props.cookie.name}</h3>
                        <h3>{this.props.cookie.description}</h3>

                        <button className="addToCart"> Add To Cart </button>
                    </div>
                </div>
            </div>

        );
    }
}

