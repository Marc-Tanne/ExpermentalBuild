import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import './assets/css/index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import store from './app/redux/store';

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)
ReactDOM.render(<ReduxApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
