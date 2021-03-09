import utils from './utils';
import { FETCH_FORECAST_SUCCESS, SAVE_TEMPUNIT_SUCCESS } from './constants';

const initialState = {forecast: {}, temperatureUnit: "F"};

export function weatherReducer(state=initialState, action) {
  //console.log(`reducer: action.type = ${action.type}`);
  switch (action.type) {
	  case SAVE_TEMPUNIT_SUCCESS: 
		if (action.unit !== state.temperatureUnit) {
			let newForecast = utils.getForecastInCurrentUnits(state.forecast, action.unit);
			//return {forecast: utils.getForecastInCurrentUnits(state.forecast, action.unit), temperatureUnit: action.unit};
			return {forecast: newForecast, temperatureUnit: action.unit};
		}
		return state;
	  case FETCH_FORECAST_SUCCESS:
		//let newState = {...state, forecast: getForecastInCurrentUnits(action.forecast, state.temperatureUnit) };
		let newState = {...state, forecast: action.forecast, temperatureUnit: action.temperatureUnit };
		//console.log(`reducer: FETCH_FORECAST_SUCCESS: newState = ${JSON.stringify(newState)}`);
		return newState;
    default:
      return state;
  }
}