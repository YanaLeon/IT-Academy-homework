"use strict";
// действие по кнопке сохранить
let dataMatrix;
let dataSrc;
let dataSize;
let dataWidth;
let dataHeigth;
let dataMoveCount;
// действие по кнопке сохранить
buttonSave.addEventListener('click', saveData);
function saveData () {
    stateGame = 1; // для изменения кнопки
    dataMatrix = game.matrix;
    dataSize = game.sizeChecked;
    dataSrc = game.src;
    dataWidth = game.width;
    dataHeigth = game.heigth;
    dataMoveCount = game.moveCount;
    buttonSave.classList.add('hide');
    buttonContinue.classList.remove('hide');
    storeInfo();
}
// действие по кнопке продолжить
buttonContinue.addEventListener('click', setData);
function setData () {
    restoreInfo();
    buttonContinue.classList.add('hide');
    buttonSave.classList.remove('hide');
    stateGame = 2; // для изменения кнопки
}
// работа с AJAX
let ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
let updatePassword;
let stringNameSave = 'LEONOVICH_PUZZEL_SAVE_GAME';
let stringNameScore = 'LEONOVICH_PUZZEL_SCORE';
let stringNameSPA = 'LEONOVICH_PUZZEL_SPA';
// сохрание игры
function storeInfo() {
    updatePassword = Math.random();
    $.ajax({
        url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
        data : { f : 'LOCKGET', n : stringNameSave, p : updatePassword },
        success : lockGetReady, error : errorHandler
    });
}
function lockGetReady(callresult) {
    if ( callresult.error != undefined )
        console.log(callresult.error);
    else {
        let info = {
            matrix : dataMatrix,
            size : dataSize,
            src : dataSrc,
            width : dataWidth,
            heigth : dataHeigth,
            moveCount : dataMoveCount
        };
        $.ajax({
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'UPDATE', n : stringNameSave,
            v : JSON.stringify(info), p : updatePassword },
            success : updateReady, error : errorHandler
        });
    }
}
function updateReady(callresult) {
    if ( callresult.error != undefined ) {
        console.log(callresult.error);
    }
}
function restoreInfo() {
    $.ajax({
        url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
        data : { f : 'READ', n : stringNameSave },
        success : readReady, error : errorHandler
    });
}
function readReady(callresult) {
    if ( callresult.error != undefined ) {
        console.log(callresult.error);
    } else if ( callresult.result != "" ) {
        let info = JSON.parse(callresult.result);
        console.log(info);
        game.delete();
        game = new Game (info.size, info.width, info.heigth);
        let viewGame = new ViewGame (game);
        let controllerGame = new ControllerGame (game);
        game.createElem(info.src);
        game.getMatrix();
        game.start(viewGame);
        game.matrix = info.matrix;
        game.moveCount = info.moveCount;
        moveCount.textContent = game.moveCount;
        game.updateView();
        controllerGame.moveNodeClick();
        controllerGame.moveNodeTouch();
        controllerGame.moveNodeArrow();
    }
}

function errorHandler(jqXHR,statusStr,errorStr) {
    console.log(statusStr+' '+errorStr);
}

// действие при победе
let buttonWon = document.querySelector('.wrapper-button-won-ready');
let wonContainer = document.querySelector('.container-won-table');
let wonTable = document.querySelector('.won-table');
let modalWon = document.querySelector('.modal-window-won');
let closeContainer = document.querySelector('.container-close');
let noneText = document.querySelector('.null');
let inputWon = document.querySelector('.won-input');
let dataWinnerName;
// получаем данные при вводе имени
document.body.onchange = function () {
    console.log(inputWon.value)
    dataWinnerName = inputWon.value;
    dataMoveCount = game.moveCount;
}
// действие по кнопке готово, обнуляем игру, записываем имя и ходы
buttonWon.addEventListener('click', function () {
    if (dataWinnerName === '' || dataWinnerName === null || dataWinnerName === undefined) {
        noneText.textContent = 'Необходимо указать имя';
        inputWon.focus();
        return;
    } else {
        noneText.textContent = '';
        storeScore();
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        modalChoose.classList.remove('hide');
        modalWon.classList.add('hide');
        // game.shuffleTimer();
        game.moveCount = 0;
        moveCount.textContent = game.moveCount;
        inputWon.value = '';
    }
});
// действие по кнопке лучшие результаты
buttonScore.addEventListener('click', function () {
    restoreScore();
});
// cохранение результатов
function storeScore() {
    updatePassword = Math.random();
    $.ajax({
        url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
        data : { f : 'LOCKGET', n : stringNameScore, p : updatePassword },
        success : lockGetReadyScore, error : errorHandler2
    });
}
let score = [];
function lockGetReadyScore(callresult) {
    if ( callresult.error != undefined ){
        console.log(callresult.error);
    } else {
        score.push({userName : dataWinnerName,
                    scoreCount : dataMoveCount});
        $.ajax({
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'UPDATE', n : stringNameScore,
            v : JSON.stringify(score), p : updatePassword },
            success : updateReadyScore, error : errorHandler2
        });
    }
}
function updateReadyScore(callresult) {
    if ( callresult.error != undefined ) {
        console.log(callresult.error);
    }
}
function restoreScore() {
    $.ajax({
        url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
        data : { f : 'READ', n : stringNameScore },
        success : readReadyScore, error : errorHandler2
    });
}
let animation;
function readReadyScore(callresult) {
    if ( callresult.error != undefined ) {
        console.log(callresult.error);
    } else if ( callresult.result != "" ) {
        score = JSON.parse(callresult.result);
        score = score.sort(compareZP);
        if (score.length > 5) {
            score.pop();
        };
        wonContainer.appendChild(wonTable);
        for (let i = 0; i < score.length; i++) {
            let p = document.createElement('p');
            p.textContent = `${i + 1}. Имя: ${score[i].userName} Ходы: ${score[i].scoreCount}`;
            wonTable.appendChild(p)
        }
        wonContainer.classList.remove('hide');
        table.speedY = 5;
        table.position();
        main.style.pointerEvents = 'none';
        navigatorContainer.style.pointerEvents = 'none';
        animation = requestAnimationFrame(tick);
        buttonScore.disabled = true;
    }
}
closeContainer.addEventListener('click', function () {
    if (table.speedY === 0) {
        table.posY = 0;
        table.opacity = 0;
        wonTable.innerHTML = '';
        wonContainer.classList.add('hide');
        main.style.pointerEvents = 'auto';
        navigatorContainer.style.pointerEvents = 'auto';
        cancelAnimationFrame(animation);
        buttonScore.disabled = false;
    }
});
function errorHandler2(jqXHR,statusStr,errorStr) {
    console.log(statusStr+' '+errorStr);
};
function compareZP(a,b) {
    return a.scoreCount-b.scoreCount;
};
let table = {
    posX : document.body.offsetWidth/2,
    posY : 0,
    speedY : 0,
    opacity : 0,

    position : function() {
        wonContainer.style.transform =
        "translateX("+`${this.posX - wonContainer.offsetWidth/2}`+"px) translateY("+this.posY+"px) translateZ(0)";
        wonContainer.style.opacity = `${this.opacity}`;
    }
};
function tick() {
    table.posY += table.speedY;
    table.opacity += 0.01;
    if (table.posY > (document.body.offsetHeight/2 - wonContainer.offsetHeight/2)) {
        table.speedY = 0;
        table.opacity = 1;
        table.posY = document.body.offsetHeight/2 - wonContainer.offsetHeight/2;
    }
    table.position();
    animation = requestAnimationFrame(tick);
}

