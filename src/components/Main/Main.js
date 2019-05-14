import React, { Component } from 'react';
import './Main.scss';
import axios from 'axios';
// import { Redirect } from 'react-router-dom'


export default class Main extends Component {
    constructor() {
        super()
        this.state = {
            session: false,
            cookies: []
        }
    }

    componentDidMount() {
        axios.get('/api/cookie_products').then(response => {
            this.setState({ cookies: response.data })
        })
        axios.get('/api/getSession').then(response => {
            console.log(response)
            if (response.data.user.username) {
                this.setState({ session: true })
            }
        })
    }

    handleClick(id) {
        if (this.state.session) {
            axios.post(`/api/cart/${id}`).then(response => {
            })
        } else { //history comes from react router dom
            this.props.history.push("/Login")
        }
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

