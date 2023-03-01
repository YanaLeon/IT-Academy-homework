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

// ========================================================================
let imageContainer;
let image;
let imageSrc;
let imageWidth;
let imageHeigth;
// модальное окно
let galleryContainer = document.querySelector('.container-gallery');
let buttonContainer = document.querySelector('.container-button');
let title = document.querySelector('.title-text-discription');
let buttonStartGame = document.querySelector('.wrapper-button');
let modalWindow = document.querySelector('.modal-container');

buttonStartGame.addEventListener('click', showWindow);
function showWindow () {
    modalWindow.classList.remove('hide');
    modalWindow.classList.add('show');
    title.classList.add('hide');
    imageContainer = document.querySelector('#show-image');
    image = imageContainer.querySelector('.picture');
    imageSrc = image.src;
    imageWidth = image.offsetWidth;
    imageHeigth = image.offsetHeight;
}

// получаем размер для пазла 4x4, 5x5
let size = document.querySelectorAll('.choose-size');
let chooseSize = document.querySelector('.wrapper-button-choose');
// кнопка для возврата
let buttonReturn = document.createElement('button');
let buttonReturnButton = document.createElement('button');
buttonReturn.classList.add('wrapper-button');
buttonReturnButton.classList.add('start-game-button');
buttonReturnButton.textContent = 'Вернуться к выбору картины';
buttonReturn.appendChild(buttonReturnButton);

// кнопка начала игры заново
let main = document.querySelector('.main');
let navigatorContainer = document.querySelector('.container-navigation');
let divContainerButtonFooter = document.createElement('div');
divContainerButtonFooter.classList.add('container-button-footer');
document.body.appendChild(divContainerButtonFooter);
let buttonStartAgain = document.createElement('button');
let buttonStartAgainButton = document.createElement('button');
buttonStartAgain.classList.add('wrapper-button-footer');
buttonStartAgainButton.classList.add('start-game-button');
buttonStartAgainButton.textContent = 'Новая игра';
buttonStartAgain.appendChild(buttonStartAgainButton);
let buttonSave = document.createElement('button');
let buttonSaveButton = document.createElement('button');
buttonSave.classList.add('wrapper-button-footer');
buttonSaveButton.classList.add('start-game-button');
buttonSaveButton.textContent = 'Сохранить';
buttonSave.appendChild(buttonSaveButton);

// время игры
let divTimeMove = document.createElement('div');
divTimeMove.classList.add('div-time-move');
let time = document.createElement('span');
time.classList.add('time');

let lsDataGame = {};
let game; // переменная для объекта, глобальная чтобы удалить при возврате
let sizeChecked = size.checked; // здесь храним выбранный размер

