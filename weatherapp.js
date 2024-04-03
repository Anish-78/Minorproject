const app = document.querySelector('.weather-app');
const nameOutput = document.querySelector('.name');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        const cityName = encodeURIComponent(e.target.innerHTML);
        fetchCityName(cityName);
        app.style.opacity = "0";
    });
});

btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (search.value.length === 0) {
        alert('Please enter the city name');
    } else {
        const cityName = encodeURIComponent(search.value);
        fetchCityName(cityName);
        search.value = "";
    }
});

function fetchCityName(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=94dd891924a718733889af7b72b92657`)
        .then(response => response.json())
        .then(data => {
            nameOutput.innerHTML = data.name;
            app.style.opacity = "1";
        })
        .catch(() => {
            alert("This city doesn't exist");
            app.style.opacity = "1";
        });
}