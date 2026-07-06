/* Agri360 shared weather helper — live data from Open-Meteo (free, no API key), no backend required */

const AGRI360_WEATHER_LOCATION = { name: 'Ambod, Mansa, Gandhinagar, Gujarat', lat: 23.2156, lon: 72.6369 };

const AGRI360_WEATHER_CODES = {
  0:{emoji:'☀️',label:'Clear sky'},
  1:{emoji:'🌤️',label:'Mainly clear'},
  2:{emoji:'⛅',label:'Partly cloudy'},
  3:{emoji:'☁️',label:'Overcast'},
  45:{emoji:'🌫️',label:'Fog'},
  48:{emoji:'🌫️',label:'Depositing rime fog'},
  51:{emoji:'🌦️',label:'Light drizzle'},
  53:{emoji:'🌦️',label:'Moderate drizzle'},
  55:{emoji:'🌧️',label:'Dense drizzle'},
  61:{emoji:'🌧️',label:'Slight rain'},
  63:{emoji:'🌧️',label:'Moderate rain'},
  65:{emoji:'🌧️',label:'Heavy rain'},
  71:{emoji:'🌨️',label:'Slight snow'},
  73:{emoji:'🌨️',label:'Moderate snow'},
  75:{emoji:'🌨️',label:'Heavy snow'},
  80:{emoji:'🌦️',label:'Rain showers'},
  81:{emoji:'🌧️',label:'Moderate showers'},
  82:{emoji:'⛈️',label:'Violent showers'},
  95:{emoji:'⛈️',label:'Thunderstorm'},
  96:{emoji:'⛈️',label:'Thunderstorm, hail'},
  99:{emoji:'⛈️',label:'Severe thunderstorm'},
};

function agri360WeatherInfo(code){
  return AGRI360_WEATHER_CODES[code] || {emoji:'🌡️', label:'Unknown'};
}

async function agri360FetchWeather(){
  const {lat, lon} = AGRI360_WEATHER_LOCATION;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=Asia%2FKolkata&forecast_days=4`;
  const res = await fetch(url);
  if(!res.ok) throw new Error('Weather request failed');
  return res.json();
}
