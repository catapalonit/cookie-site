import React, { Component } from 'react';
import './App.scss';
import { HashRouter } from 'react-router-dom'
import Header from './components/Header/Header'
import Main from './components/Main/Main'



class App extends Component {
  render() {
    return (
      <HashRouter>

        <div className="App">
          <Header />
          <Main />

        </div>

      </HashRouter>
    );
  }
}

export default App;
