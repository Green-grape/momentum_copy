const searchIcon=document.querySelector('.search .search-icon');
const searchEngines=document.querySelector('.search .search-engines');

function setSearchIcon(){
    searchIcon.src='./images/search_icon.png';
    searchIcon.height=32;
    searchIcon.width=32;
}

/*SearchEngine: Google, Naver*/
function setSearchEngines(){
    
}

function init(){
    setSearchIcon();
}

init();