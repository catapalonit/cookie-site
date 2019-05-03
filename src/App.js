import React, { Component } from 'react';
import './App.scss';
import { HashRouter } from 'react-router-dom'
import Header from './components/Header/Header'
import Landing from './components/Landing/Landing'
// import Main from './components/Main/Main'
// import Cart from './components/Cart/Cart'
// import Contact from './components/Contact/Contact'
import routes from './routes'
import { Provider } from 'react-redux'
import store from './store'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Provider store={store}>
          <div className="App">
            <Header />
            <Landing />
            {routes}
          </div>
        </Provider>
      </HashRouter>
    );
  }
}

export default App;