chooseSize.addEventListener('click', getPuzzel);
function getPuzzel () {
    for (let radio of size) {
        if (radio.checked) {
            sizeChecked = radio.value;
        }
        radio.onchange = sizeChange;
        function sizeChange () {
            if (this.value) {
                sizeChecked = this.value;
            }
        }
    }
    // modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');
    arrow.classList.add('hide');
    sliderList.classList.add('hide');
    buttonStartGame.classList.add('hide');
    buttonContainer.appendChild(buttonReturn);
    buttonReturn.classList.remove('hide');
    divContainerButtonFooter.appendChild(buttonStartAgain);
    buttonStartAgain.classList.remove('hide');
    divContainerButtonFooter.appendChild(buttonSave);
    buttonSave.classList.remove('hide');
    divTimeMove.classList.remove('hide');
    divTimeMove.appendChild(time);
    document.body.insertBefore(divTimeMove, main);
    // создаём объект с игрой
    game = new Game (sizeChecked, imageSrc, imageWidth, imageHeigth);
    game.createElem();
    game.getMatrix();
    game.setStyleBackground();
    game.setStyleTransform(1);
    game.moveNodeClick();
    game.moveNodeTouch();
    game.moveNodeArrow();
    game.shuffle();
    game.shuffleTimer();
    time.innerHTML = game.createTime(game.counter);
}
// действия при возврате
buttonReturn.addEventListener('click', returnMainPage);
function returnMainPage () {
    game.delete();
    clearTimeout(game.timerTime);
    arrow.classList.remove('hide');
    sliderList.classList.remove('hide');
    buttonStartGame.classList.remove('hide');
    title.classList.remove('hide');
    buttonReturn.classList.add('hide');
    buttonStartAgain.classList.add('hide');
    divTimeMove.classList.add('hide');
}
// действия при нажатии на кнопку новая игра
// buttonStartAgain.addEventListener('click', stratNewGame);
function stratNewGame () {
    game.delete();
    game = new Game (sizeChecked, imageSrc, imageWidth, imageHeigth);
    game.createElem();
    game.getMatrix();
    game.setStyleBackground();
    game.setStyleTransform(1);
    game.moveNodeClick();
    game.moveNodeTouch();
    game.moveNodeArrow();
    game.shuffle();
    game.shuffleTimer();
}
// действие по кнопке сохранить
buttonSave.addEventListener('click', saveData);
function saveData () {
    game.getData ();
}
buttonStartAgain.addEventListener('click', setData);
function setData () {
    game.matrix = lsDataGame;
    
}
// создаём класс для игры
function Game (sizeChecked, imageSrc, imageWidth, imageHeigth) {
    let self = this;

    self.size = sizeChecked * sizeChecked;
    self.src = imageSrc;
    self.width = imageWidth;
    self.heigth = imageHeigth;
    self.matrix = [];
    self.itemNodeList;
    self.counter = 0;
}
Game.prototype.createElem = function () {
    let self = this;
    console.log(self);
    let field = document.createElement('div');
    field.classList.add('container-game');
    field.style.width = `${self.width}px`;
    field.style.height = `${self.heigth}px`;
    galleryContainer.appendChild(field);
    self.field = field;
    for (let i = 0; i < self.size; i++) {
        item = document.createElement('button');
        item.setAttribute('data-number', `${i + 1}`);
        item.style.backgroundImage = `url(${imageSrc})`;
        item.style.backgroundSize = `${self.width}px ${self.heigth}px`;
        item.textContent = `${i + 1}`;
        item.classList.add('item');
        if (sizeChecked == 4) {
            item.classList.add('item-four');
        } else if (sizeChecked == 5) {
            item.classList.add('item-five');
        }
        field.appendChild(item);
    }
}
Game.prototype.getMatrix = function () {
    let self = this;
    self.itemNodeList = Array.from(document.querySelectorAll('.item'));
    self.dataNumber = self.itemNodeList.map((item) => Number(item.dataset.number));
    let arrayX = [];
    let x = 0;
    for (let i = 0; i <= self.itemNodeList.length; i++) {
        if (x >= sizeChecked) {
            x = 0;
            self.matrix.push(arrayX);
            arrayX = [];
        }
        arrayX.push(i + 1);
        x++;
    }
    return self.matrix, self.itemNodeList;
}
Game.prototype.setStyleBackground = function () {
    let self = this;
    self.background = {};
    let backgroundPositionFourX = 33; // 100/3 = 33 позиция по x всегда начинается с 0, для следующих 3 клеток остаётся 100
    let backgroundPositionFourY = 33; // 100/3 = 33 позиция по x всегда начинается с 0, для следующих 3 клеток остаётся 100
    let backgroundPositionFiveX = 25; // 100/4 = 25 позиция по x всегда начинается с 0, для следующих 4 клеток остаётся 100
    let backgroundPositionFiveY = 25; // 100/4 = 25 позиция по x всегда начинается с 0, для следующих 4 клеток остаётся 100
    let posY = 0;
    let posX = 0;
    for (let y = 0; y < self.matrix.length; y++) {
        for (let x = 0; x < self.matrix[y].length; x++) {
            let value = self.matrix[y][x];
            let node = self.itemNodeList[value - 1];
            if (value === self.size) {
                node.style.backgroundImage = '';
            } else {
                node.style.backgroundPosition = `${posX}% ${posY}%`;
            }
            if (sizeChecked == 4) {
                if (posX < (backgroundPositionFourX * 3)) {
                    posX += backgroundPositionFourX;
                } else if (posX === (backgroundPositionFourY * 3)) {
                    posX = 0;
                    posY += backgroundPositionFourY;
                }
            } else if (sizeChecked == 5) {
                if (posX < (backgroundPositionFiveX * 4)) {
                    posX += backgroundPositionFiveX;
                } else if (posX === (backgroundPositionFiveY * 4)) {
                    posX = 0;
                    posY += backgroundPositionFiveY;
                }
            }
            self.background[self.matrix[y][x]] = {x: posX, y: posY}
            console.log(1)
        }
    }
}
Game.prototype.setStyleTransform = function (time) {
    let self = this;
    self.transform = {};
    for (let y = 0; y < self.matrix.length; y++) {
        for (let x = 0; x < self.matrix[y].length; x++) {
            let value = self.matrix[y][x];
            let node = self.itemNodeList[value - 1];
            let shiftTransform = 100;
            node.style.transitionDuration = `${time}s`;
            setTimeout( function() {
                node.style.transform = `translate3D(${x * shiftTransform}%, ${y * shiftTransform}%, 0)`;
                self.transform[self.matrix[y][x]] = {x: x * shiftTransform, y: y * shiftTransform};
            },0);
        }
    }
}
Game.prototype.moveNodeClick = function () {
    let self = this;
    self.element;
    self.lastElement = self.itemNodeList.length;
    self.positionElement;
    self.positionLastElement;
    let isChangePosition;

    self.field.addEventListener('click', eventForElementClick);
    function eventForElementClick (ev) {
        ev = ev || window.event;
        self.element = Number(ev.target.dataset.number);
        self.positionElement = self.getPosition (self.element);
        self.positionLastElement = self.getPosition(self.lastElement);
        isChangePosition = self.isChange(self.positionElement, self.positionLastElement);
        if (isChangePosition) {
            self.change(self.positionElement, self.positionLastElement, self.matrix);
            self.setStyleTransform(0.6);
        }
        self.checkWon();
        console.log(self)
    }
}
Game.prototype.getPosition = function (item) {
    let self = this;
    for (let y = 0; y < self.matrix.length; y++) {
        for (let x = 0; x < self.matrix[y].length; x++) {
            if (self.matrix[x][y] === item) {
                return {x, y}
            }
        }
    }
}
Game.prototype.isChange = function (position, positionLast) {
    let checkX = Math.abs(position.x - positionLast.x);
    let checkY = Math.abs(position.y - positionLast.y);
    if ((checkX === 1 || checkY === 1) &&
        (position.x === positionLast.x ||
        position.y === positionLast.y)) {
            return true;
    } else {
            return false;
    }
}
Game.prototype.change = function (position, positionLast, matrix) {
    let positionChange = matrix[positionLast.x][positionLast.y];
    matrix[positionLast.x][positionLast.y] = matrix[position.x][position.y];
    matrix[position.x][position.y] = positionChange;
}
Game.prototype.moveNodeTouch = function () {
    let self = this;
    self.element;
    self.lastElement = self.itemNodeList.length;
    self.positionElement;
    self.positionLastElement;
    let isChangePosition;

    self.field.addEventListener('touchstart', eventForElementTouch, false);
    function eventForElementTouch (ev) {
        ev = ev || window.event;
        ev.preventDefault();
        console.log(ev);
        self.element = Number(ev.touches[0].target.dataset.number);
        self.positionElement = self.getPosition (self.element);
        self.positionLastElement = self.getPosition(self.lastElement);
        isChangePosition = self.isChange(self.positionElement, self.positionLastElement);
        if (isChangePosition) {
            self.change(self.positionElement, self.positionLastElement, self.matrix);
            self.setStyleTransform(0.6);
        } else {
            self.vibro();
        }
    }
}
Game.prototype.moveNodeArrow = function () {
    let self = this;

    document.addEventListener('keydown', eventForElementArrow);
    function eventForElementArrow (ev) {
        ev = ev || window.event;
        console.log(ev.key);
        self.lastElement = self.itemNodeList.length;
        self.positionLastElement = self.getPosition(self.lastElement);
        self.positionElement = {
            x: self.positionLastElement.x,
            y: self.positionLastElement.y
        };
        console.log(self.positionLastElement, self.positionElement);
        if (ev.key === 'ArrowDown') {
            self.positionLastElement.x += 1;
        };
        if (ev.key === 'ArrowUp') {
            self.positionLastElement.x -= 1;
        };
        if (ev.key === 'ArrowLeft') {
            self.positionLastElement.y -= 1;
        };
        if (ev.key === 'ArrowRight') {
            self.positionLastElement.y += 1;
        };
        if (self.positionLastElement.y >= self.matrix.length || self.positionLastElement.y < 0 ||
            self.positionLastElement.x >= self.matrix.length || self.positionLastElement.x < 0) {
                return;
        };
        self.change(self.positionElement, self.positionLastElement, self.matrix);
        self.setStyleTransform(0.5);
    }
}
Game.prototype.vibro = function () {
    if ( navigator.vibrate ) {
        window.navigator.vibrate(100);
    }
}
Game.prototype.shuffle = function () {
    let self = this;

    self.positionLastElement = self.getPosition(self.lastElement);
    self.truePositionElement = self.checkTruePosition (self.positionLastElement, self.matrix);
    // console.log(self.positionLastElement, self.matrix, self.truePositionElement);
    function randomDiap(n,m) {
        return Math.floor(Math.random()*(m-n+1))+n;
    }
    let randomPosition =  randomDiap(0, self.truePositionElement.length - 1);
    let position = self.matrix[self.positionLastElement.x][self.positionLastElement.y];
    self.matrix[self.positionLastElement.x][self.positionLastElement.y] = self.matrix[self.truePositionElement[randomPosition].x][self.truePositionElement[randomPosition].y];
    self.matrix[self.truePositionElement[randomPosition].x][self.truePositionElement[randomPosition].y] = position;
    self.setStyleTransform(0.2);
}
Game.prototype.checkTruePosition = function (position, matrix) {
    let self = this;
    let array = [];
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (self.isChange({x, y} , position)) {
                array.push({x, y});
            }
        }
    }
    // console.log(array)
    return array;
}
let count = 250;
let timer = 0;
Game.prototype.shuffleTimer = function () {
    let self = this;
    self.lastElement = self.itemNodeList.length;
    self.positionLastElement = self.getPosition(self.lastElement);
    if (timer) { // хотя мы запретили повторное нажатие, на всякий случай также проверяем не идёт ли таймер
        console.log(1)
        clearInterval(timer);
        timer = 0;
    }
    console.log('Внимааание!');
    count = 250;
    timer = setInterval(shuffleCheck, 4);
    function shuffleCheck () {
        count--;
        console.log( 'счёт: ' + count, timer );
        self.shuffle();
        self.setStyleTransform(0.1);
        console.log(self)
        self.field.style.pointerEvents = 'none';
        document.body.style.opacity = '0.5';
        buttonReturn.disabled = true;
        buttonStartAgain.disabled = true;
        console.log(buttonReturn.disabled);
        if (!count) {
            clearInterval(timer);
            timer = 0;
            self.field.style.pointerEvents = 'auto';
            document.body.style.opacity = '1';
            buttonReturn.disabled = false;
            buttonStartAgain.disabled = false;
            self.setTime();
        }
    }
}
Game.prototype.delete = function () {
    let self = this;
    galleryContainer.removeChild(self.field)
}
Game.prototype.checkWon = function () {
    let self = this;
    self.matrxFlat = self.matrix.flat();
    for (let i = 0; i < self.matrxFlat.length; i++) {
        if (self.matrxFlat[i] !== self.dataNumber[i]) {
            console.log(false)
            return false;
        }
    }
    console.log(true);
    return true;
}

