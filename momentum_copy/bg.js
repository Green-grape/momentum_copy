const body=document.querySelector('body');

const IMG_NUMBER=5;
const IMG_PREFIX='./images/landscape';
const IMG_POSTFIX='.jpg';

// function handleImageLoad(){
//     console.log('Finish Image Loading');
//     image.classList.add('bgImage');
//     body.appendChild(image);
// }

function paintImage(imgNumber){
    const image=new Image();
    image.src=`${IMG_PREFIX}${imgNumber}${IMG_POSTFIX}`;
    image.addEventListener('load', function(event){
        image.classList.add('bgImage');
        body.appendChild(image);
    });
}  

function randomGenerator(){
    const number=Math.ceil(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber=randomGenerator();
    paintImage(randomNumber);
}

init();