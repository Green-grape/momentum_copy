const body=document.querySelector('body');
const imageDes=document.querySelector('.js-bgDescription');
const imageLoc=document.querySelector('.js-bgLocation');
const imageInfo=document.querySelector('.js-imageInfo');

const IMG_NUMBER=10;
const IMG_API_KEY='xgvDl_HeNsBsQ1NTSrzeGYvpG7i8FCX43d0EBuTCNuQ';
const textOverflow_CLASS='textOverflowEllipsis';

function randomGenerator(){
    const number=Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function handleImage(img){
    const imageUrl=img.urls.full;
    body.style.backgroundImage=`url('${imageUrl}')`;
    body.style.backgroundRepeat='no-repeat';
}

function handleInfo(info){
    const a_tag=document.createElement('a');

    const imageUrlPage=info.links.html;
    let location=info.user.location;
    let description=info.description;
    a_tag.href=imageUrlPage;
    if(location===null){
        location='Unsplash'
    }
    if(description===null){
        description=info.alt_description;
        if(description===null){
            description='Unsplash LandScape Image';
        }
    }
    a_tag.innerText=description;
    a_tag.style.color='white';
    a_tag.classList.add(textOverflow_CLASS);
    imageLoc.innerHTML=location;
    imageDes.appendChild(a_tag);
}

function loadImage(){
    const loadOption={
        method:'GET',
        redirect:'follow'
    };
    const imageUrl=`https://api.unsplash.com/search/photos/?query=land-scape&color=green&orientation=landscape&client_id=${IMG_API_KEY}`;
    fetch(imageUrl,loadOption)
    .then(function(response){
        return response.json()
    }).then(function(json){
        console.log(json)
        handleImage(json.results[randomGenerator()]);
        handleInfo(json.results[randomGenerator()]);
    })
}

function init(){
    loadImage();
}

init();