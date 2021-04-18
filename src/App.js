import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component'

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInAngSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import { auth } from './firebase/firebase.util';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user })
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAngSignUpPage} />
        </Switch>
      </div>
      );
    }
  }
  

export default App;
