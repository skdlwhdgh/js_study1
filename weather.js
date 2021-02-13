const weather = document.querySelector(".js-weather");

const COORDS = 'coords';
const API_KEY = "d86d5cb961208a74581d89923659a75f";


function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `TEMPERATURE: ${temperature}\r
        LOCATION: ${place} COUNTRY: ${json.sys.country}`;
        weather.classList.add("weather");
    });
}


function saveCoords(coordsOBJ){
    localStorage.setItem(COORDS, JSON.stringify(coordsOBJ));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsOBJ = {
        latitude, /*latitude: latitude,*/
        longitude /*longitude: longitude*/
    };
    saveCoords(coordsOBJ);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Call GeoError");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
        console.log(parseCoords);
        // getWeather
    }
}

function init(){
    loadCoords();
}

init();