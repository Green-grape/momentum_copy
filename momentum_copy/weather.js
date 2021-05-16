const weather=document.querySelector('.weather .js-weather');
const weatherIcon=document.querySelector('.weather .wi');
const weatherInfo=document.querySelector('.weather');
const weatherBox=document.querySelector('.weatherBox');

const COORDS='coords';
const API_KEY='3737f0ec223c58609d1e6a884366fa04';
const WEATHERSTYLE_CLASS='weatherStyle';
let todayWeather={};
let futureWeather={};
const dayDic={
    0:'MON',
    1:'TUE',
    2:'WEN',
    3:'THU',
    4:'FRI',
    5:'SAT',
    6:'SUN',
};

function setWeatherBoxHeader(){
    const header=weatherBox.querySelector('.weatherBox-header');
    const location=header.querySelector('.weatherBox-header-location');
    const description=header.querySelector('.weatherBox-header-des');

    location.innerHTML=todayWeather.name;
    description.innerHTML=todayWeather.weather[0].description;
}

function setWeatherBoxBody(){
    const body=weatherBox.querySelector('.weatherBox-body');
    const todayWeatherIcon=body.querySelector('.weatherBox-body-todayInfo .wi');
    const futureWeatherList=body.querySelector('ul');

    todayWeatherIcon.classList=weatherIcon.classList;
    todayWeatherIcon.innerHTML=weatherIcon.innerHTML;
    for(let i=1;i<=5;i++){
        const targetDay=futureWeather.daily[i];
        const li=document.createElement('li');
        li.classList.add('inline-block');
        const day=document.createElement('div');
        const dayWeather=document.createElement('div');
        const icon=document.createElement('i');
        icon.classList.add('wi');
        const maxTemp=document.createElement('span');
        const minTemp=document.createElement('span');

        li.append(day);
        li.append(dayWeather);
        dayWeather.append(icon);
        dayWeather.append(maxTemp);
        dayWeather.append(minTemp);

        const temp_date=new Date(targetDay.dt);
        day.innerHTML=dayDic[temp_date.getDay()];
        icon.classList.add(`wi-owm-day-${targetDay.weather[0].id}`);
        maxTemp.innerHTML=` ${targetDay.temp.max}`;
        minTemp.innerHTML=` ${targetDay.temp.min}`;
        futureWeatherList.append(li);
    }
}

function setWeatherBoxFooter(){
    const footer=weatherBox.querySelector('.weatherBox-footer');
    const footerLink=footer.querySelector('a');
    const image=document.createElement('img');
    image.src='./images/logo_white_cropped.png';
    image.width='64';
    image.height='27';
    footerLink.prepend(image);
}

function setWeatherBox(){
    setWeatherBoxHeader();
    setWeatherBoxBody();
    setWeatherBoxFooter();
}

function setWeatherInfo(){
    weatherInfo.addEventListener('click', function(){
        weatherBox.classList.toggle('appearAct');
    })
}

async function getWeatherToday(lat, lon){
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const json=await response.json();

    const currentTime=Date.parse(Date());
    const sunRise=Date.parse(Date(json.sys.sunrise*1000));
    const sunSet=Date.parse(Date(json.sys.sunset*1000));
    const weatherStatus=json.weather[0].id;
    const temp=json.main.temp;
    const place=json.name;

    let dayStatus='day';
    if(currentTime<=sunRise || sunSet<=currentTime) dayStatus='night';

    weatherIcon.classList.add(`wi-owm-${dayStatus}-${weatherStatus}`);
    weatherIcon.innerHTML=temp;
    weather.innerText=place;
    return json;
}

async function getWeatherFuture(lat, lon){
    const response=await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&units=metric`);
    const json=await response.json();
    return json;
}

async function getWeather(lat, lon){
    todayWeather=(await getWeatherToday(lat,lon));
    futureWeather=(await getWeatherFuture(lat,lon));
    console.log(todayWeather, futureWeather);
    setWeatherBox();
    setWeatherInfo();
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
    getWeather(latitude, longitude);
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