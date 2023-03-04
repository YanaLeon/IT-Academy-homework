"use strict";
// модальное окно
let galleryContainer = document.querySelector('.container-gallery');
let buttonContainer = document.querySelector('.container-button');
let title = document.querySelector('.title-text-discription');
let buttonStartGame = document.querySelector('.wrapper-button');
let modalWindow = document.querySelector('.modal-container');
let modalChoose = document.querySelector('.modal-window');
// действия по кнопке начать игру
// во время открытия модального окна получаем данные
let imageContainer;
let image;
let imageSrc;
let imageWidth;
let imageHeigth;
buttonStartGame.addEventListener('click', showWindow);
function showWindow () {
    modalWindow.classList.remove('hide');
    modalWindow.classList.add('show');
    imageContainer = document.querySelector('#show-image');
    image = imageContainer.querySelector('.picture');
    imageSrc = image.src;
    imageWidth = image.offsetWidth;
    imageHeigth = image.offsetHeight;
}

// получаем размер для пазла 4x4, 5x5
let size = document.querySelectorAll('.choose-size');
let chooseSize = document.querySelector('.wrapper-button-choose');
let sizeChecked = size.checked;
chooseSize.addEventListener('click', getSize); // получаем размер
function getSize () {
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
}
// создаём игру
let main = document.querySelector('.main');
let navigatorContainer = document.querySelector('.container-navigation');
let move = document.querySelector('.wrapper-move');
let moveCount = document.querySelector('.move-number');
// создаём кнопки управления
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
let buttonContinue = document.createElement('button');
let buttonContinueButton = document.createElement('button');
buttonContinue.classList.add('wrapper-button-footer');
buttonContinueButton.classList.add('start-game-button');
buttonContinueButton.textContent = 'Продолжить';
buttonContinue.appendChild(buttonContinueButton);
let buttonScore = document.createElement('button');
let buttonScoreButton = document.createElement('button');
buttonScore.classList.add('wrapper-button-footer');
buttonScoreButton.classList.add('start-game-button');
buttonScoreButton.textContent = 'Лучшие результаты';
buttonScore.appendChild(buttonScoreButton);
let game; // переменная для объекта, глобальная чтобы удалить при возврате
let stateGame = 1; // храним состояние игры для управления кнопками 1 - нет сохранённой игры, 2 - есть сохранённая игра
chooseSize.addEventListener('click', getPuzzel);
function getPuzzel () {
    // удаляем элементы
    modalWindow.classList.add('hide');
    arrow.classList.add('hide');
    sliderList.classList.add('hide');
    title.classList.add('hide');
    buttonStartGame.classList.add('hide');
    //добавляем элементы
    buttonContainer.appendChild(buttonReturn);
    buttonReturn.classList.remove('hide');
    divContainerButtonFooter.appendChild(buttonStartAgain);
    buttonStartAgain.classList.remove('hide');
    divContainerButtonFooter.appendChild(buttonScore);
    buttonScore.classList.remove('hide');
    divContainerButtonFooter.appendChild(buttonSave);
    divContainerButtonFooter.appendChild(buttonContinue);
    if (stateGame === 2) {
        buttonSave.classList.add('hide');
        buttonContinue.classList.remove('hide');
    } else {
        buttonSave.classList.remove('hide');
        buttonContinue.classList.add('hide');
    }
    move.classList.remove('hide');
    moveCount.textContent = 0;

    // создаём объект с игрой
    game = new Game (sizeChecked, imageWidth, imageHeigth);
    let viewGame = new ViewGame (game);
    let controllerGame = new ControllerGame (game);
    game.createElem(imageSrc);
    game.getMatrix();
    game.start(viewGame);
    game.updateView();
    controllerGame.moveNodeClick();
    controllerGame.moveNodeTouch();
    controllerGame.moveNodeArrow();
    game.shuffle();
    // game.shuffleTimer();
}
// действия при нажатии на кнопку новая игра
buttonStartAgain.addEventListener('click', stratNewGame);
function stratNewGame () {
    game.shuffleTimer();
    game.moveCount = 0;
    moveCount.textContent = game.moveCount;
    console.log(game.moveCount)
}
// кнопка для возврата
let buttonReturn = document.createElement('button');
let buttonReturnButton = document.createElement('button');
buttonReturn.classList.add('wrapper-button');
buttonReturnButton.classList.add('start-game-button');
buttonReturnButton.textContent = 'Вернуться к выбору картины';
buttonReturn.appendChild(buttonReturnButton);
// действия при возврате
buttonReturn.addEventListener('click', returnMainPage);
function returnMainPage () {
    game.delete();
    arrow.classList.remove('hide');
    sliderList.classList.remove('hide');
    buttonStartGame.classList.remove('hide');
    title.classList.remove('hide');
    buttonReturn.classList.add('hide');
    buttonStartAgain.classList.add('hide');
    buttonScore.classList.add('hide');
    buttonSave.classList.add('hide');
    buttonContinue.classList.add('hide');
    move.classList.add('hide');
}
