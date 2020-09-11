const searchInput = document.querySelector('#city-search');
const form = document.querySelector('#form');
const weather = document.querySelector('.header-city-sub-degree');
const cityHeader = document.querySelector('.header-city-main');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then((reg) => console.log('service worker registered', reg))
    .catch((err) => console.log('service worker not registered', err))
}


const key = "a11f31efe5b1f8344d5a80a82c7bd1d6";

const URL = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;


async function getWeatherByLocation(city) {
    const res = await fetch(URL(city), {
        origin: "cors"
    });

    const resData = await res.json();
  
    addWeatherToPage(resData);
    localStorage.setItem('city', city);
}

 function addWeatherToPage(data) {

    const temp = kelvinToCelsius(data.main.temp);


    weather.textContent = `${temp}°`;
    const divIcon = document.createElement('span');

    divIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
    weather.appendChild(divIcon);
    cityHeader.textContent = `${searchInput.value.toUpperCase()} - ${data.sys.country}`;
    let now = new Date(data.sys.sunrise * 1000);
    document.querySelector('.header-city-sub').textContent = dateMaker(now);
     
}


function kelvinToCelsius(k) {
    return (k - 273.15).toFixed();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = searchInput.value;

    if (city) {
        getWeatherByLocation(city);
    }
})


function dateMaker(date) {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const t = date.getDate();
    const year = date.getFullYear();
    return `${day} ${t} ${month} ${year}`;
}




// get data to local storage
function localStorageData() {
    const cachedQuery = localStorage.getItem('city');
    if (cachedQuery) {
        getWeatherByLocation(cachedQuery);
    }
}

localStorageData();

