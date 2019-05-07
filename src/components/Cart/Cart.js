import React, { Component } from "react";
import axios from 'axios'
import './Cart.scss';


export default class Cart extends Component {
    constructor() {
        super()
        this.state = {
            cart: [],
            total: 0
        }
    }
    componentDidMount() {
        axios.get('/api/cart').then(response => {
            console.log(response)
            this.setState({
                cart: [...this.state.cart, response.data.cart],
                total: response.data.total
            })
        })
    }

    render() {
        let userCart;
        if (this.state.cart[0]) {
            userCart = this.state.cart[0].map(cart => {
                return <div className="Checkout-Page">
                    <div className="Checkout-Card">
                        <img src={cart.image} alt="products" />
                        <h3>{cart.name}</h3>
                        <h4>${cart.price}</h4>
                    </div>
                </div>
            })
        }

        return (
            <div className="Cart_List">
                <h1>Cart</h1>
                <h2>Total: $ {this.state.total}</h2>
                <button className="Checkout" onClick={() => this.handleClick()}> Checkout </button>
                <br />
                <div>
                    {userCart}
                </div>

            </div>
        );
    }
}