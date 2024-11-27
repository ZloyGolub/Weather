const Languages = {
    ENGLISH: "English",
    SPANISH: "Spanish",
    FRENCH: "French",
    GERMAN: "German",
    ITALIAN: "Italian"
};

let weather = {
    "paris": {
        name: "paris",
        temp: 19.7,
        humidity: 90
    },
    "tokyo": {
        name: "tokyo",
        temp: 14.7,
        humidity: 50
    },
    "nederlands": {
        name: "nederlands",
        temp: 17.3,
        humidity: 30
    }
    ,"san francisco": {
        name: "san francisco",
        temp: 25.9,
        humidity: 40
    },
}

let button = document.querySelector("#Search");

let now = new Date();
let todayDate = document.querySelector("#todayTime");


todayDate.innerHTML = `${weekDisplayer(now.getDay())} ${now.getDay()} ${monthDisplayerEnglish(now.getMonth(), Languages.ENGLISH)} 
    ${now.getHours()}:${now.getMinutes()} year ${now.getFullYear()}
`;

button.addEventListener("click", changeWeatherAproach);


function weekDisplayer(today, lang) {
    const weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weeks[today] || "Fatal error, weekDisplayer was called incorrectly";
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


function changeWeatherAproach(event){
    event.preventDefault();
    const tempeture = document.querySelector("#tempature");
    const humiditys = document.querySelector("#humdyti");
    const searchFieldValue = document.querySelector("#searchField").value.trim();
    const displayedCity = document.querySelector("#city");
    console.log(`Temp ${weather[searchFieldValue].temp} humidyty ${ weather[searchFieldValue].humidity} name  ${weather[searchFieldValue].name}`);

    //alert(`Temp ${weather[searchFieldValue].temp} humidyty ${ weather[searchFieldValue].humidity} name  ${weather[searchFieldValue].name}`);
    
    displayedCity.textContent = weather[searchFieldValue].name;
    tempeture.textContent = weather[searchFieldValue].temp;
    humiditys.textContent = weather[searchFieldValue].humidity;
}

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