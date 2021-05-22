// const toDoForm=document.querySelector('.js-toDoForm'),
//     toDoInput=toDoForm.querySelector('input');
// const toDoList=document.querySelector('.js-toDoList');
const toDoBox=document.querySelector('.toDo .js-toDoBox');
const startToDo=toDoBox.querySelector('.toDoBox-body-startToDo');
const description=startToDo.querySelector('.js-toDoBox-body-startToDo-description');
const startButton=startToDo.querySelector('.js-toDoBox-body-startToDo-button');
const toDoList=document.querySelector('.js-toDoBox-body-toDoList');

const toDoText=document.querySelector('.toDo .js-toDo-text');
const toDoForm=document.querySelector('.toDo .js-toDoBox-footer-form');
const toDoInput=toDoForm.querySelector('input');



const TODOS_LS='toDos';
const LISTSTYLE_CLASS='listStyle';
const BUTTONSTYLE_CLASS='cancelButtonStyle';
let toDos=[];
let idNumber=1;

//ToDoBox
function setToDoBoxHeader(){
    /*TD: Add option listener If it is needed*/
    const toDoBoxHeader=toDoBox.querySelector('.toDoBox-header');
    const toDoBoxTitle=toDoBoxHeader.querySelector('.js-toDoBox-header-title');
    const toDoBoxOption=toDoBoxHeader.querySelector('.js-toDoBox-header-option');

    toDoBoxTitle.innerHTML='ToDo';
}

//ToDoBox Body


//ToDOList 
function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function handleDescription(){
    if(toDos.length===0) description.style.visibility='visible';
    else description.style.visibility='hidden';
}

function handleDelete(event){
    const btn=event.target;
    const li=btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos=toDos.filter(function(toDo){
        return toDo.id!==parseInt(li.id);
    });
    toDos=cleanToDos;
    saveToDos();
    handleDescription();
}

function paintToDo(text){
    const li=document.createElement('li');
    const span=document.createElement('span');
    const delBtn=document.createElement('button');
    const newToDOId=idNumber;

    delBtn.innerText='❌';
    delBtn.addEventListener('click',handleDelete);
    delBtn.classList.add(BUTTONSTYLE_CLASS)
    span.innerText=text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id=newToDOId;
    li.classList.add(LISTSTYLE_CLASS);
    toDoList.appendChild(li);
   
    const toDoObj={
        text: text,
        id: newToDOId,
    }
    toDos.push(toDoObj);
    idNumber+=1;
    saveToDos();
    handleDescription();
}

function initToDo(){
    description.innerHTML='Add a todo to get start!';
    startButton.innerHTML='New ToDo';
    startButton.addEventListener('click', function(){
        startButton.style.visibility='hidden';
        toDoForm.style.visibility='visible';
    })
    handleDescription();
}

function loadToDos(){
    const loadedToDos=localStorage.getItem(TODOS_LS);
    if(loadedToDos===null || loadedToDos==='[]'){
        initToDo();
    }
    else{
        const parsedToDos=JSON.parse(loadedToDos);
        parsedToDos.forEach(
            function(toDo){
                paintToDo(toDo.text);
            }
        );
    }
}

function setToDoBoxBody(){
    loadToDos();
}

function setToDoBoxFooter(){
    toDoForm.addEventListener('submit', function(event){
        //handleSubmit
        event.preventDefault();
        const currentValue=toDoInput.value;
        paintToDo(currentValue);
        console.log(currentValue);
    });
}

function setToDoBox(){
    setToDoBoxHeader();
    setToDoBoxBody();
    setToDoBoxFooter();
}

//ToDoText
function setToDoText(){
    toDoText.innerHTML='ToDo';
    toDoText.addEventListener('click', function(){
        toDoBox.classList.toggle('appearAct');
        //Case: no todo list and click text:reset
        if(toDos.length===0){
            startButton.style.visibility='visible';
            toDoForm.style.visibility='hidden';
        }
    })
}

//ToDOList 
// function saveToDos(){
//     localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
// }

function init(){
   setToDoBox();
   setToDoText();
}

init();


