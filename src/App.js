import React, { Component } from 'react';
import './App.scss';
import { HashRouter } from 'react-router-dom'
import Header from './components/Header/Header'



class App extends Component {
  render() {
    return (
      <HashRouter>

        <div className="App">
          <Header />

        </div>

      </HashRouter>
    );
  }
}

export default App;
