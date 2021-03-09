import { fireEvent, getByText, render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';

import utils from './utils';
import { weatherReducer } from './reducers';

jest.mock('axios');

//let container = null;
let tempConversionSpy;
let axiosPutSpy;

const fakeForecasts = 
{
	temperatureUnit: "F", 
	forecasts: [
		{"id": 0, "weather": "sunny", rainchance: "0%", temperature: "90", },
		{"id": 1, "weather": "partly cloudy", rainchance: "5%", temperature: "89", },
		{"id": 2, "weather": "cloudy", rainchance: "10%", temperature: "88",},
		{"id": 3, "weather": "cloudy", rainchance: "15%", temperature: "87",},
		{"id": 4, "weather": "cloudy", rainchance: "20%", temperature: "86",},
		{"id": 5, "weather": "overcast", rainchance: "25%", temperature: "85"},
		{"id": 6, "weather": "overcast", rainchance: "30%", temperature: "84"},
		{"id": 7, "weather": "overcast", rainchance: "35%", temperature: "83"},
		{"id": 8, "weather": "heavy clouds", rainchance: "35%", temperature: "82"},
		{"id": 9, "weather": "heavy clouds", rainchance: "40%", temperature: "81"},
		{"id": 10, "weather": "heavy clouds", rainchance: "45%", temperature: "80"},
		{"id": 11, "weather": "drizzly", rainchance: "50%", temperature: "79"},
		{"id": 12, "weather": "drizzly", rainchance: "55%", temperature: "78"},
		{"id": 13, "weather": "drizzly", rainchance: "60%", temperature: "77"},
		{"id": 14, "weather": "light rain", rainchance: "65%", temperature: "76"},
		{"id": 15, "weather": "light rain", rainchance: "70%", temperature: "75"},
		{"id": 16, "weather": "light rain", rainchance: "75%", temperature: "74"},
		{"id": 17, "weather": "rain", rainchance: "80%", temperature: "73"},
		{"id": 18, "weather": "rain", rainchance: "85%", temperature: "72"},
		{"id": 19, "weather": "rain", rainchance: "90%", temperature: "71"},
		{"id": 20, "weather": "heavy rain", rainchance: "95%", temperature: "70"},
		{"id": 21, "weather": "heavy rain", rainchance: "100%", temperature: "69"}
	]
};

beforeEach(() => {
  tempConversionSpy = jest.spyOn(utils, 'getForecastInCurrentUnits');
  axios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: fakeForecasts })
  });

  axios.put.mockImplementationOnce(() => {
      return Promise.resolve({ data: fakeForecasts })
  });
  
  axiosPutSpy = jest.spyOn(axios, 'put');
  
});

afterEach(() => {
  tempConversionSpy.mockRestore();
  axios.get.mockRestore();  
  axios.put.mockRestore();  
});

/*
test('renders weather alert app', () => {
  render(<App />);
  const alertElement = screen.getByText(/My Austin weather alert/i);
  expect(alertElement).toBeInTheDocument();
});
*/


it("renders weather alert data", async () => {	
  const store = createStore(weatherReducer, applyMiddleware(thunk));
  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
	  //debugger;
    render(<Provider store={store}><App forecastId="5"/></Provider>);	
  });
  screen.debug();
  //debugger;
  const alertTitle = screen.getByText(/My Austin weather alert/i);
  expect(alertTitle).toBeInTheDocument();	
  const tagB = document.querySelector('b');
  const boldWeather = getByText(tagB, 'Weather');
  expect(boldWeather).toBeInTheDocument();	
  const italicized = document.querySelectorAll('i');
  console.log(`italicized.length = ${italicized.length}`);
});


it('shows the temperature displayed in centigrade after C button is clicked',  async () => {
  const store = createStore(weatherReducer, applyMiddleware(thunk));
  await act(async () => {  
    render(<Provider store={store}><App forecastId="5"/></Provider>);	
  });  

  const buttonC = screen.getByText("C");  
  expect(buttonC).toBeInTheDocument();
  await act(async () => {
	fireEvent.click(buttonC);	
  });
  
  expect(screen.getByText('29')).toBeInTheDocument();
  expect(tempConversionSpy).toHaveBeenCalledWith(fakeForecasts.forecasts[5], "C");
  expect(axiosPutSpy).toHaveBeenCalledWith("/api/tempUnit", { temperatureUnit: "C" });

});

it('shows the temperature displayed in centigrade after getAllByRole', async () => {
  const store = createStore(weatherReducer, applyMiddleware(thunk));
  const tempConversionSpy = jest.spyOn(utils, 'getForecastInCurrentUnits');
  await act( async () => {  
    render(<Provider store={store}><App forecastId="5"/></Provider>);	
  });

  const buttons = screen.getAllByRole("button");
  const buttonC = buttons[1];
  

  await act(async () => {
	fireEvent.click(buttonC);	
  });
    
  expect(screen.getByText('29')).toBeInTheDocument();
  expect(tempConversionSpy).toHaveBeenCalledWith(fakeForecasts.forecasts[5], "C");
  expect(axiosPutSpy).toHaveBeenCalledWith("/api/tempUnit", { temperatureUnit: "C" });
  
  const forecastInC = {...fakeForecasts.forecasts[5], temperature: '29'};

  const buttonF = buttons[0];

  // Have to restore the implementatin of axios.put and then recreate axios.put.mockImplementationOnce, because after it's used in the code above,
  // it stops working. Maybe the "once" in the mockImplementationOnce has something to do with it.
  axios.put.mockRestore();    
  axios.put.mockImplementationOnce(() => {
      return Promise.resolve({ data: fakeForecasts })
  });
  
  await act(async () => {
	fireEvent.click(buttonF);	
  });
    
  expect(screen.getByText('84')).toBeInTheDocument();
  expect(tempConversionSpy).toHaveBeenCalledWith(forecastInC, "F");
  expect(axiosPutSpy).toHaveBeenCalledWith("/api/tempUnit", { temperatureUnit: "F" });
  
});
