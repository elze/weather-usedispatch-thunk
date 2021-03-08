const utils = {
  getForecastInCurrentUnits: (forecast, tempUnit) => {
	  //console.log(`^^^^^^^^^^^^^^ utils.getForecastInCurrentUnits ; forecast = ${JSON.stringify(forecast)} tempUnit = ${tempUnit} `);
	let convertedForecast;
	if (tempUnit === "C") {
		const temperature = (forecast.temperature - 32) / 9 * 5;		
		convertedForecast = {...forecast, temperature: temperature.toFixed()};
		//console.log(`^^^^^^^^^^^^^^ utils.getForecastInCurrentUnits ; tempUnit = ${tempUnit} returning convertedForecast = ${JSON.stringify(convertedForecast)}  `);
	}	
	else {
		const temperature = forecast.temperature / 5 * 9 + 32;		
		convertedForecast = {...forecast, temperature: temperature.toFixed()};
		//console.log(`^^^^^^^^^^^^^^ utils.getForecastInCurrentUnits ; tempUnit = ${tempUnit} returning convertedForecast = ${JSON.stringify(convertedForecast)}  `);
	}			
	return convertedForecast;	
  }
};

export default utils;