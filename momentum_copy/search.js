const searchIcon=document.querySelector('.search .search-icon');
const search=document.querySelector('.search');
const searchInput=document.querySelector('.search .search-input');
const searchEngineBox=document.querySelector('.search .searchBox');
const searchEngineIcon=document.querySelector('.search .search-engine-icon');

const CURRENT_ENGINE='currentSearchEngine';
const IMAGE_LOC='./images/';
const IMAGE_FORMAT='.png';
const SEARCH_ENGINES=['google','naver'];

let input_value='';

/*' ' -> '+'(because of query format) */
function whitespaceReplacer(text){
    const splited_text=text.split(' ');
    let res=splited_text[0];
    for(let i=1;i<splited_text.length;i++){
        res=`${res}+${splited_text[i]}`;
    }
    return res;
}

function setFirstLetterUpper(text){
    let first=text[0];
    first=first.toUpperCase();
    return `${first}${text.slice(1)}`;
}

function setSearchIcon(){
    searchIcon.src='./images/search_icon.png';
    searchIcon.height=24;
    searchIcon.width=24;
}

function setSearchForm(engineName){
    let actionUrl=''
    if(engineName==='google'){
        actionUrl='https://www.google.com/search';
    }
    else if(engineName==='naver'){
        actionUrl='https://search.naver.com/search.naver'
    }
    search.action=actionUrl;
}

function setSearchInputName(engineName){
    if(engineName==='google') searchInput.name='q';
    else if(engineName==='naver') searchInput.name='query';  
}

function setSearchInputListener(){
    searchInput.addEventListener('input', function(event){
        setSearchInputName(localStorage.getItem(CURRENT_ENGINE));
    });
    searchInput.addEventListener('keydown', function(event){
        if(event.key==='Enter') search.submit();
    })
}

/*SearchEngines: Google, Naver*/
function initSearchEngineIcon(){
    let currentEngine=localStorage.getItem(CURRENT_ENGINE);
    if(currentEngine===null || currentEngine.length===0){
        currentEngine='google';
        localStorage.setItem(CURRENT_ENGINE, currentEngine);
    }

    let imgName='';
    if(currentEngine==='google') imgName='google';
    else if(currentEngine==='naver') imgName='naver';

    searchEngineIcon.src=`${IMAGE_LOC}${imgName}${IMAGE_FORMAT}`;
    searchEngineIcon.height=24;
    searchEngineIcon.width=24;
    searchEngineIcon.addEventListener('click', function(){
        searchEngineBox.classList.toggle('appearAct');
    })
    setSearchForm(currentEngine);
}

//Call after function 'initSearchEngineIcon' called
function changeSearchEngineIcon(engineName){
    if(engineName!==localStorage.getItem(CURRENT_ENGINE)){
        localStorage.setItem(CURRENT_ENGINE, engineName);
        searchEngineIcon.src=`${IMAGE_LOC}${engineName}${IMAGE_FORMAT}`;
        setSearchForm(engineName);
    }
}

function setSearchEngines(){
    const searchEngineUl=searchEngineBox.querySelector('ul');
    const searchEngineDes=searchEngineBox.querySelector('.searchBox-Des');
    searchEngineDes.innerText='Search With';
    for(let i=0;i<SEARCH_ENGINES.length;i++){
        const element=document.createElement('li');
        element.classList.add('relative');
        const engineName=document.createElement('span');
        const engineIcon=document.createElement('img');
        engineIcon.classList.add('inline-block');

        engineName.innerHTML=` ${setFirstLetterUpper(SEARCH_ENGINES[i])}`;
        engineIcon.src=`${IMAGE_LOC}${SEARCH_ENGINES[i]}${IMAGE_FORMAT}`;
        engineIcon.height=20;
        engineIcon.width=20;

        element.addEventListener('click',function(){
            changeSearchEngineIcon(SEARCH_ENGINES[i]);
        })

        element.append(engineIcon);
        element.append(engineName);
        searchEngineUl.append(element);
    }
}

function init(){
    setSearchIcon();
    setSearchInputListener();
    initSearchEngineIcon();
    setSearchEngines();
}

init();