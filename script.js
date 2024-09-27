import { API_KEY } from './api_config.js';

const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
};
// import {url, options} from './api/api_call.js';

const search = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector('.weather_icon');

const defaultCity = "Duisburg";
fetchData(defaultCity);

async function fetchData(city) {
    try {
        const response = await fetch(url + city, options);
        if (response.status === 400) { 
            document.querySelector('.error').style.display = "block";
            document.querySelector('.weather').style.display = "none";
        }
        else {
            const result = await response.json();
            updateWeather(result);
            console.log(result);
        }
    } catch (error) {
        console.error(error);
    }
}

function updateWeather(data) {
    document.querySelector(".city_name").innerHTML = data.location.name;
    document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°c";
    document.querySelector(".weather_status").innerHTML = data.current.condition.text;
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
    document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";

    if(data.current.condition.text == "Partly cloudy"){
        weatherIcon.src = "images/clouds.png";
    }
    else if(data.current.condition.text == "Mostly cloudy"){
        weatherIcon.src = "images/sun-cloud.png";
    }
    else if(data.current.condition.text == "Rain"){
        weatherIcon.src = "images/rain.png";
    }
    else if(data.current.condition.text == "Mist"){
        weatherIcon.src = "images/fog.png";
    }
    else if(data.current.condition.text == "Sunny"){
        weatherIcon.src = "images/sunny.png";
    }
    else if(data.current.condition.text == "Clear"){
        weatherIcon.src = "images/clear-sky.png";
    }
    // document.querySelectorAll(".weather").forEach(element => {
    //     element.style.display = "block";
        
    // });
    document.querySelectorAll(".error").forEach(element => {
        element.style.display = "none";
        
    });
}

searchButton.addEventListener("click", () => { 
    fetchData(search.value);
});
