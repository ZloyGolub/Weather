function geopositionNow() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve({ latitude, longitude }); //resolve for promise
                },
                error => {
                    reject(new Error(`Error get location: ${error.message}`));
                }
            )
        } else { reject(new Error("Geolocation is not supported by your browser.")) }
    })
}


const API_Key = "key=1c9e128d855b4654820145517240611";
const baseURL = "http://api.weatherapi.com/v1/current.json";

geopositionNow()
    .then(coords => {
        console.log(`Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`);
        let CurrentCity = `q=${coords.latitude},${coords.longitude}`//`q=Paris`;        
        let requestBuilded = `${baseURL}?${API_Key}&${CurrentCity}`;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", requestBuilded, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("Respone:", JSON.parse(xhr.responseText));// log resone
            } else if (xhr.readyState === 4) {
                console.log("Error", xhr.status, xhr.statusText); //log any errors
            }
        }
    })
    .catch(error => {
        console.error(error.message);
    });



//Interface language
const Languages = {
    ENGLISH: "English",
    SPANISH: "Spanish",
    FRENCH: "French",
    GERMAN: "German",
    ITALIAN: "Italian"
};

// let DefaultCity = `q=${geopositionNow()}`//`q=Paris`;
// const API_Key = "key=1c9e128d855b4654820145517240611";
// let requestBuilded = `http://api.weatherapi.com/v1/current.json?${API_Key}&${DefaultCity}`;
// const xhr = new XMLHttpRequest();
// xhr.open("GET", requestBuilded, true);
// xhr.send();

// xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//         console.log("Respone:", JSON.parse(xhr.responseText));// log resone
//     } else if (xhr.readyState === 4) {
//         console.log("Error", xhr.status, xhr.statusText); //log any errors
//     }
// }




function isLanguageSupported(lang) {
    return Object.values(Languages).includes(lang);
}

function validateLanguage(lang) {
    if (!isLanguageSupported(lang)) {
        throw new Error(`Language '${lang}' is not supported.`);
    }
}



//fake DB respone
let weather = {
    "paris": {
        name: "Paris",
        temp: 19.7,
        humidity: 90
    },
    "tokyo": {
        name: "Tokyo",
        temp: 14.7,
        humidity: 50
    },
    "nederlands": {
        name: "Nederlands",
        temp: 17.3,
        humidity: 30
    }
    , "san francisco": {
        name: "San Francisco",
        temp: 25.9,
        humidity: 40
    },
}

// for (let city in weather) {
//     console.log(weather[city].name);
// }

// Object.values(weather).forEach(city => { console.log(city.name) })

let button = document.querySelector("#Search");

let now = new Date();
let todayDate = document.querySelector("#today-time");

todayDate.innerHTML = `${weekDisplayerEnglish(now.getDay())} ${now.getDay()} ${monthDisplayerEnglish(now.getMonth(), Languages.ENGLISH)}
    ${now.getHours()}:${now.getMinutes()} year ${now.getFullYear()}
`;

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
    const humiditys = document.querySelector("#humdyti");
    const searchField = document.querySelector("#search-field");
    const searchFieldValue = searchField.value.trim();
    const displayedCity = document.querySelector("#city");
    if (searchFieldValue in weather) {
        console.log(`Temp ${weather[searchFieldValue].temp} humidyty ${weather[searchFieldValue].humidity} name  ${weather[searchFieldValue].name}`);
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
