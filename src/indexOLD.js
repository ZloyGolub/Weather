let button = document.querySelector("#Search");


button.addEventListener("click", changeCityName);

function changeCityName(event){
    event.preventDefault(); //prevents page from full relading

    const searchFieldValue = document.querySelector("#searchField").value.trim();
    const displayedCity = document.querySelector("#city");
    if (searchFieldValue) {
        // Update the city name
        displayedCity.textContent = searchFieldValue;
        //alert(`City name updated to: ${searchFieldValue}`);
    } else {
        //alert("Please enter a city name.");
    }

}
function showLogAllElements(e, i) {
    console.log(i, e);
}

function showMT(e,i){
    if(i === 0 || i === 5){
        console.log(i, e);
    }
}

function tempature(e, i){
    console.log(`${i} ${e} tempature 18`);
}
let Weekdays = ["Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Sunday", "Suturday"];

//Weekdays.forEach((day, i) => console.log(i, day));

console.log("0--------");
Weekdays.forEach(showLogAllElements);
console.log(Weekdays);
console.log("1-------");
Weekdays.forEach(showMT);
console.log(Weekdays);

Weekdays.forEach(tempature);


let city = {
    name: "Default name",
    country: "Australia",
    year: 1323,
    degre: 4234
}

console.log(city);

let weather = {};
console.log(weather);

weather = {
    temp: 19,
    humidity: 50,
};

console.log(weather);
console.log(weather.temp,weather.humidity);

weather.windspeed = 3;

console.log(weather);


let forecast = [
    {
        day: "Friday",
        temp: 19
    },
    {
        day: "Sunday",
        temp: 19
    },
    {
        day: "Suturday ",
        temp: 19
    },
    {
        day: "Monday ",
        temp: 19
    }
]

console.log(forecast);


//легаси куски кода. удалить когда проект будет логически закончен



// geopositionNow()
//     .then(coords => {
//         console.log(`Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`);
//         let CurrentCity = `q=${coords.latitude},${coords.longitude}`//`q=Paris`;        
//         let requestBuilded = `${baseURL}?${API_Key}&${CurrentCity}`;
//         const xhr = new XMLHttpRequest();
//         xhr.open("GET", requestBuilded, true);
//         xhr.send();
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === 4 && xhr.status === 200) {
//                 console.log("Respone:", JSON.parse(xhr.responseText));// log resone
//             } else if (xhr.readyState === 4) {
//                 console.log("Error", xhr.status, xhr.statusText); //log any errors
//             }
//         }
//     })
//     .catch(error => {
//         console.error(error.message);
//     });

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


//fake DB respone
// let weather = {
//     "paris": {
//         name: "Paris",
//         temp: 19.7,
//         humidity: 90
//     },
//     "tokyo": {
//         name: "Tokyo",
//         temp: 14.7,
//         humidity: 50
//     },
//     "nederlands": {
//         name: "Nederlands",
//         temp: 17.3,
//         humidity: 30
//     }
//     , "san francisco": {
//         name: "San Francisco",
//         temp: 25.9,
//         humidity: 40
//     },
// }

// for (let city in weather) {
//     console.log(weather[city].name);
// }

// Object.values(weather).forEach(city => { console.log(city.name) })

/*//Interface language
const Languages = {
    ENGLISH: "English",
    SPANISH: "Spanish",
    FRENCH: "French",
    GERMAN: "German",
    ITALIAN: "Italian"
};


function isLanguageSupported(lang) {
    return Object.values(Languages).includes(lang);
}

function validateLanguage(lang) {
    if (!isLanguageSupported(lang)) {
        throw new Error(`Language '${lang}' is not supported.`);
    }
}

*/