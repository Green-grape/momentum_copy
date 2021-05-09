const clockContainer = document.querySelector('.js-clock');
const clockTitle = clockContainer.querySelector('h1');

function refacTime(num){
    return num > 9 ? `${num}`:`0${num}`;
}

function getTime(){
    const date=new Date();
    const minutes=refacTime(date.getMinutes());
    const hours=refacTime(date.getHours());
    clockTitle.innerText=`${hours}:${minutes}`;
}

function setClock(){
    getTime();
}

function init(){
    setClock();
    setInterval(setClock,1000);
}

init();