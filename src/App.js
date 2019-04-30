import React, { Component } from 'react';
import './App.scss';
import { HashRouter } from 'react-router-dom'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import cookies from "./components/Data/Cookies"



class App extends Component {
  render() {
    return (
      <HashRouter>

        <div className="App">
          <Header />
          <Main cookies={cookies} />

        </div>

      </HashRouter>
    );
  }
}

export default App;
