import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
//import { fetchForecast } from './fetchForecast';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { weatherReducer } from './reducers';

const store = createStore(weatherReducer, applyMiddleware(thunk));
//store.dispatch(fetchForecast(5));

ReactDOM.render(
 <Provider store={store}>
  <React.StrictMode>
    <App forecastId="5" />
  </React.StrictMode>
 </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
