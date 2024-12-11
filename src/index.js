//const axios = require("axios");
let cordinates = {//default кординаты лондона 
    latitude: 51.500736,
    longitude: -0.124658
}

function geopositionNow() {//функция для нахождения геолокации
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


//динамические данные на странице
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


const API_Key = "key=1c9e128d855b4654820145517240611";//хуй знает надо ли ключ сторить сейвово, я хуй знает как его сторить сейвово
const baseURL = "https://api.weatherapi.com/v1/current.json";
const forecastURL = "https://api.weatherapi.com/v1/forecast.json";
let forecastDays = 5;//всё равно будет 3 дня максимум потому что это бесплатный тариф апи
let forecastDaysStr = `days=${forecastDays}`;
//запуск функции на старте приложения => потом запуск запроса на получение погоды с результатов этой функцици
geopositionNow()
    .then(coords => {
        //console.log(`Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`);
        let CurrentCity = `q=${coords.latitude},${coords.longitude}`//`q=Paris`;        
        let requestBuilded = `${forecastURL}?${API_Key}&${CurrentCity}&${forecastDaysStr}`;
        axios.get(requestBuilded)
            .then(respone => {
                console.log(respone.data);
                ChangeAllFields(respone);
                // //легкий доступ к разделам
                // const location = respone.data.location;
                // const current = respone.data.current;
                // const condition = respone.data.current.condition;
                // const forecastday = respone.data.forecast.forecastday;
                // //основной блок
                // city.textContent = location.name;
                // region.textContent = location.region;
                // lastUpdateTime.textContent = current.last_updated;
                // humidity.textContent = current.humidity;
                // temp_c.textContent = `${current.temp_c}°C`;
                // wind_kph.textContent = `${current.wind_kph} km/h`;
                // uvInfo.textContent = `${current.uv}`;
                // descriptionText.textContent = `${getDayOfWeekFromEpoch(current.last_updated_epoch)} ${condition.text}`;
                // weatherPica.src = condition.icon;
                // //forecast блок
                // console.log(forecastday.length);
                // //forecastList.innerHTML = "";
                // forecastday.forEach(day => {
                //     const li = document.createElement("li");
                //     const weekDay = getDayOfWeekFromEpoch(day.date_epoch);
                //     console.log(weekDay);
                //     li.innerHTML = `${weekDay}<br>${day.day.maxtemp_c}°C<br>${day.day.mintemp_c}°C<br><img src="${day.day.condition.icon}"><br>${day.day.condition.text}`;
                //     forecastList.appendChild(li);
                // });
            })
            .catch(err => { console.log(err.message) })
    })//хуй знает как но я написла это своими ручками и оно работает
//так же как и xhr, разве что эроры не ловит но и хуй с ними

function ChangeAllFields(respone){
    //легкий доступ к разделам
    const location = respone.data.location;
    const current = respone.data.current;
    const condition = respone.data.current.condition;
    const forecastday = respone.data.forecast.forecastday;
    //основной блок
    city.textContent = location.name;
    region.textContent = location.region;
    lastUpdateTime.textContent = current.last_updated;
    humidity.textContent = current.humidity;
    temp_c.textContent = `${current.temp_c}°C`;
    wind_kph.textContent = `${current.wind_kph} km/h`;
    uvInfo.textContent = `${current.uv}`;
    descriptionText.textContent = `${getDayOfWeekFromEpoch(current.last_updated_epoch)} ${condition.text}`;
    weatherPica.src = condition.icon;
    //forecast блок
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
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    return dayOfWeek;
}


button.addEventListener("click", changeWeatherAproach);

function changeWeatherAproach(event) {
    event.preventDefault();
    if (searchcCity.value != null && searchcCity.value.length > 2){
    let CurrentCity = `q=${searchcCity.value.trim()}`;
    let requestBuilded = `${forecastURL}?${API_Key}&${CurrentCity}&${forecastDaysStr}`;
    axios.get(requestBuilded)
            .then(respone => {
                console.log(respone.data);
                ChangeAllFields(respone);
            })
            .catch(err => { console.log(err.message) })}
}


///--------------------------------------------
const searchField = document.getElementById("search-field");
const suggestionsContainer = document.getElementById("suggestions");

    // Example function to fetch data using Axios
    async function fetchSuggestions(query) {
        try {
            // Replace with your API URL
            const response = await axios.get(`https://api.weatherapi.com/v1/search.json?${API_Key}&q=${query}`);
            const cityName = response.data.map(city => city.name);
            console.log(cityName);
            return cityName; // Assume API returns a list of city names
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            return [];
        }
    }

    // Function to show suggestions
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

    // Listen for input in the search field
    searchField.addEventListener("input", async (e) => {
        const input = e.target.value;
        if (input && input.length > 2) {
            const matches = await fetchSuggestions(input);
            showSuggestions(matches);
        } else {
            suggestionsContainer.innerHTML = "";
        }
    });

    // Hide suggestions when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest("#suggestions") && e.target !== searchField) {
            suggestionsContainer.innerHTML = "";
        }
    });





// todayDate.innerHTML = `${weekDisplayerEnglish(now.getDay())} ${now.getDay()} ${monthDisplayerEnglish(now.getMonth(), Languages.ENGLISH)}
//     ${now.getHours()}:${now.getMinutes()} year ${now.getFullYear()}
// `;

function weekDisplayerEnglish(today, lang = Languages.ENGLISH) {
    validateLanguage(lang); // Ensure language is valid useless shit

    const weekDays = {
        [Languages.ENGLISH]: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        [Languages.SPANISH]: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        [Languages.FRENCH]: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
        [Languages.GERMAN]: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
        [Languages.ITALIAN]: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"]
    };

    return weekDays[lang][today] || "Invalid day index";
}

function monthDisplayerEnglish(today, lang = Languages.ENGLISH) {
    const monthEng = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const monthEsp = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const monthFr = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    // Handle languages
    switch (lang) {
        case Languages.ENGLISH:
            return monthEng[today] || "Fatal error, monthDisplayerEnglish was called incorrectly";
        case Languages.SPANISH:
            return monthEsp[today] || "Fatal error, monthDisplayerEnglish was called incorrectly";
        case Languages.FRENCH:
            return monthFr[today] || "Fatal error, monthDisplayerEnglish was called incorrectly";
        default:
            return "Language not supported";
    }
}

// function changeWeatherAproach(event) {
//     event.preventDefault();

//     // const tempeture = document.querySelector("#tempature");
//     // const humiditys = document.querySelector("#humidity");
//     // const searchField = document.querySelector("#search-field");
//     // const searchFieldValue = searchField.value.trim();
//     // const displayedCity = document.querySelector("#city");
//     // if (searchFieldValue in weather) {
//     //     console.log(`Temp ${weather[searchFieldValue].temp} humidity ${weather[searchFieldValue].humidity} name  ${weather[searchFieldValue].name}`);
//     //     displayedCity.textContent = weather[searchFieldValue].name;
//     //     tempeture.textContent = weather[searchFieldValue].temp;
//     //     humiditys.textContent = weather[searchFieldValue].humidity;
//     //     searchField.setCustomValidity("");
//     // } else {
//     //     searchField.setCustomValidity("City does't exist in the weather database.");
//     //     searchField.reportValidity();
//     // }
//     // //alert(`Temp ${weather[searchFieldValue].temp} humidyty ${ weather[searchFieldValue].humidity} name  ${weather[searchFieldValue].name}`);
// }
