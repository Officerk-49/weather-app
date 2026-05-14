import './styles.css';
import '@fontsource/roboto';
import { fetchOnLoad, fetchWeatherInfo } from './js/fetch.js';
import { switchUnit } from './js/ui.js';
import { unitBtnStyle } from './js/utils.js';

function weatherInfoCall() {
   const weatherForm = document.getElementById('weather-form');
   document.addEventListener('DOMContentLoaded', () => {
      fetchOnLoad();
   });

   weatherForm.addEventListener('submit', (e) => {
      e.preventDefault();
      fetchWeatherInfo();
   });
}

weatherInfoCall();
unitBtnStyle();
switchUnit();
