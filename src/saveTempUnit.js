import axios from 'axios';
import { SAVE_TEMPUNIT_FAIL, SAVE_TEMPUNIT_SUCCESS } from './constants';

export const saveTempUnit = (tempUnit) => (dispatch) => {
	//console.log(`saveTempUnit: tempUnit = ${tempUnit}`);
	
	axios.put(`/api/tempUnit`, { temperatureUnit: tempUnit }).then(response => {
		//console.log(`response from axios.put(/api/tempUnit: ${response}`);
		return dispatch({ type: SAVE_TEMPUNIT_SUCCESS, unit: tempUnit});
	})
	.catch((err) => {
		console.log(`saveTempUnit: err = ${err}`);
		dispatch({ type: SAVE_TEMPUNIT_FAIL, payload: err});
	});
}