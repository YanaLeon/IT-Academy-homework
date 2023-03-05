"use strict";
// создаём класс для игры
function Game (sizeChecked, imageWidth, imageHeigth) {
    let self = this;
    self.sizeChecked = Number(sizeChecked);
    self.size = sizeChecked * sizeChecked;
    self.width = imageWidth;
    self.heigth = imageHeigth;
    self.matrix = [];
    self.moveCount = 0;
    // self.check = 0;
}
Game.prototype.start = function (view) {
    let self = this;
    self.myView = view;
    if (self.myView) {
        self.myView.setStyleBackground();
    }
}
Game.prototype.updateView = function (time) {
    let self = this;
    if (self.myView) {
        self.myView.setStyleTransform(time);
    }
}
Game.prototype.createElem = function (src) {
    let self = this;
    self.src = src;
    let field = document.createElement('div');
    field.classList.add('container-game');
    field.style.width = `${self.width}px`;
    field.style.height = `${self.heigth}px`;
    galleryContainer.appendChild(field);
    self.field = field;
    for (let i = 0; i < self.size; i++) {
        let item = document.createElement('button');
        item.setAttribute('data-number', `${i + 1}`);
        item.style.backgroundImage = `url(${self.src})`;
        item.style.backgroundSize = `${self.width}px ${self.heigth}px`;
        item.classList.add('item');
        if (self.sizeChecked == 4) {
            item.classList.add('item-four');
        } else if (self.sizeChecked == 5) {
            item.classList.add('item-five');
        }
        field.appendChild(item);
    }
    self.itemNodeList = Array.from(document.querySelectorAll('.item'));
    self.dataNumber = self.itemNodeList.map((item) => Number(item.dataset.number));
}
Game.prototype.getMatrix = function () {
    let self = this;
    let arrayX = [];
    let x = 0;
    console.log(self.itemNodeList)
    for (let i = 0; i <= self.itemNodeList.length; i++) {
        if (x >= self.sizeChecked) {
            x = 0;
            self.matrix.push(arrayX);
            arrayX = [];
        }
        arrayX.push(i + 1);
        x++;
    }
    return self.matrix, self.itemNodeList;
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
Game.prototype.move = function (element) {
    let self = this;
    self.lastElement = self.itemNodeList.length;
    self.positionElement;
    self.positionLastElement;
    let isChangePosition;
    self.positionElement = self.getPosition (element);
    self.positionLastElement = self.getPosition(self.lastElement);
    isChangePosition = self.isChange(self.positionElement, self.positionLastElement);
    if (isChangePosition) {
        self.change(self.positionElement, self.positionLastElement, self.matrix);
        self.updateView(0.6);
        self.moveCount++;
        moveCount.textContent = self.moveCount;
        if (self.checkWon()) {
            self.myView.wonGameView();
        }
    } else {
        self.vibro();
    }
}
Game.prototype.moveArrow = function (positionElement, positionLast) {
    let self = this;
    if (positionLast.y >= self.matrix.length || positionLast.y < 0 ||
        positionLast.x >= self.matrix.length || positionLast.x < 0) {
            return;
    };
    self.change(positionElement, positionLast, self.matrix);
    self.updateView(0.5);
    self.moveCount++;
    moveCount.textContent = self.moveCount;
    if (self.checkWon()) {
        self.myView.wonGameView()
    }
}
Game.prototype.vibro = function () {
    if ( navigator.vibrate ) {
        window.navigator.vibrate(100);
    }
}
Game.prototype.shuffle = function () {
    let self = this;
    self.lastElement = self.itemNodeList.length;
    self.positionLastElement = self.getPosition(self.lastElement);
    self.truePositionElement = self.checkTruePosition (self.positionLastElement, self.matrix);
    function randomDiap(n,m) {
        return Math.floor(Math.random()*(m-n+1))+n;
    }
    let randomPosition =  randomDiap(0, self.truePositionElement.length - 1);
    let position = self.matrix[self.positionLastElement.x][self.positionLastElement.y];
    self.matrix[self.positionLastElement.x][self.positionLastElement.y] = self.matrix[self.truePositionElement[randomPosition].x][self.truePositionElement[randomPosition].y];
    self.matrix[self.truePositionElement[randomPosition].x][self.truePositionElement[randomPosition].y] = position;
    self.updateView(0.1);
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
    return array;
}
let count = 250;
let timer = 0;
Game.prototype.shuffleTimer = function () {
    let self = this;
    self.lastElement = self.itemNodeList.length;
    self.positionLastElement = self.getPosition(self.lastElement);
    if (timer) { // хотя мы запретили повторное нажатие, на всякий случай также проверяем не идёт ли таймер
        clearInterval(timer);
        timer = 0;
    }
    count = 250;
    timer = setInterval(shuffleCheck, 4);
    function shuffleCheck () {
        count--;
        self.shuffle();
        self.updateView(0.1);
        self.field.style.pointerEvents = 'none';
        document.body.style.opacity = '0.5';
        buttonReturn.disabled = true;
        buttonStartAgain.disabled = true;
        if (!count) {
            clearInterval(timer);
            timer = 0;
            self.field.style.pointerEvents = 'auto';
            document.body.style.opacity = '1';
            buttonReturn.disabled = false;
            buttonStartAgain.disabled = false;
        }
    }
}
Game.prototype.delete = function () {
    let self = this;
    galleryContainer.removeChild(self.field);
}
Game.prototype.checkWon = function () {
    let self = this;
    self.matrxFlat = self.matrix.flat();
    for (let i = 0; i < self.matrxFlat.length; i++) {
        if (self.matrxFlat[i] !== self.dataNumber[i]) {
            return false;
        }
    }
    return true;
}