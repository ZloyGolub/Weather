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