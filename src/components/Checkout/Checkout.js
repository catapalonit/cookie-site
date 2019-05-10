import React, { Component } from "react";
import StripeCheckout from 'react-stripe-checkout'

export default class Checkout extends Component {
    onToken = (token, addresses) => {
        // TODO: Send the token information and any other
        // relevant information to your payment process
        // server, wait for the response, and update the UI
        // accordingly. How this is done is up to you. Using
        // XHR, fetch, or a GraphQL mutation is typical.
    };


    render() {
        return (
            <StripeCheckout
                amount="500"
                billingAddress
                description="Homemade Cookies"
                image="https://s3.amazonaws.com/cookies-images-1234/cookielogo.png"
                locale="auto"
                name="Stacy's Cookies"
                stripeKey="pk_test_CFBk0wKAg5NfvQdakXsQYcEm00MPFstx6q"
                token={this.onToken}
                zipCode
            />
        )
    }
}