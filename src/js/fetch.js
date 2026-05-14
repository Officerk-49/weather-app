import { populateCard } from './ui.js';
import { getIconSlug, unitBtnStyle, getGradient, isNight } from './utils.js';
import { format } from 'date-fns';

export async function fetchOnLoad() {
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${'tokyo'}&appid=${'76c4c4a98d51ce1fbf51062266215d11'}&units=metric`;

   try {
      const res = await fetch(url);
      const data = await res.json();

      const timezoneOffset = data.timezone;
      const utc = Date.now();
      const rawTime = new Date(utc + timezoneOffset * 1000);
      const localTime = format(rawTime, 'EEE MMM do yyyy HH:mm');

      const night = isNight(data);

      const temperature = Math.round(data.main.temp);
      const code = data.weather[0].id;
      const icon = `https://cdn.meteocons.com/3.0.0-next.10/svg/fill/${getIconSlug(code, night)}.svg`;
      const city = data.name;
      const description = data.weather[0].description;
      const wind = Math.round(data.wind.speed) + ' m/s';
      const humidity = data.main.humidity + ' %';
      const visibility = data.visibility / 1000 + ' km';
      const pressure = data.main.pressure + ' hPa';

      document.body.className = getGradient(
         data.weather[0].id,
         data.main.temp,
         night
      );

      populateCard(
         localTime,
         temperature,
         icon,
         city,
         description,
         wind,
         humidity,
         visibility,
         pressure
      );
      unitBtnStyle();
   } catch (err) {
      alert('Error while fetching!! ' + err);
   }
}

export async function fetchWeatherInfo() {
   const tempValue = document.querySelector('.temp-value');
   const searchInput = document.getElementById('weather-input');
   const cityName = searchInput.value.toLowerCase();
   const errorField = document.getElementById('error-noti');
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${'76c4c4a98d51ce1fbf51062266215d11'}&units=metric`;

   if (!cityName.trim()) {
      errorField.textContent = 'Please enter a city name';
      errorField.hidden = false;
      setTimeout(() => {
         errorField.hidden = true;
      }, 3000);
      return;
   }

   try {
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok || data.cod !== 200) {
         errorField.textContent = `City not found: ${cityName}`;
         errorField.hidden = false;
         setTimeout(() => {
            errorField.hidden = true;
         }, 3000);
         return;
      }

      const timezoneOffset = data.timezone;
      const utc = Date.now();
      const rawTime = new Date(utc + timezoneOffset * 1000);
      const localTime = format(rawTime, 'EEE MMM do yyyy HH:mm');

      const night = isNight(data);

      let temperature = Math.round(data.main.temp);
      if (tempValue.dataset.unit === 'f') {
         temperature = Math.round(temperature * 1.8 + 32);
      }
      const code = data.weather[0].id;
      const icon = `https://cdn.meteocons.com/3.0.0-next.10/svg/fill/${getIconSlug(code, night)}.svg`;
      const city = data.name;
      const description = data.weather[0].description;
      const wind = Math.round(data.wind.speed) + ' m/s';
      const humidity = data.main.humidity + ' %';
      const visibility = data.visibility / 1000 + ' km';
      const pressure = data.main.pressure + ' hPa';

      document.body.className = getGradient(
         data.weather[0].id,
         data.main.temp,
         night
      );
      errorField.hidden = true;
      populateCard(
         localTime,
         temperature,
         icon,
         city,
         description,
         wind,
         humidity,
         visibility,
         pressure
      );
   } catch (err) {
      alert('Error while fetching!! ' + err);
   }
}
