import React, { Component } from 'react';
import './Main.scss';
import axios from 'axios';

export default class Header extends Component {
    constructor() {
        super()
        this.state = {
            cookies: []
        }
    }
    componentDidMount() {
        axios.get('/api/products').then(response => {
            console.log(response)
            this.setState({ cookies: response.data })
        })
    }

    render() {
        // map here
        let itemList = this.state.cookies.map(cookie => {
            return <div className="Main-outer" >
                <div className="Main">
                    <div className="Card">
                        <img className="Cookie" src={cookie.image} alt="cookie" />
                        <h3>{cookie.name}</h3>
                        <h3>{cookie.price}</h3>
                        <button className="addToCart"> Add To Cart </button>
                    </div>
                </div>
            </div >
        })

        return (
            <div>

                <div>{itemList}</div>

            </div >

        );
    }
}

