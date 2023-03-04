"use strict";
let sliderList = document.querySelector('.slider-list');
let containerPicture = document.querySelector('.container-picture');
let slides = containerPicture.querySelectorAll('.picture-content');
let arrow = document.querySelector('.arrow');
let prev = document.querySelector('.left');
let next = document.querySelector('.right');
let slideIndex = 0;
let pictureSlideWidth = slides[0].offsetWidth;
slides[slideIndex].id = 'show-image';

// слайдер мышью на стрелки
function slide () {
    pictureSlideWidth = slides[0].offsetWidth;
    containerPicture.style.transform = `translate3d(-${slideIndex * pictureSlideWidth}px, 0px, 0px)`;
    prev.classList.toggle('disabled', slideIndex === 0);
    next.classList.toggle('disabled', slideIndex === slides.length - 1);
}
arrow.addEventListener('click', function(ev) {
    ev = ev || window.event;
    ev.preventDefault();
    let arrowClick = ev.target;
    if (arrowClick.classList.contains('right')) {
        slideIndex++;
        slides[slideIndex].id = 'show-image';
        slides[slideIndex - 1].id = '';
        
    } else if (arrowClick.classList.contains('left')) {
      slideIndex--;
      slides[slideIndex].id = 'show-image';
      slides[slideIndex + 1].id = '';
      
    } else {
      return;
    }
    slide();
});
// тач слайдер на жест слайд
let positionStartX = 0; // начальное касание
let positionX1 = 0; // здесь храним каждый сдвиг
let positionX2 = 0; // здесь храним разницу между предыдущим тач и событием сейчас
let positionFinal = 0; // определям длину и направление слайда
let positionStartY = 0; // запоминаем y чтобы понять был слайд или скролл
let positionY1 = 0;
let positionY2 = 0;
let isSwipe = false; // произошло событие слайд, начальное положение не произошло
let isScroll = false; // произошло событие скролл, начальное положение не произошло
let allow = true; // можно дигать слайд
let nextSlide = 0;
let prevSlide = 0;
let lastSlede = (slides.length - 1) * pictureSlideWidth; // запоминаем общую ширину всех слайдов для ограничения
let widthSwipe = slides[0].offsetWidth/4; // задаём минимальную длину движения, чтобы разрешить переключение слайда, если будет меньше, тогда будем сичтать, что событие не произошло
let heigthSwipe = slides[0].offsetHeight/4;

function startSwipe (ev) {
    ev = ev || window.event;
    ev.preventDefault();
    console.log(ev);
    if (allow) {
        nextSlide = (slideIndex + 1) * (-pictureSlideWidth);
        prevSlide = (slideIndex - 1) * (-pictureSlideWidth);
        positionStartX = ev.touches[0].pageX;
        positionX1 = ev.touches[0].pageX;
        positionStartY = ev.touches[0].pageY;
        document.addEventListener('touchmove', actionSwipe);
        document.addEventListener('touchend', endSwipe);
    }
}
function actionSwipe (ev) {
    ev = ev || window.event;
    let transform = -(slideIndex * pictureSlideWidth); // здесь храним каждый сдвиг, чтобы ограничить сдвиг
    positionX2 = positionX1 - ev.touches[0].pageX;
    positionX1 = ev.touches[0].pageX;
    positionY1 = ev.touches[0].pageY;

    if (!isSwipe && !isScroll) { // свайп или скролл
        positionY2 = Math.abs(positionStartY - positionY1);
        if (positionY2 > heigthSwipe || positionX2 === 0) { //
            isScroll = true;
            allow = false;
        } else if (positionY2 < heigthSwipe ) {
            isSwipe = true;
        }
    }
    if (isSwipe) { // не разрешаем на первом слайде листать влево
        if (slideIndex === 0) {
            if (positionStartX < positionX1) {
                setTransform(transform, 0);
                return;
            } else {
                allow = true;
            }
        }
    }
    if (slideIndex === slides.length - 1) { // не разрешаем на последнем слайде литсать вправо
        if (positionStartX > positionX1) {
            setTransform(transform, lastSlede);
            return;
        } else {
            allow = true;
        }
    }
}
function endSwipe (ev) {
    ev = ev || window.event;
    positionFinal = positionStartX - positionX1;
    isScroll = false;
    isSwipe = false;
    document.removeEventListener('touchmove', actionSwipe);
    document.removeEventListener('touchend', endSwipe);
    if (allow) {
        if (Math.abs(positionFinal) > widthSwipe) {
            if (positionStartX < positionX1) {
                slideIndex--;
                slides[slideIndex].id = 'show-image';
                slides[slideIndex + 1].id = '';
            } else if (positionStartX > positionX1) {
                slideIndex++;
                slides[slideIndex].id = 'show-image';
                slides[slideIndex - 1].id = '';
            }
        }
        if (positionStartX !== positionX1) {
            allow = false;
            slide();
        } else {
            allow = true;
        }
    } else {
        allow = true;
    }
}
function setTransform (transform, comapreTransform) {
    if (transform >= comapreTransform) {
        if (transform > comapreTransform) {
            containerPicture.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
        }
    }
    allow = false;
}
containerPicture.addEventListener('transitionend', () => allow = true);
sliderList.addEventListener('touchstart', startSwipe);