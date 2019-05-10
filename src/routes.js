import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from './components/Main/Main'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Cart from "./components/Cart/Cart"
import Contact from './components/Contact/Contact';
import ContactForm from './components/Contact/ContactForm';
import FileUpload from './components/FileUpload/FileUpload';
import Signout from './components/Signout/Signout';
import Checkout from './components/Checkout/Checkout';



export default (
    <Switch>

        <Route component={Login} path="/Login" />
        <Route component={Register} path="/Register" />
        <Route component={Cart} path="/Cart" />
        <Route component={Contact} path="/Contact" />
        <Route component={ContactForm} path="/ContactForm" />
        <Route component={FileUpload} path="/FileUpload" />
        <Route component={Signout} path="/Signout" />
        <Route component={Checkout} path="/Checkout" />
        <Route exact path="/" component={Main} />


    </Switch>
)