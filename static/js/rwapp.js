//https://codepen.io/mattfroese/pen/WaeYQV

const key = '';
if (key == '') document.getElementById('temp').innerHTML = ('Remember to add your api key!');
let lat = ''
let lon = ''

// initialize upon page load
function initWeather() {

  let startDate = '2000-01-01';
  let endDate = '2018-12-31';
  let selector = d3.select("#select-station-id");

  // Use hardcode selector value
  let stationId = "690150"

  console.log(startDate);
  console.log(endDate);
  console.log(stationId);

  //Initialize selector with station ids for the period
  initializeStationIdsSelector();

  d3.json(`api/v1.0/weatherdata/period/${startDate}/${endDate}/${stationId}`)
    .then(function (responseData) {

      console.log(responseData);






      updateStationInfo(responseData)

      // Setup event listeners for changing station, etc.
      selector.on("change", function () {
        updateLineChart();
      });

      let xData = responseData.map(x => {
        //let d = new Date(x.YEARMODA);
        // return d.toISOString().split('T')[0];
        return d.toISOString().substring(0, 10);
      });
      let tempTrace = {
        x: xData,
        y: responseData.map(x => x.TEMP),
        type: 'line',
        line: {
          color: 'rgb(0, 255, 0)',
          width: 1
        },
        name: 'Temperature'
      }

      let minTrace = {
        x: xData,
        y: responseData.map(x => x.MIN),
        type: 'line',
        line: {
          color: 'rgb(0, 0, 255)',
          width: 1
        },
        name: 'Min Temperature'
      }

      let maxTrace = {
        x: xData,
        y: responseData.map(x => x.MAX),
        type: 'line',
        line: {
          color: 'rgb(255, 0, 0)',
          width: 1
        },
        name: 'Max Temperature'
      }

      var layout = {
        title: 'Temperature (Degrees Fahrenheit) vs Date (GMT)',
        xaxis: {
          title: 'Date (GMT)',
          tickmode: 'auto',
          tickangle: -45
        },
        yaxis: {
          title: 'Degrees Fahrenheit',
          range: [-40, 120]
        }
      };

      let tempData = [tempTrace, minTrace, maxTrace]


    });
}






function weatherBallon(cityID) {
  let startDate = '2001-01-01';
  let endDate = '2018-12-01';

  d3.json(`api/v1.0/weatherdata/period/${startDate}/${endDate}/${cityID}`)
    .then(function (responseData) {

      console.log(responseData);
      fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + [responseData[0].LAT] + '&lon=' + [responseData[0].LON] + '&appid=' + key)
        .then(function (resp) { return resp.json() }) // Convert data to json
        .then(function (data) {
          console.log(data);
          drawWeather(data);
        })
        .catch(function () {
          // catch any errors
        });
    });
}

function drawWeather(d) {
  var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
  var fahrenheit = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);
  var description = d.weather[0].description;

  document.getElementById('description').innerHTML = description;
  document.getElementById('temp').innerHTML = celcius + '&deg;';
  document.getElementById('location').innerHTML = d.name;

  if (description.indexOf('rain') > 0) {
    document.body.className = 'rainy';
    image.src = 'https://raw.githubusercontent.com/Jagjeet/weather-ml-project/deca2f407cfe176f24bf4aec62798990752c6e75/templates/reference-images/weather-showers-scattered.svg';
  } else if (description.indexOf('cloud') > 0) {
    document.body.className = 'cloudy';
    image.src = 'https://raw.githubusercontent.com/Jagjeet/weather-ml-project/deca2f407cfe176f24bf4aec62798990752c6e75/templates/reference-images/weather-few-clouds.svg';
  } else if (description.indexOf('snow') > 0) {
    document.body.className = 'snow';
    image.src = 'https://raw.githubusercontent.com/Jagjeet/weather-ml-project/deca2f407cfe176f24bf4aec62798990752c6e75/templates/reference-images/weather-snow.svg';
  } else {
    document.body.className = 'clear';
    image.src = 'https://raw.githubusercontent.com/Jagjeet/weather-ml-project/deca2f407cfe176f24bf4aec62798990752c6e75/templates/reference-images/weather-clear.svg';
  }
}
window.onload = function () {
  weatherBallon('690150');
}
initWeather();