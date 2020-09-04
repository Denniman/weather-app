const searchInput = document.querySelector('#city-search');
const form = document.querySelector('#form');
const displayResult = document.querySelector('.weather-result');
const weather = document.querySelector('.header-city-sub-degree');
const cityHeader = document.querySelector('.header-city-main');




const key = 'a11f31efe5b1f8344d5a80a82c7bd1d6'

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
    // displayResult.innerHTML = `<img src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weather"/>`;
    

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