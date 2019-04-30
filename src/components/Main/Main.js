import React, { Component } from 'react';
import './Main.scss';

export default class Header extends Component {

    render() {
        // map here
        // cookies.map()
        // let itemList = this.props.cookies.map(val => <Cookies cookies={val} />) //Cookies.js holds what im rendering

        return (
            <div className="Main">
                <div className="Card">
                    <div key="cookie-item">
                        <img src={this.props.cookies[0].image} alt="cookie" />
                        <h3>{this.props.cookies[0].name}</h3>
                        <h3>{this.props.cookies[0].price}</h3>

                        <button className="addToCart"> Add To Cart </button>

                        {/* <div>{itemList}</div> */}


                        <img src={this.props.cookies[1].image} alt="cookie" />
                        <h3>{this.props.cookies[1].name}</h3>
                        <h3>{this.props.cookies[1].price}</h3>

                        <button className="addToCart"> Add To Cart </button>
                    </div>
                </div>
            </div>

        );
    }
}

