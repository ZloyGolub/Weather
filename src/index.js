//const axios = require("axios");
let cordinates = {//default london coordinates
    latitude: 51.500736,
    longitude: -0.124658
}

function geopositionNow() {//function for finding geolocation
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve({ latitude, longitude }); //resolve for promise
                },
                error => {
                    resolve(cordinates);
                }
            )
        } else { reject(new Error("Geolocation is not supported by your browser.")) }
    })
}

//dynamic data on page
const searchcCity = document.querySelector("#search-field");
const city = document.querySelector("#city");
const region = document.querySelector("#region");
const lastUpdateTime = document.querySelector("#updated-time");
const humidity = document.querySelector("#humidity");
const temp_c = document.querySelector("#tempature");
const wind_kph = document.querySelector("#wind-speed")
const weatherPica = document.querySelector("#weather-icon");
const descriptionText = document.querySelector("#description-text")
const forecastList = document.querySelector("#forecast-elements")
const uvInfo = document.querySelector("#uv");

let button = document.querySelector("#Search");
let now = new Date();


const API_Key = "key=1c9e128d855b4654820145517240611";//I don't know if I need to save the key, I don't know how to save it
const baseURL = "https://api.weatherapi.com/v1/current.json";
const forecastURL = "https://api.weatherapi.com/v1/forecast.json";
let forecastDays = 3;//3 days max, api plan
let forecastDaysStr = `days=${forecastDays}`;
//launching a function at application startup => then launching a request to get the weather from the results of this function
geopositionNow()
    .then(coords => {
        let CurrentCity = `q=${coords.latitude},${coords.longitude}`;
        let requestBuilded = `${forecastURL}?${API_Key}&${CurrentCity}&${forecastDaysStr}`;
        return axios.get(requestBuilded);
    })
    .then(response => {
        console.log(response.data);
        ChangeAllFields(response);
    })
    .catch(err => { console.error("Error occurred:", err.message) })
    .finally(() => { console.log("Geolocation and forecast request completed.") });

//search on button
button.addEventListener("click", changeWeatherAproach);
function changeWeatherAproach(event) {
    event.preventDefault();
    if (searchcCity.value != null && searchcCity.value.length > 2) {
        let CurrentCity = `q=${searchcCity.value.trim()}`;
        searchcCity.value = "";
        let requestBuilded = `${forecastURL}?${API_Key}&${CurrentCity}&${forecastDaysStr}`;
        axios.get(requestBuilded)
            .then(respone => {
                console.log(respone.data);
                ChangeAllFields(respone);
            })
            .catch(err => { console.log(err.message) })
    }
}

function ChangeAllFields(respone) {
    //easy access to response sections
    const location = respone.data.location;
    const current = respone.data.current;
    const condition = respone.data.current.condition;
    const forecastday = respone.data.forecast.forecastday;
    //main block
    city.textContent = location.name;
    region.textContent = location.region;
    lastUpdateTime.textContent = current.last_updated;
    humidity.textContent = current.humidity;
    temp_c.textContent = `${current.temp_c}°C`;
    wind_kph.textContent = `${current.wind_kph} km/h`;
    uvInfo.textContent = `${current.uv}`;
    descriptionText.textContent = `${getDayOfWeekFromEpoch(current.last_updated_epoch)} ${condition.text}`;
    weatherPica.src = condition.icon;
    //forecast block
    console.log(forecastday.length);
    forecastList.innerHTML = "";
    forecastday.forEach(day => {
        const li = document.createElement("li");
        const weekDay = getDayOfWeekFromEpoch(day.date_epoch);
        console.log(weekDay);
        li.innerHTML = `${weekDay}<br>${day.day.maxtemp_c}°C<br>${day.day.mintemp_c}°C<br><img src="${day.day.condition.icon}"><br>${day.day.condition.text}`;
        forecastList.appendChild(li);
    });
}

function getDayOfWeekFromEpoch(timeEpoch) {
    // Create a new Date object from the epoch time (in milliseconds)
    const date = new Date(timeEpoch * 1000); // Convert seconds to milliseconds
    // Get the day of the week as a string
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });//somethin standart
    return dayOfWeek;
}

//sugestions
const searchField = document.getElementById("search-field");
const suggestionsContainer = document.getElementById("suggestions");

//example function to fetch data using Axios
async function fetchSuggestions(query) {
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/search.json?${API_Key}&q=${query}`);
        const cityName = response.data.map(city => city.name);
        console.log(cityName);
        return cityName;
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        return [];
    }
}
//show suggestions
function showSuggestions(matches) {
    suggestionsContainer.innerHTML = "";

    matches.forEach(city => {
        const suggestion = document.createElement("div");
        suggestion.className = "suggestion-item";
        suggestion.textContent = city;
        suggestion.addEventListener("click", () => {
            searchField.value = city;
            suggestionsContainer.innerHTML = "";
        });
        suggestionsContainer.appendChild(suggestion);
    });
}

//input in the search field
searchField.addEventListener("input", async (e) => {
    const input = e.target.value;
    if (input && input.length > 2) {
        const matches = await fetchSuggestions(input);
        showSuggestions(matches);
    } else {
        suggestionsContainer.innerHTML = "";
    }
});

//hide suggestions when clicking outside
document.addEventListener("click", (e) => {
    if (!e.target.closest("#suggestions") && e.target !== searchField) {
        suggestionsContainer.innerHTML = "";
    }
});
