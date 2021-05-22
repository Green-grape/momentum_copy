const form=document.querySelector(".js-form");
const greeting=document.querySelector('.js-greetings');
const input=form.querySelector('input');

const USER_LS='currentUser';
const SHOWING_CLASS='showing';

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue=input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CLASS);
    form.addEventListener('submit', handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CLASS);
    greeting.classList.add(SHOWING_CLASS);
    greeting.innerText= `Hello ${text} !`;
}

function loadName(){
    const currentUser=localStorage.getItem(USER_LS);
    console.log(currentUser);
    if(currentUser === null){
        askForName();
    }
    else{
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();