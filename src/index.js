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

button.addEventListener("click", changeWeatherAproach);

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