import { unitBtnStyle } from './utils.js';

const timezone = document.getElementById('timezone');
const tempValue = document.querySelector('.temp-value');
const tempUnit = document.querySelector('.temp-unit');
const weatherIcon = document.getElementById('weather-icon');
const cityDiv = document.querySelector('.city');
const weatherDesc = document.querySelector('.weather-desc');
const windDiv = document.getElementById('wind-info');
const humidityDiv = document.getElementById('humidity-info');
const visibilityDiv = document.getElementById('visibility-info');
const pressureDiv = document.getElementById('pressure-info');

function convertToC() {
   let value = parseInt(tempValue.textContent);

   if (tempValue.dataset.unit === 'c') return;
   value = (value - 32) / 1.8;
   tempValue.textContent = Math.round(value);
   tempUnit.textContent = '°C';
   tempValue.dataset.unit = 'c';
}

function convertToF() {
   let value = parseInt(tempValue.textContent);

   if (tempValue.dataset.unit === 'f') return;
   value = value * 1.8 + 32;
   tempValue.textContent = Math.round(value);
   tempUnit.textContent = '°F';
   tempValue.dataset.unit = 'f';
}

export function switchUnit() {
   const cBtn = document.getElementById('celsius');
   const fBtn = document.getElementById('fahrenheit');

   cBtn.addEventListener('click', () => {
      unitBtnStyle();
      convertToC();
   });

   fBtn.addEventListener('click', () => {
      unitBtnStyle();
      convertToF();
   });
}

export function populateCard(
   localTime,
   temperature,
   icon,
   city,
   description,
   wind,
   humidity,
   visibility,
   pressure
) {
   timezone.textContent = localTime;
   tempValue.textContent = temperature;
   weatherIcon.src = icon;
   cityDiv.textContent = city;
   weatherDesc.textContent = description;
   windDiv.textContent = wind;
   humidityDiv.textContent = humidity;
   visibilityDiv.textContent = visibility;
   pressureDiv.textContent = pressure;
}
