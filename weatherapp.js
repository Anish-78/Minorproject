const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput'); // corrected selector
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

let cityInput = "Lucknow";
cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData(cityInput);
        app.style.opacity = "0";
    });
});

btn.addEventListener('click', (e) => { // changed event listener
    e.preventDefault();
    if (search.value.length == 0) {
        alert('Please enter the city name');
    } else {
        cityInput = search.value;
        app.style.opacity = "0";
        fetchWeatherData(cityInput);
        search.value = "";
    }
});

function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    const date = new Date(`${month}/${day}/${year}`); // corrected template literal
    const dayOfWeek = weekday[date.getDay()];

    return dayOfWeek;
}

function fetchWeatherData(cityInput) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=94dd891924a718733889af7b72b92657`)
        .then(response => response.json())
        .then(data => {
            let a = `${data.main.temp}`; // corrected template literal
            a = Math.floor(a - 273.15);
            temp.innerHTML = `${a}&#176;`; // corrected template literal
            conditionOutput.innerHTML = data.weather[0].description;
            const date = new Date(data.dt * 1000);
            const y = date.getFullYear();
            const m = date.getMonth() + 1;
            const d = date.getDate();
            const time = date.toLocaleTimeString();
            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`; // corrected template literal
            timeOutput.innerHTML = time;
            nameOutput.innerHTML = data.name;
            const iconId = data.weather[0].icon;
            icon.src = `http://openweathermap.org/img/w/${iconId}.png`; // corrected template literal
            cloudOutput.innerHTML = `${data.clouds.all}%`; // corrected template literal
            humidityOutput.innerHTML = `${data.main.humidity}%`; // corrected template literal
            windOutput.innerHTML = `${data.wind.speed} m/s`; // corrected template literal

            let timeOfDay = "day";
            if (data.dt < data.sys.sunrise || data.dt > data.sys.sunset) {
                timeOfDay = "night";
            }

            const weatherCode = data.weather[0].id;
            if (weatherCode >= 200 && weatherCode <= 232) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/thunderstorm.jpg)`; // corrected template literal
            } else if (weatherCode >= 300 && weatherCode <= 321) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/drizzle.jpg)`; // corrected template literal
            } else if (weatherCode >= 500 && weatherCode <= 531) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/rain.jpg)`; // corrected template literal
            } else if (weatherCode >= 600 && weatherCode <= 622) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/snow.jpg)`; // corrected template literal
            } else if (weatherCode >= 701 && weatherCode <= 781) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/mist.jpg)`; // corrected template literal
            } else if (weatherCode === 800) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`; // corrected template literal
            } else if (weatherCode >= 801 && weatherCode <= 804) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/clouds.jpg)`; // corrected template literal
            }

            app.style.opacity = "1";
        })
        .catch(() => {
            alert("This city doesn't exist");
            app.style.opacity = "1";
        });
}
