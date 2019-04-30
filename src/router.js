import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from './components/Login/Login';
import Header from './components/Header/Header'
import Main from './components/Main/Main'
// import Data from "./components/Data/Data"
// import Checkout from './components/Checkout/Checkout';

export default (
    <Switch>
        <Header />
        {/* <Main component={Data} /> */}
        <Route component={Login} path="/" exact />
        <Route component={Main} path="/Main" />
        {/* <Route component={Checkout} path="/checkout" /> */}
    </Switch>
)