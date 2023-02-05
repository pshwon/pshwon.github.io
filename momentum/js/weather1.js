
const API_KEY = "5c10377f1a979308cf98ae6c77dc2d70";

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position. coords.longitude;
    console.log("You live in", lat, lon);
    const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url).then((reponse) => reponse.json())
    .then((data) => { 
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}도,`

    } );
     //가지않아도 됨
}




function onGeoError(){
    console.log("Can't find you, No weather for you.");


}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError); 