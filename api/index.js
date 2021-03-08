const app = require('express')()
const { v4 } = require('uuid')
const bodyParser = require('body-parser')
app.use(bodyParser.json());

//app.set('port', (process.env.PORT || 8080));

const appDataF = 
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
			{"id": 21, "weather": "heavy rain", rainchance: "100%", temperature: "69"},
		]
	};

const appDataC = 	
	{
		temperatureUnit: "C", 
		forecasts: [
			{"id": 0, "weather": "sunny", rainchance: "0%", temperature: "32", },
			{"id": 1, "weather": "partly cloudy", rainchance: "5%", temperature: "32", },
			{"id": 2, "weather": "cloudy", rainchance: "10%", temperature: "31",},
			{"id": 3, "weather": "cloudy", rainchance: "15%", temperature: "31",},
			{"id": 4, "weather": "cloudy", rainchance: "20%", temperature: "30",},
			{"id": 5, "weather": "overcast", rainchance: "25%", temperature: "29"},
			{"id": 6, "weather": "overcast", rainchance: "30%", temperature: "29"},
			{"id": 7, "weather": "overcast", rainchance: "35%", temperature: "28"},
			{"id": 8, "weather": "heavy clouds", rainchance: "35%", temperature: "28"},
			{"id": 9, "weather": "heavy clouds", rainchance: "40%", temperature: "27"},
			{"id": 10, "weather": "heavy clouds", rainchance: "45%", temperature: "26"},
			{"id": 11, "weather": "drizzly", rainchance: "50%", temperature: "26"},
			{"id": 12, "weather": "drizzly", rainchance: "55%", temperature: "25"},
			{"id": 13, "weather": "drizzly", rainchance: "60%", temperature: "25"},
			{"id": 14, "weather": "light rain", rainchance: "65%", temperature: "24"},
			{"id": 15, "weather": "light rain", rainchance: "70%", temperature: "24"},
			{"id": 16, "weather": "light rain", rainchance: "75%", temperature: "23"},
			{"id": 17, "weather": "rain", rainchance: "80%", temperature: "23"},
			{"id": 18, "weather": "rain", rainchance: "85%", temperature: "72"},
			{"id": 19, "weather": "rain", rainchance: "90%", temperature: "22"},
			{"id": 20, "weather": "heavy rain", rainchance: "95%", temperature: "21"},
			{"id": 21, "weather": "heavy rain", rainchance: "100%", temperature: "21"}
		]
	};

let appData = appDataF;

/*
app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`)
})

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params
  res.end(`Item: ${slug}`)
})
*/

app.get('/api/forecasts', (req, res) => {
  res.send(appData);
})

app.put('/api/tempUnit', function (req, res) {
	
	const tempUnit = req.body.temperatureUnit;
	
	if (tempUnit === "C") {
		appData = appDataC;
	}
	else {
		appData = appDataF;
	}
	
    res.send({ temperatureUnit: tempUnit });
})

/*
app.listen(app.get('port'), function() {
  console.log('Express app weather-useDispatch-thunk React is running on port', app.get('port'));
});
*/

module.exports = app