import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";


const stripeBtn = (props) => {
    const publishableKey = "pk_test_CFBk0wKAg5NfvQdakXsQYcEm00MPFstx6q";

    const onToken = token => {
        const body = {
            token: token
        };
        axios.post("/payment", body)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log("Payment Error: ", error);
            });
    };
    return (
        <StripeCheckout
            amount={props.amount * 100}
            billingAddress
            description="Thanks for shopping with us."
            image="https://s3.amazonaws.com/cookies-images-1234/cookielogo.png"
            locale="auto"
            name="Stacy's Cookies"
            label="Checkout"
            stripeKey={publishableKey} //this would change to the secretkey when putting stripe live
            token={onToken}
            zipCode
            style={{ zIndex: '1' }}
        />
    );
};
export default stripeBtn;