Game.prototype.createTime = function (time) {
    let minute = Math.floor(time / 60);
    let second = time % 60;
    if (second < 10){
        second = `0${second}`;
    } else if (minute < 10){
        minute = `0${minute}`
    }
    let timeForGame = `${minute}:${second}`
    return timeForGame;
}
Game.prototype.setTime = function () {
    let self = this;
    self.counter++;
    time.innerHTML = self.createTime (self.counter);
    self.timerTime;
    self.timerTime = setTimeout(() => {
        self.setTime();
    }, 1000);
}
Game.prototype.getData = function () {
    let self = this;
    lsDataGame = JSON.parse(JSON.stringify(self.matrix));
    console.log(lsDataGame)
}
// аудио для игры
let playList = [
    {
        title: 'Л.Бетховен Лунная соната',
        src: 'audio/L.Betxoven-lunnaya-conata.mp3'
    },
    {
        title: 'И.С.Бах. Ария из сюиты 3',
        src: 'audio/I.S.Bax-ariya.mp3',
    },
    {
        title: 'А.Вивальди Времена года. Лето',
        src: 'audio/A.Vivaldi-vremena-goda-leto.mp3',
    }
];
let player = document.querySelector('.player');
let play = document.querySelector('.play-button');
let playNext = document.querySelector('.play-next-button');
let playPrev = document.querySelector('.play-prev-button');
let textAudio = document.querySelector('.text-music');
let audio = new Audio ();
let isPlay = false;
let numberPlay = 0;

play.addEventListener('click', playAudio);
function playAudio () {
    audio.src = playList[numberPlay].src;
    audio.currentTime = 0;
    if (!isPlay) {
        isPlay = true;
        play.classList.add('pause-button');
        audio.play();
        textAudio.textContent = `${playList[numberPlay].title}`;
        audio.addEventListener('ended', palyNextAudio);
    } else {
        isPlay = false;
        play.classList.remove('pause-button');
        audio.pause();
    }
}
playNext.addEventListener('click', palyNextAudio);
function palyNextAudio () {
    numberPlay = numberPlay >= playList.length - 1 ? 0 : ++numberPlay;
    isPlay = false;
    playAudio();
    console.log(1)
}
playPrev.addEventListener('click', playPrevAudio);
function playPrevAudio () {
    if (numberPlay === 0) {
        numberPlay = playList.length;
    }
    numberPlay = numberPlay - 1;
    isPlay = false;
    playAudio();
}