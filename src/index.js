import './styles.css';
import '@fontsource/roboto';
import { fetchOnLoad, fetchWeatherInfo } from './js/fetch.js';
import { switchUnit } from './js/ui.js';
import { unitBtnStyle } from './js/utils.js';

function weatherInfoCall() {
   const weatherForm = document.getElementById('weather-form');
   const searchInput = document.getElementById('#weather-input');
   document.addEventListener('DOMContentLoaded', () => {
      fetchOnLoad();
   });

   weatherForm.addEventListener('submit', (e) => {
      e.preventDefault();
      searchInput.blur();
      fetchWeatherInfo();
   });
}

weatherInfoCall();
unitBtnStyle();
switchUnit();
