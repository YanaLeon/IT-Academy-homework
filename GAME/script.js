// модальное окно
let galleryContainer = document.querySelector('.container-gallery');
let buttonContainer = document.querySelector('.container-button');
let title = document.querySelector('.title-text-discription');
let buttonStartGame = document.querySelector('.wrapper-button');
let modalWindow = document.querySelector('.modal-container');
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
    buttonSave.classList.remove('hide');

    // divTimeMove.classList.remove('hide');
    // divTimeMove.appendChild(time);
    // document.body.insertBefore(divTimeMove, main);

    // создаём объект с игрой
    game = new Game (sizeChecked, imageSrc, imageWidth, imageHeigth);
    let viewGame = new ViewGame (game);
    let controllerGame = new ControllerGame (game);
    game.start(viewGame);
    game.updateView();
    controllerGame.moveNodeClick();
    controllerGame.moveNodeTouch();
    controllerGame.moveNodeArrow();
    // time.innerHTML = game.createTime(game.counter);
}
// действия при нажатии на кнопку новая игра
buttonStartAgain.addEventListener('click', stratNewGame);
function stratNewGame () {
    game.delete();
    game = new Game (sizeChecked, imageSrc, imageWidth, imageHeigth);
    let viewGame = new ViewGame (game);
    let controllerGame = new ControllerGame (game);
    game.start(viewGame);
    game.updateView();
    controllerGame.moveNodeClick();
    controllerGame.moveNodeTouch();
    controllerGame.moveNodeArrow();
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
    // clearTimeout(game.timerTime);
    arrow.classList.remove('hide');
    sliderList.classList.remove('hide');
    buttonStartGame.classList.remove('hide');
    title.classList.remove('hide');
    buttonReturn.classList.add('hide');
    buttonStartAgain.classList.add('hide');
    divTimeMove.classList.add('hide');
}

// время игры
let divTimeMove = document.createElement('div');
divTimeMove.classList.add('div-time-move');
let time = document.createElement('span');
time.classList.add('time');

let lsDataGame = {};
// действие по кнопке сохранить
buttonSave.addEventListener('click', saveData);
function saveData () {
    game.getData ();
    buttonSave.classList.add('hide');
    divContainerButtonFooter.appendChild(buttonContinue);
    buttonContinue.classList.remove('hide');
}
buttonContinue.addEventListener('click', setData);
function setData () {
    game.matrix = lsDataGame;
    game.updateView(1);
    buttonContinue.classList.add('hide');
    buttonSave.classList.remove('hide');
}
// работа с AJAX
let ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
let updatePassword;
let stringName='LEONOVICH_PUZZEL_SAVE_GAME';

function storeInfo() {
    updatePassword=Math.random();
    console.log(1)
    $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'LOCKGET', n : stringName, p : updatePassword },
            success : lockGetReady, error : errorHandler
        }
    );
}
function lockGetReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else {
        // нам всё равно, что было прочитано -
        // всё равно перезаписываем
        const info={
            matrix : [1, 2, 3],
        };
        $.ajax( {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'UPDATE', n : stringName,
                    v : JSON.stringify(info), p : updatePassword },
                success : updateReady, error : errorHandler
            }
        );
    }
}
function updateReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
}
function restoreInfo() {
    $.ajax(
        {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'READ', n : stringName },
            success : readReady, error : errorHandler
        }
    );
}
function readReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else if ( callresult.result!="" ) {
        const info=JSON.parse(callresult.result);
        console.log(info);
    }
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}
storeInfo()
console.log(restoreInfo())
restoreInfo();
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