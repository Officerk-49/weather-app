export function unitBtnStyle() {
   const unitBtns = document.querySelectorAll('.unit-btn');
   unitBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
         unitBtns.forEach((b) => b.classList.remove('active'));
         btn.classList.add('active');
      });
   });
}

export function getIconSlug(code, night) {
   if (code >= 200 && code < 300) return 'thunderstorms';
   if (code >= 300 && code < 400) return 'drizzle';
   if (code >= 500 && code < 600) return 'rain';
   if (code >= 600 && code < 700) return 'snow';
   if (code === 700) return 'mist';
   if (code === 711) return 'smoke';
   if (code === 721) return 'haze';
   if (code === 731 || code === 761) return 'dust';
   if (code >= 741 && code < 781) return 'fog';
   if (code === 781) return 'tornado';
   if (code === 800) return night ? 'clear-night' : 'clear-day';
   if (code > 800) return night ? 'partly-cloudy-night' : 'partly-cloudy-day';
}

function getTempGradient(temp) {
   if (temp <= 0) return 'gradient-freezing';
   if (temp <= 10) return 'gradient-cold';
   if (temp <= 20) return 'gradient-mild';
   if (temp <= 30) return 'gradient-warm';
   return 'gradient-hot';
}

export function isNight(data) {
   const now = data.dt;
   return now < data.sys.sunrise || now > data.sys.sunset;
}

export function getGradient(code, temp, night) {
   if (code >= 200 && code < 300) return 'gradient-storm';
   if (code >= 300 && code < 400) return 'gradient-drizzle';
   if (code >= 500 && code < 600) return 'gradient-rain';
   if (code >= 600 && code < 700) return 'gradient-snow';
   if (code >= 700 && code < 800) return 'gradient-fog';

   if (night) return 'gradient-night';
   return getTempGradient(temp);
}
