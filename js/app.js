const searchInput = document.querySelector('#city-search');
const form = document.querySelector('#form');
const displayResult = document.querySelector('.weather-result');
const weather = document.querySelector('.header-city-sub-degree');
const cityHeader = document.querySelector('.header-city-main');
require('dotenv').config();

// const key = process.env.API_KEY;
console.log(process.env);

const URL = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

async function getWeatherByLocation(city) {
    const res = await fetch(URL(city), {
        origin: "cors"
    });
    const resData = await res.json();

    addWeatherToPage(resData);
}

function addWeatherToPage(data) {
    const temp = kelvinToCelsius(data.main.temp);

    
    weather.textContent = `${temp}°C`;
    cityHeader.textContent = `${searchInput.value} - ${data.sys.country}`;
    

}

getWeatherByLocation();

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