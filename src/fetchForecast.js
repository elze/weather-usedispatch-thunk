import axios from 'axios';
import { FETCH_FORECAST_FAIL, FETCH_FORECAST_SUCCESS } from './constants';

export const fetchForecast = (forecastId) => (dispatch) => {
	const forecastUrl = `/api/forecasts`;
	//console.log(`fetchForecast: forecastId = ${forecastId}`);
	
	axios.get(forecastUrl)
	.then(res => {
		//console.log(res);
		return dispatch({ type: FETCH_FORECAST_SUCCESS, forecast: res.data.forecasts[forecastId], temperatureUnit: res.data.temperatureUnit });
	})
	.catch((err) => {
		console.log(`fetchForecast: err = ${err}`);
		dispatch({ type: FETCH_FORECAST_FAIL, payload: err});
	});
}