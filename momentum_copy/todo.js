const toDoForm=document.querySelector('.js-toDoForm'),
    toDoInput=toDoForm.querySelector('input');
const toDoList=document.querySelector('.js-toDoList');

const TODOS_LS='toDos';
const LISTSTYLE_CLASS='listStyle';
const BUTTONSTYLE_CLASS='cancelButtonStyle';
let toDos=[];
let idNumber=1;

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
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
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue=toDoInput.value;
    paintToDo(currentValue);
    console.log(currentValue);
}

function loadToDos(){
    const loadedToDos=localStorage.getItem(TODOS_LS);
    if(toDos!==null){
        const parsedToDos=JSON.parse(loadedToDos);
        parsedToDos.forEach(
            function(toDo){
                paintToDo(toDo.text);
            }
        );
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener('submit',handleSubmit);
}

init();


