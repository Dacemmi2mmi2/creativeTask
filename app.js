const htmlElements = {
    main : document.querySelector('.main'),
    leftSlide : document.querySelector('.leftSlide'),
    rightSlide : document.querySelector('.rightSlide'),
    imgNew : document.querySelector('.imgNew'),
    titleOfTea : document.querySelector('.titleOfTea'),
    imgTitle : document.querySelector('.imgTitle'),
    imgsStrawberry : document.querySelectorAll('.strawberry'),
    imgsPeach : document.querySelectorAll('.peach'),
    allBackgroungImg : document.querySelectorAll('.bgi'),
    imgsRaspberry : document.querySelectorAll('.raspberry'),
    wrapperSlider : document.querySelector('.wrapperSlider'),
    itemsSlider : document.querySelectorAll('.item'),
    link : document.querySelector('.google'),
}


const variables = {
    status : 0,
    startTouch : null,
}


const showContent = function showContentFirstLoad() {
    setTimeout(() => {
        htmlElements.titleOfTea.style.top = 0;
        htmlElements.wrapperSlider.style.left = 0;
    }, 500);

    setTimeout(() => {
        htmlElements.imgTitle.style.transform = 'scale(' + 1 + ')';
    }, 900);

    setTimeout(() => {
        htmlElements.imgNew.style.top = 0;
    }, 1400);

    setTimeout(() => {
        htmlElements.imgsStrawberry.forEach(item => {
            item.style.transform = 'scale(' + 1 + ')';
        })
    }, 10);
    
    setTimeout(() => {
        htmlElements.leftSlide.style.transform = 'scale(' + 1 + ')';
        htmlElements.rightSlide.style.transform = 'scale(' + 1 + ')';
        htmlElements.link.style.opacity = 1;
    }, 1900);
}
showContent();


const showImg =  function showBgiForSlide(param) {
    htmlElements.allBackgroungImg.forEach(item => {
        if(item.classList[0] === param){
            item.style.opacity = 1;
            item.style.transform = 'scale(' + 1 + ')';
        }else{
            item.style.opacity = 0;
            item.style.transform = 'scale(' + 0 + ')';
        }
    });

    htmlElements.main.style.backgroundImage = `url('./img/${param}-BG.jpg')`;
    htmlElements.imgNew.style.backgroundImage = `url('./img/${param}-new.png')`;
    htmlElements.titleOfTea.style.backgroundImage = `url('./img/bg-img/${param}-tagline.png')`;
}


const leftSlide = function showLeftSlide() {
    variables.status = 1;

    htmlElements.itemsSlider.forEach(item => {
        if(item.offsetLeft < 0){
            item.style.opacity = 1;
            item.style.left = 0;
            showImg(item.classList[1]);
        }
        if(item.offsetLeft === 0){
            item.style.left = 100 + '%';
            item.style.opacity = 0;
        }
        if(item.offsetLeft > 0){
            item.style.left = -100 + '%';
            item.style.opacity = 0;
        }
    });

    setTimeout(() => {
        variables.status = 0;
    }, 520);
}


const rightSlide = function showRightSlide() {
    variables.status = 1;

    htmlElements.itemsSlider.forEach(item => {
        if(item.offsetLeft > 0){
            item.style.opacity = 1;
            item.style.left = 0;
            showImg(item.classList[1]);
        }
        if(item.offsetLeft === 0){
            item.style.left = -100 + '%';
            item.style.opacity = 0;
        }
        if(item.offsetLeft < 0){
            item.style.left = 100 + '%';
            item.style.opacity = 0;
        }
    });

    setTimeout(() => {
        variables.status = 0;
    }, 520);
}


htmlElements.main.addEventListener('click', event => {
    if(event.target.closest('.rightSlide') && variables.status === 0){
        rightSlide()
    }
    if(event.target.closest('.leftSlide') && variables.status === 0){
        leftSlide();
    }
});


// ============== swipe =================

htmlElements.wrapperSlider.addEventListener('touchstart', touchStart, false);
htmlElements.wrapperSlider.addEventListener('touchmove', touchMove, false);


function touchStart(event) {
    variables.startTouch = event.touches[0].clientX;
} 


function touchMove(event) {
    if(!variables.startTouch){
        return false;
    }

    let endTouch = event.touches[0].clientX,
        diff = endTouch - variables.startTouch;

    if(variables.status === 0){
        diff > 0 ? rightSlide() : leftSlide();
    }

    variables.startTouch = null;
}