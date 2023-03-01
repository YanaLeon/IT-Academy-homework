// создаём класс для игры
function Game (sizeChecked, imageSrc, imageWidth, imageHeigth, view) {
    let self = this;
    self.size = sizeChecked * sizeChecked;
    self.src = imageSrc;
    self.width = imageWidth;
    self.heigth = imageHeigth;
    self.matrix = [];
    self.itemNodeList;

}
Game.prototype.start = function (view) {
    let self = this;
    self.createElem();
    self.getMatrix();
    self.myView = view;
    if (self.myView) {
        self.myView.setStyleBackground();
    }
    self.shuffle();
    self.shuffleTimer();
}
Game.prototype.updateView = function (time) {
    let self = this;
    console.log(self.myView)
    if (self.myView) {
        self.myView.setStyleTransform(time);
    }
}
Game.prototype.createElem = function () {
    let self = this;
    console.log(self)
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
Game.prototype.move = function (element) { // controller
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
        self.checkWon();
    } else {
        self.vibro();
    }
    console.log(element)
}
Game.prototype.moveArrow = function (positionElement, positionLast) { // controller
    let self = this;
    if (positionLast.y >= self.matrix.length || positionLast.y < 0 ||
        positionLast.x >= self.matrix.length || positionLast.x < 0) {
            return;
    };
    self.change(positionElement, positionLast, self.matrix);
    self.updateView(0.5);
    self.checkWon();
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
    // console.log(self.positionLastElement, self.matrix, self.truePositionElement);
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
    console.log(array)
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
        console.log( 'счёт: ' + count);
        self.shuffle();
        self.updateView(0.1);
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
        }
    }
}
Game.prototype.delete = function () { // controller
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
    // lsDataGame = JSON.parse(JSON.stringify(self.matrix));
    // console.log(lsDataGame)
    return self.matrix;
}