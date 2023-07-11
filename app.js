const apiKey = "ee2262140f9ebd7484db6a41de15ee99";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (city) => `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), {
        origin: "cros"
    });
    const respData = await resp.json();
    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    main.innerHTML = '';

    const today = new Date().getDay();

    for (let i = 0; i < 7; i++) {
        const forecastData = data.list[i];
        const temp = Ktoc(forecastData.main.temp);
        const date = getDayOfWeek(i, today);

        const weather = document.createElement('div');
        weather.classList.add('weather');
        if (i === 0) {
            weather.classList.add('today');
            weather.innerHTML = `
                <h2>${date}</h2>
                <p><img src="https://openweathermap.org/img/wn/${forecastData.weather[0].icon}.png" /> ${temp}°C</p>
                <p>Humidity: ${forecastData.main.humidity}%</p>
                <p>Wind Speed: ${forecastData.wind.speed} meter/sec</p>
                <small class="small">${forecastData.weather[0].description}</small>
            `;
        } else {
            weather.innerHTML = `
                <h2>${date}</h2>
                <p><img src="https://openweathermap.org/img/wn/${forecastData.weather[0].icon}.png" /> ${temp}°C</p>
                <small class="small">${forecastData.weather[0].description}</small>
            `;
        }

        main.appendChild(weather);
    }
}

function Ktoc(K) {
    return Math.floor(K - 273.15);
}

function getDayOfWeek(offset, today) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const index = (today + offset) % 7;
    return daysOfWeek[index];
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = search.value;
    if (city) {
        getWeatherByLocation(city);
    }
});