// SPA
// сохрание игры при каждой загрузке
function storeInfoSPA() {
    updatePassword = Math.random();
    $.ajax({
        url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
        data : { f : 'LOCKGET', n : stringNameSPA, p : updatePassword },
        success : lockGetReadySPA, error : errorHandlerSPA
    });
}
function lockGetReadySPA(callresult) {
    if ( callresult.error != undefined )
        console.log(callresult.error);
    else {
        let page = {
            matrix : matrxixPage,
            size : sizePage,
            src : srcPage,
            width : widthPage,
            heigth : heigthPage,
            moveCount : moveCountPage
        };
        $.ajax({
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'UPDATE', n : stringNameSPA,
            v : JSON.stringify(page), p : updatePassword },
            success : updateReadySPA, error : errorHandlerSPA
        });
    }
}
function updateReadySPA(callresult) {
    if ( callresult.error != undefined ) {
        console.log(callresult.error);
    }
}
function restoreInfoSPA() {
    $.ajax({
        url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
        data : { f : 'READ', n : stringNameSPA },
        success : readReadySPA, error : errorHandlerSPA
    });
}
function readReadySPA(callresult) {
    if ( callresult.error != undefined ) {
        console.log(callresult.error);
    } else if ( callresult.result != "" ) {
        let page = JSON.parse(callresult.result);
        console.log(page);
        // game.delete();
        game = new Game (page.size, page.width, page.heigth);
        let viewGame = new ViewGame (game);
        let controllerGame = new ControllerGame (game);
        game.createElem(page.src);
        stateGameSPA = 1;
        game.getMatrix();
        game.start(viewGame);
        game.matrix = page.matrix;
        game.moveCount = page.moveCount;
        moveCount.textContent = game.moveCount;
        game.updateView();
        controllerGame.moveNodeClick();
        controllerGame.moveNodeTouch();
        controllerGame.moveNodeArrow();
    }
}

function errorHandlerSPA(jqXHR,statusStr,errorStr) {
    console.log(statusStr+' '+errorStr);
}
// в закладке УРЛа будем хранить разделённые подчёркиваниями слова
// #Main - главная
// #Game - игра

// отслеживаем изменение закладки в УРЛе
// оно происходит при любом виде навигации
// в т.ч. при нажатии кнопок браузера ВПЕРЁД/НАЗАД
window.onhashchange = switchToStateFromURLHash;
let SPAState = {};
function switchToStateFromURLHash() {
    let URLHash = window.location.hash;

    // убираем из закладки УРЛа решётку
    // (по-хорошему надо ещё убирать восклицательный знак, если есть)
    let stateStr = URLHash.substr(1);

    if ( stateStr != "" ) {
      let parts = stateStr.split("_")
      SPAState = { pagename: parts[0] };
    } else {
        SPAState = {pagename:'Main'};
    }

    console.log('Новое состояние приложения:');
    console.log(SPAState);

    switch ( SPAState.pagename ) {
      case 'Main':
        game.delete();
        stateGameSPA = 2;
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
        break;
      case 'Game':
        if (stateGameSPA === 2) {
            restoreInfoSPA();
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
        }
        break;
    }
}
function switchToState(newState) {
    let stateStr = newState.pagename;
    location.hash = stateStr;
    // АВТОМАТИЧЕСКИ вызовется switchToStateFromURLHash()
    // т.к. закладка УРЛа изменилась (ЕСЛИ она действительно изменилась)
}
function switchToMainPage() {
    switchToState( { pagename:'Main' } );
}
function switchToGamePage() {
    switchToState( { pagename:'Game'} );
}
// переключаемся в состояние, которое сейчас прописано в закладке УРЛ
switchToStateFromURLHash();