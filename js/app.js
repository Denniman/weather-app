const key = 'b21f31efe5b1f8344d5a80a82c7bd1d6'

const URL = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;

async function getWeatherByLocation(location) {
    const res = await fetch(URL(location), {
        origin: "cors"
    });
    const resData = await res.json();

    // console.log(resData);
}

getWeatherByLocation('Yenagoa');