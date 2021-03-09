import './App.css';
import React from 'react';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

import { fetchForecast } from './fetchForecast';
import { saveTempUnit } from './saveTempUnit';

import { useSelector, useDispatch } from 'react-redux';

//import axios from 'axios';

//import { weatherReducer } from './reducers';

/*

import utils from './utils';

function reducer(state, action) {
	//console.log(`reducer: action.type = ${action.type}`);
  switch (action.type) {
	  case 'setTemperatureUnit': 
		if (action.unit !== state.temperatureUnit) {
			let newForecast = utils.getForecastInCurrentUnits(state.forecast, action.unit);
			//return {forecast: utils.getForecastInCurrentUnits(state.forecast, action.unit), temperatureUnit: action.unit};
			return {forecast: newForecast, temperatureUnit: action.unit};
		}
		return state;
	  case 'setForecast': 	  
		//let newState = {...state, forecast: getForecastInCurrentUnits(action.forecast, state.temperatureUnit) };
		let newState = {...state, forecast: action.forecast };
		return newState;
    default:
      throw new Error();
  }
}
*/

function getButtonVariant(tempUnitOld, tempUnit) {
	if (tempUnitOld === tempUnit) 
		return 'info';
	return 'light';
}

function App({ forecastId }) {
	const {forecast, temperatureUnit } = useSelector((state) => ({forecast: state.forecast, temperatureUnit: state.temperatureUnit }));
	//console.log(`forecast = ${JSON.stringify(state.forecast)}, temperatureUnit = ${state.temperatureUnit}`);
	const dispatch = useDispatch();
  

	React.useEffect(() => {   
		console.log(`useEffect: about to dispatch fetchForecast(${forecastId})`);
		dispatch(fetchForecast(forecastId));

		return () => {
			console.log('Alert removed');
		};

	}, [forecastId, dispatch]);
	
  return (
     <Alert variant="info" className="weather-alert">
	  <Alert.Heading className="weather-title text-center">My Austin weather alert</Alert.Heading>
	  <div className="weather-title">
	  <Button onClick={() => dispatch(saveTempUnit('F'))} variant={getButtonVariant(temperatureUnit, "F")}>F</Button>
	  <Button onClick={() => dispatch(saveTempUnit('C'))} variant={getButtonVariant(temperatureUnit, "C")}>C</Button>
	  </div>
		<div className="weather-title">
		<ListGroup className="weather-alert">
		  <ListGroup.Item><b>Weather</b>: <i>{forecast.weather}</i></ListGroup.Item>
		  <ListGroup.Item><b>Rain chance</b>: <i>{forecast.rainchance}</i></ListGroup.Item>
		  <ListGroup.Item><b>Temperature</b>: <i>{forecast.temperature}</i></ListGroup.Item>
		</ListGroup>		
		</div>
	</Alert>
  );
}

export default App;
