import { FETCH_FORECAST_FAIL, FETCH_FORECAST_SUCCESS } from './constants';

export const fetchForecast = (forecastId) => (dispatch) => {
	const forecastUrl = `/api/forecasts`;
	console.log(`fetchForecast: forecastId = ${forecastId}`);
	
	fetch(forecastUrl)
	.then(res => res.json())
	.then(data => {
		console.log(data);
		//console.log(`fetchForecast: data[forecastId] = ${JSON.stringify(data)}`);
		return dispatch({ type: FETCH_FORECAST_SUCCESS, forecast: data.forecasts[forecastId], temperatureUnit: data.temperatureUnit });
	})
	.catch((err) => {
		console.log(`fetchForecast: err = ${err}`);
		dispatch({ type: FETCH_FORECAST_FAIL, payload: err});
	});
}