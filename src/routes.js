import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from './components/Main/Main'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Cart from "./components/Cart/Cart"
import Contact from './components/Contact/Contact';
import FileUpload from './components/FileUpload/FileUpload';



export default (
    <Switch>

        <Route component={Login} path="/Login" />
        <Route component={Register} path="/Register" />
        <Route component={Cart} path="/Cart" />
        <Route component={Contact} path="/Contact" />
        <Route component={FileUpload} path="/FileUpload" />
        <Route exact path="/" component={Main} />


    </Switch>
)