import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { weatherReducer } from './reducers';

const store = createStore(weatherReducer, applyMiddleware(thunk));

// You could uncomment the line below and use it to load the initial forecast data from the server, if you were not using the useEffect hook in the App.js.
// But since we are using it, the line below is not necessary.
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
