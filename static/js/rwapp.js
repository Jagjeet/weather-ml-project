//https://codepen.io/mattfroese/pen/WaeYQV

const key = 'a993b5c5eb2429dd024166626a0f667a';
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

      map = L.map('mapid').setView([responseData[0].LAT, responseData[0].LON], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([responseData[0].LAT, responseData[0].LON]).addTo(map)
        .bindPopup(responseData[0].LBL)
        .openPopup();

      selector.on("change", function () {
        updateLineChart();

        console.log("Initial map lat and long")
        console.log(responseData[0].LAT)
        console.log(responseData[0].LON)
        // updateMap();


      });



      updateStationInfo(responseData)

      // Setup event listeners for changing station, etc.
      selector.on("change", function () {
        updateLineChart();
      });

      let xData = responseData.map(x => {
        let d = new Date(x.YEARMODA);
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

      // draw plot
      Plotly.newPlot('weatherLine', tempData, layout);
    });
}

function initializeStationIdsSelector() {
  let startDate = '2000-01-01';
  let endDate = '2018-12-31';
  let selector = d3.select("#select-station-id");

  d3.json(`api/v1.0/weatherdata/period/stations/${startDate}/${endDate}`).then(function (responseData) {
    console.log(responseData);

    responseData.forEach((station) => {
      selector
        .append("option")
        .text(station)
        .property("value", station);
    });
  });
}

function updateMap() {
  let startDate = '2000-01-01';
  let endDate = '2018-12-01';
  let selector = d3.select("#select-station-id");
  let selectedStationId = selector.property("value");

  console.log('Updating line chart:');
  console.log(startDate);
  console.log(endDate);
  console.log(selectedStationId);
  map.off();
  map.remove();

  d3.json(`api/v1.0/weatherdata/period/${startDate}/${endDate}/${selectedStationId}`)
    .then(function (responseData) {
      console.log("New latitude ", responseData[0].LAT)
      console.log("New longitude data", responseData[0].LON)

      map = L.map('mapid').setView([responseData[0].LAT, responseData[0].LON], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([responseData[0].LAT, responseData[0].LON]).addTo(map)
        .bindPopup(responseData[0].LBL)
        .openPopup();

    })
}


function updateLineChart() {
  let startDate = '2000-01-01';
  let endDate = '2018-12-01';
  let selector = d3.select("#select-station-id");
  let selectedStationId = selector.property("value");

  console.log('Updating line chart:');
  console.log(startDate);
  console.log(endDate);
  console.log(selectedStationId);

  d3.json(`api/v1.0/weatherdata/period/${startDate}/${endDate}/${selectedStationId}`)
    .then(function (responseData) {

      console.log(responseData)
      console.log(selector);

      updateStationInfo(responseData);

      let xData = responseData.map(x => {
        let d = new Date(x.YEARMODA);
        // return d.toISOString().split('T')[0];
        return d.toISOString().substring(0, 10);
      });

      let tempTrace = {
        x: [xData],
        y: [responseData.map(x => x.TEMP)],
      }

      let minTrace = {
        x: [xData],
        y: [responseData.map(x => x.MIN)],
      }

      let maxTrace = {
        x: [xData],
        y: [responseData.map(x => x.MAX)],
      }

      // restyle existing plots
      Plotly.restyle('weatherLine', tempTrace, 0);
      Plotly.restyle('weatherLine', minTrace, 1);
      Plotly.restyle('weatherLine', maxTrace, 2);

      updateMap();

    });
}


function updateStationInfo(data) {
  let metadataSelector = d3.select("#station-metadata");

  console.log(data);
  metadataSelector.selectAll("p").remove();

  metadataSelector
    .append("p")
    .text(`Station Name: ${data[0]['STATION NAME']}`);

  // metadataSelector
  // .append("p")
  // .text(`Location: ${data[0]['CTRY']}`);

  metadataSelector
    .append("p")
    .text(`State: ${data[0]['STATE']}`);


  metadataSelector
    .append("p")
    .text(`Elevation (meters): ${data[0]['ELEV(M)']}`);

  metadataSelector
    .append("p")
    .text(`Latitude: ${data[0]['LAT']}`);

  metadataSelector
    .append("p")
    .text(`Latitude: ${data[0]['LON']}`);

}

function updatelocation(err, rows) {
  function unpack(rows, key) {
    return rows.map(function (row) {
      return row[key];
    });
  }

  var data = [
    {
      type: "scattermapbox",
      text: unpack(rows, "#select-station-id"),
      lon: unpack(rows, "LON"),
      lat: unpack(rows, "LAT"),
      marker: { color: "fuchsia", size: 4 }
    }
  ];

  var layout = {
    dragmode: "zoom",
    mapbox: { style: "open-street-map", center: { lat: 38, lon: -90 }, zoom: 3 },
    margin: { r: 0, t: 0, b: 0, l: 0 }
  };

  Plotly.newPlot("myDiv", data, layout);
}




window.onload = function weatherBallon(cityID) {
  let startDate = '2000-01-01';
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