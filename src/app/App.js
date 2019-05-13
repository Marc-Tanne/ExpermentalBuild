import React, { Component } from 'react';

import AppRouter from './components/navigation/AppRouter';

import store from './redux/store';

class App extends Component {
  isChrome;
  constructor(props) {
    super(props);

    store.subscribe(this.onStoreUpdate.bind(this));

    this.state = {
      // place localized initial state here
    }
  }

  onStoreUpdate() {
    // Enter any actions you want to take place when the store updates with new data
  }

  render() {
    return (<AppRouter />)
  }
}

export default App;
