const searchInput = document.querySelector('#city-search');
const form = document.querySelector('form');
const displayResult = document.querySelector('.weather-result');


const key = 'b21f31efe5b1f8344d5a80a82c7bd1d6'

const URL = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

async function getWeatherByLocation(city) {
    const res = await fetch(URL(city), {
        origin: "cors"
    });
    const resData = await res.json();

    // console.log(resData, kelvinTocityresData.main.temp));
}

getWeatherByLocation('Yenagoa');

function kelvinToCelsius(k) {
    return (k - 273.15).toFixed(2);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = searchInput.value;

    if (city) {
        getWeatherByLocation(city);
    }
})