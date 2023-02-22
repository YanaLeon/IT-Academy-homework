let head = document.querySelector('.head');
let score = document.querySelector('.score');
let scoreLeft = document.querySelector('.score-left');
let scoreRigth = document.querySelector('.score-rigth');
let fieldContainer = document.querySelector('.field-container');
let divButton = document.createElement('div');
head.insertBefore(divButton, score);
let racketLeftContainer = document.createElement('a');
racketLeftContainer.className = 'racket';
fieldContainer.appendChild(racketLeftContainer);
let racketRigthContainer = document.createElement('a');
racketRigthContainer.className = 'racket';
fieldContainer.appendChild(racketRigthContainer);
let ball = document.createElementNS("http://www.w3.org/2000/svg",'svg');
let ballWidth = 30;
let ballHeight = 30;

function createElement () {
    let button = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    button.setAttribute('width', '100');
    button.setAttribute('height', '100');
    divButton.appendChild(button);
    let buttonRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    buttonRect.setAttribute('x', '0');
    buttonRect.setAttribute('y', '30');
    buttonRect.setAttribute('width', '80');
    buttonRect.setAttribute('height', '50');
    buttonRect.setAttribute('fill', 'gray');
    button.appendChild(buttonRect);
    let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '15');
    text.setAttribute('y', '60');
    text.setAttribute('font-size', '20');
    text.textContent = 'старт!';
    button.appendChild(text);

    let field = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    field.setAttribute('width', '450');
    field.setAttribute('height', '400');
    fieldContainer.appendChild(field);
    let fieldRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    fieldRect.setAttribute('x', '0');
    fieldRect.setAttribute('y', '0');
    fieldRect.setAttribute('width', '450');
    fieldRect.setAttribute('height', '400');
    fieldRect.setAttribute('fill', 'rgb(239, 222, 38)');
    field.appendChild(fieldRect);

    let racketLeft = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    racketLeft.setAttribute('width', '15');
    racketLeft.setAttribute('height', '100');
    racketLeftContainer.appendChild(racketLeft);
    let racketLeftRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    racketLeftRect.setAttribute('x', '0');
    racketLeftRect.setAttribute('y', '0');
    racketLeftRect.setAttribute('width', '15');
    racketLeftRect.setAttribute('height', '100');
    racketLeftRect.setAttribute('fill', 'rgb(39, 123, 39)');
    racketLeft.appendChild(racketLeftRect);

    let racketRigth = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    racketRigth.setAttribute('width', '15');
    racketRigth.setAttribute('height', '100');
    racketRigthContainer.appendChild(racketRigth);
    let racketRigthRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    racketRigthRect.setAttribute('x', '0');
    racketRigthRect.setAttribute('y', '0');
    racketRigthRect.setAttribute('width', '15');
    racketRigthRect.setAttribute('height', '100');
    racketRigthRect.setAttribute('fill', 'rgb(29, 29, 159)');
    racketRigth.appendChild(racketRigthRect);

    ball.setAttribute('width', ballWidth);
    ball.setAttribute('height', ballHeight);
    ball.style.position = 'absolute';
    fieldContainer.appendChild(ball);
    let ballCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ballCircle.setAttribute('cx', '15');
    ballCircle.setAttribute('cy', '15');
    ballCircle.setAttribute('r', '15');
    ballCircle.setAttribute('fill', 'red');
    ball.appendChild(ballCircle);
}
createElement ()
let ballObject = {
    posX: fieldContainer.offsetWidth / 2 - ballWidth / 2,
    posY: fieldContainer.offsetHeight / 2 - ballHeight / 2,
    speedX: 0,
    speedY: 0,
    position: function () {
        ball.style.left = this.posX + "px";
        ball.style.top = this.posY + "px";
    },
    start: function () {
        this.posX = fieldContainer.offsetWidth / 2 - ballWidth / 2;
        this.posY = fieldContainer.offsetHeight / 2 - ballHeight / 2;
        ball.style.left = this.posX + "px";
        ball.style.top = this.posY + "px";
    },
};
ballObject.start();
let racketLeftObject = {
    posX: 0,
    posY: 0,
    speedY: 0,
    positionLeft: function () {
        racketLeftContainer.style.left = this.posX + "px";
        racketLeftContainer.style.top = this.posY + "px";
    },
    startLeft: function () {
        this.posX = 0;
        this.posY = 0;
        racketLeftContainer.style.left = this.posX + "px";
        racketLeftContainer.style.top = this.posY + "px";
    }
};
racketLeftObject.startLeft();
let racketRigthObject = {
    posX: fieldContainer.offsetWidth - racketRigthContainer.offsetWidth,
    posY: 0,
    speedY: 0,
    positionRigth: function () {
        racketRigthContainer.style.left = this.posX + "px";
        racketRigthContainer.style.top = this.posY + "px";
    },
    startRigth: function () {
        this.posX = fieldContainer.offsetWidth - racketRigthContainer.offsetWidth;
        this.posY = 0;
        racketRigthContainer.style.left = this.posX + "px";
        racketRigthContainer.style.top = this.posY + "px";
    }
};
racketRigthObject.startRigth();
let speed = 2; // заводим переменную для равномерной скорости двух ракеток вниз
let speed2 = -2; // заводим переменную для равномерной скорости двух ракеток вверх
document.addEventListener("keydown", moveRacket);
document.addEventListener("keyup", stopMoveRacket);
function moveRacket(ev) {
    ev = ev || window.event;
    if (ev.key === "Shift") {
        racketLeftObject.speedY = speed2;
    } else if (ev.key === "Control") {
        racketLeftObject.speedY = speed;
    }
    if (ev.key === "ArrowUp") {
        racketRigthObject.speedY = speed2;
    } else if (ev.key === "ArrowDown") {
        racketRigthObject.speedY = speed;
    }
}
function stopMoveRacket(ev) {
    console.log(ev.key);
    if (ev.key === "Shift") {
        racketLeftObject.speedY = 0;
    } else if (ev.key === "Control") {
        racketLeftObject.speedY = 0;
    }
    console.log(ev.key);
    if (ev.key === "ArrowDown") {
        racketRigthObject.speedY = 0;
    } else if (ev.key === "ArrowUp") {
        racketRigthObject.speedY = 0;
    }
}
divButton.addEventListener("click", updateGame);
function updateGame() {
    ballObject.speedX = 1;
    ballObject.speedY = 0.5;
    racketLeftObject.startLeft();
    racketRigthObject.startRigth();
    ballObject.start();
}
function start() {
    setInterval(move, 8);
}
start();
function move() {
    if (ballObject.posX + ballWidth > fieldContainer.offsetWidth) {
        ballObject.speedX = 0;
        ballObject.speedY = 0;
        ballObject.posX = fieldContainer.offsetWidth - ballWidth;
        scoreRigth.textContent = Number(scoreRigth.textContent) + 1;
    };
    if (ballObject.posX < 0) {
        ballObject.speedX = 0;
        ballObject.speedY = 0;
        ballObject.posX = 0;
        scoreLeft.textContent = Number(scoreLeft.textContent) + 1;
    };
    if (ballObject.posY + ballHeight > fieldContainer.offsetHeight) {
        ballObject.speedY = -ballObject.speedY;
        ballObject.posY = fieldContainer.offsetHeight - ballHeight;
    };
    if (ballObject.posY < 0) {
        ballObject.speedY = -ballObject.speedY;
        ballObject.posY = 0;
    };
    if (ballObject.posX <= racketLeftObject.posX + racketLeftContainer.offsetWidth &&
        ballObject.posY + ballHeight >= racketLeftObject.posY &&
        ballObject.posY <= racketLeftObject.posY + racketLeftContainer.offsetHeight) {
            ballObject.speedX = -ballObject.speedX;
            ballObject.posX = racketLeftContainer.offsetWidth;
            console.log(ballObject.posX, "stop");
        };
    if (ballObject.posX + ballWidth >= racketRigthObject.posX &&
        ballObject.posY + ballHeight >= racketRigthObject.posY &&
        ballObject.posY <= racketRigthObject.posY + racketRigthContainer.offsetHeight) {
            ballObject.speedX = -ballObject.speedX;
            ballObject.posX = racketRigthObject.posX - ballWidth;
            console.log(ballObject.posX, "ball");
        };
    ballObject.posX += ballObject.speedX;
    ballObject.posY += ballObject.speedY;
    ballObject.position();
    racketLeftObject.posY += racketLeftObject.speedY;
    racketLeftObject.positionLeft();
    racketRigthObject.posY += racketRigthObject.speedY;
    racketRigthObject.positionRigth();
    if (racketLeftObject.posY + racketLeftContainer.offsetHeight >= fieldContainer.offsetHeight) {
        racketLeftObject.speedY = 0;
        racketLeftObject.posY = fieldContainer.offsetHeight - racketLeftContainer.offsetHeight;
    }
    if (racketLeftObject.posY < 0) {
        racketLeftObject.speedY = 0;
        racketLeftObject.startLeft();
    }
    if (racketRigthObject.posY + racketRigthContainer.offsetHeight >= fieldContainer.offsetHeight) {
        racketLeftObject.speedY = 0;
        racketRigthObject.posY = fieldContainer.offsetHeight - racketRigthContainer.offsetHeight;
    }
    if (racketRigthObject.posY < 0) {
        racketRigthObject.speedY = 0;
        racketRigthObject.startRigth();
    }
}