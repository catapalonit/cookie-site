import React, { Component } from "react";
import './Signout.scss';


export default class Signout extends Component {

    render() {
        return (
            <div className="signout-page">
                <div className="signout-info">
                    <h1>Goodbye</h1>
                    <h2>Thanks for visiting you have been successfully logged out.</h2>
                </div>
            </div>
        );
    }
}