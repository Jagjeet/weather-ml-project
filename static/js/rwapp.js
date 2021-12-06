//https://codepen.io/mattfroese/pen/WaeYQV


const key = '';
if(key=='01958b23db95b19900f21d8326eecf3e') document.getElementById('temp').innerHTML = ('Remember to add your api key!');
lat == '36.333'
lon == '-119.95'


function weatherBallon( cityID ) {
	fetch('api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+key)  
	.then(function(resp) { return resp.json() }) // Convert data to json
	.then(function(data) {
		drawWeather(data);
	})
	.catch(function() {
		// catch any errors
	});
}
function drawWeather( d ) {
  var celcius = Math.round(parseFloat(d.main.temp)-273.15);
	var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);
  var description = d.weather[0].description; 
	
	document.getElementById('description').innerHTML = description;
	document.getElementById('temp').innerHTML = celcius + '&deg;';
	document.getElementById('location').innerHTML = d.name;
  
  if( description.indexOf('rain') > 0 ) {
  	document.body.className = 'rainy';
    image.src = 'reference-images\weather-showers-scattered.svg';
  } else if( description.indexOf('cloud') > 0 ) {
  	document.body.className = 'cloudy';
    image.src = 'reference-images\weather-few-clouds.svg';
  } else if( description.indexOf('snow') > 0 ) {
  	document.body.className = 'snow';
    image.src = 'reference-images\weather-snow.svg';
  } else {
  	document.body.className = 'clear';
    image.src = 'reference-images\weather-clear.svg';
  }
}
window.onload = function() {
	weatherBallon( 6167865 );
}
