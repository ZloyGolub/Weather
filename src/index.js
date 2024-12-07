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
const city = document.querySelector("#city");
const region = document.querySelector("#region");
const lastUpdateTime = document.querySelector("#updated-time");
const humidity = document.querySelector("#humidity");
const temp_c = document.querySelector("#tempature");
const wind_kph = document.querySelector("#wind-speed")
const weatherPica = document.querySelector("#weather-icon");
const descriptionText =  document.querySelector("#description-text")

let button = document.querySelector("#Search");
let now = new Date();


const API_Key = "key=1c9e128d855b4654820145517240611";//хуй знает надо ли ключ сторить сейвово, я хуй знает как его сторить сейвово
const baseURL = "http://api.weatherapi.com/v1/current.json";
//запуск функции на старте приложения => потом запуск запроса на получение погоды с результатов этой функцици
geopositionNow()
.then(coords => {
    console.log(`Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`);
    let CurrentCity = `q=${coords.latitude},${coords.longitude}`//`q=Paris`;        
    let requestBuilded = `${baseURL}?${API_Key}&${CurrentCity}`;
    axios.get(requestBuilded)
    .then(respone => {
        console.log(respone.data);
        const location = respone.data.location;
        const current = respone.data.current;
        const condition = respone.data.current.condition; 

        city.textContent = location.name;
        region.textContent = location.region;

        lastUpdateTime.textContent = current.last_updated;
        humidity.textContent = current.humidity;
        temp_c.textContent = `${current.temp_c}°C`;
        wind_kph.textContent = `${current.wind_kph} km/h`;
        descriptionText.textContent = condition.text;


        weatherPica.src = condition.icon;
    })
    .catch(err => {console.log(err.message)})
})//хуй знает как но я написла это своими ручками и оно работает
//так же как и xhr, разве что эроры не ловит но и хуй с ними
















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

button.addEventListener("click", changeWeatherAproach);

function changeWeatherAproach(event) {
    event.preventDefault();

    const tempeture = document.querySelector("#tempature");
    const humiditys = document.querySelector("#humidity");
    const searchField = document.querySelector("#search-field");
    const searchFieldValue = searchField.value.trim();
    const displayedCity = document.querySelector("#city");
    if (searchFieldValue in weather) {
        console.log(`Temp ${weather[searchFieldValue].temp} humidity ${weather[searchFieldValue].humidity} name  ${weather[searchFieldValue].name}`);
        displayedCity.textContent = weather[searchFieldValue].name;
        tempeture.textContent = weather[searchFieldValue].temp;
        humiditys.textContent = weather[searchFieldValue].humidity;
        searchField.setCustomValidity("");
    } else {
        searchField.setCustomValidity("City does't exist in the weather database.");
        searchField.reportValidity();
    }
    //alert(`Temp ${weather[searchFieldValue].temp} humidyty ${ weather[searchFieldValue].humidity} name  ${weather[searchFieldValue].name}`);
}
