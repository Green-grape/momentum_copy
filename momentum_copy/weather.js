const weather=document.querySelector('.js-weather');

const COORDS='coords';
const API_KEY='3737f0ec223c58609d1e6a884366fa04';
const WEATHERSTYLE_CLASS='weatherStyle'

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temp=json.main.temp;
        const place=json.name;
        weather.innerText=`${temp}º @ ${place}`
        weather.classList.add(WEATHERSTYLE_CLASS);
    })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude=position.coords.latitude; /*위도 */
    const longitude=position.coords.longitude; /*경도 */
    const coordsObj={
        latitude,longitude /*longitude:longitude */
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoFailer(){
    console.log("Can't access to geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoFailer);
}

function loadCoords(){
    const loadedCoords=localStorage.getItem(COORDS);
    if(loadedCoords===null){
        askForCoords();
    }
    else{
        const parseCoords=JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();