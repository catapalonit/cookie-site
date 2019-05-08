import React, { Component } from 'react';
import './Main.scss';
import axios from 'axios';

export default class Main extends Component {
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

    handleClick(id) {
        axios.post(`/api/cart/${id}`).then(response => {
            console.log(response)
        })
    }

    render() {
        // map here
        let itemList = this.state.cookies.map(cookie => {
            return <div key={cookie.id} className="Card">
                <img className="Cookie" src={cookie.image} alt="cookie" />
                <h3>{cookie.name}</h3>
                <h4> $ {cookie.price}</h4>
                <button className="addToCart" onClick={() => this.handleClick(cookie.id)}> Add To Cart </button>
            </div>
        })
        return (

            <div>
                <div className="Item_List">
                    {itemList}
                </div>
            </div >
        );
    }
}

