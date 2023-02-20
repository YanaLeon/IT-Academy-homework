window.addEventListener("DOMContentLoaded", function () {
  let field = document.querySelector(".field");
  let fieldObject = {
    width: 450,
    height: 400,
  };
  field.style.width = fieldObject.width + "px";
  field.style.height = fieldObject.height + "px";
  let buttonStart = document.querySelector(".start");
  let scoreLeft = document.querySelector(".score-left");
  let scoreRigth = document.querySelector(".score-rigth");
  let racketLeft = document.querySelector(".racket-left");
  let racketRigth = document.querySelector(".recket-rigth");
  let ball = document.querySelector(".ball");
  let centerFieldX = field.offsetWidth / 2;
  let centerFieldY = field.offsetHeight / 2;
  let ballObject = {
    posX: centerFieldX - ball.offsetWidth / 2,
    posY: centerFieldY - ball.offsetHeight / 2,
    speedX: 0,
    speedY: 0,
    position: function () {
      ball.style.left = this.posX + "px";
      ball.style.top = this.posY + "px";
    },
    start: function () {
      this.posX = centerFieldX - ball.offsetWidth / 2;
      this.posY = centerFieldY - ball.offsetHeight / 2;
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
      racketLeft.style.left = this.posX + "px";
      racketLeft.style.top = this.posY + "px";
    },
    startLeft: function () {
      this.posX = 0;
      this.posY = 0;
      racketLeft.style.left = this.posX + "px";
      racketLeft.style.top = this.posY + "px";
    },
  };
  racketLeftObject.startLeft();
  let racketRigthObject = {
    posX: field.offsetWidth - racketRigth.offsetWidth,
    posY: 0,
    speedY: 0,
    positionRigth: function () {
      racketRigth.style.left = this.posX + "px";
      racketRigth.style.top = this.posY + "px";
    },
    startRigth: function () {
      this.posX = field.offsetWidth - racketRigth.offsetWidth;
      this.posY = 0;
      racketRigth.style.left = this.posX + "px";
      racketRigth.style.top = this.posY + "px";
    },
  };
  racketRigthObject.startRigth();
  let speed = 5; // заводим переменную для равномерной скорости двух ракеток вниз
  let speed2 = -5; // заводим переменную для равномерной скорости двух ракеток вверх
  document.addEventListener("keydown", moveRacket);
  document.addEventListener("keyup", stopMoveRacket);
  function moveRacket(ev) {
    if (ev.key === "Shift" || ev.key === "Control") {
      if (ev.key === "Shift") {
        racketLeftObject.speedY = speed2;
      } else if (ev.key === "Control") {
        racketLeftObject.speedY = speed;
      }
    }
    if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
      if (ev.key === "ArrowUp") {
        racketRigthObject.speedY = speed2;
      } else if (ev.key === "ArrowDown") {
        racketRigthObject.speedY = speed;
      }
    }
  }
  function stopMoveRacket(ev) {
    if (ev.key === "Shift" || ev.key === "Control") {
      console.log(ev.key);
      if (ev.key === "Shift") {
        racketLeftObject.speedY = 0;
      } else if (ev.key === "Control") {
        racketLeftObject.speedY = 0;
      }
    }
    if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
      console.log(ev.key);
      if (ev.key === "ArrowDown") {
        racketRigthObject.speedY = 0;
      } else if (ev.key === "ArrowUp") {
        racketRigthObject.speedY = 0;
      }
    }
  }
  buttonStart.addEventListener("click", updateGame);
  function updateGame() {
    ballObject.speedX = 4;
    ballObject.speedY = 0.5;
    racketLeftObject.startLeft();
    racketRigthObject.startRigth();
    ballObject.start();
  }
  function start() {
    setInterval(move, 40);
  }
  start()
  function move() {
    if (ballObject.posX + ball.offsetWidth > field.offsetWidth) {
        ballObject.speedX = 0;
        ballObject.speedY = 0;
        ballObject.posX = field.offsetWidth - ball.offsetWidth;
        scoreRigth.textContent = Number(scoreRigth.textContent) + 1;
    }
    if (ballObject.posX < 0) {
        ballObject.speedX = 0;
        ballObject.speedY = 0;
        ballObject.posX = 0;
        scoreLeft.textContent = Number(scoreLeft.textContent) + 1;
    }
    if (ballObject.posY + ball.offsetHeight > field.offsetHeight) {
        ballObject.speedY = -ballObject.speedY;
        ballObject.posY = field.offsetHeight - ball.offsetHeight;
    }
    if (ballObject.posY < 0) {
        ballObject.speedY = -ballObject.speedY;
        ballObject.posY = 0;
    }
    if (ballObject.posY + ball.offsetHeight > field.offsetHeight) {
        ballObject.speedY = -ballObject.speedY;
        ballObject.posY = field.offsetHeight - ball.offsetHeight;
    }
    if (ballObject.posY < 0) {
        ballObject.speedY = -ballObject.speedY;
        ballObject.posY = 0;
    }
    if (
        ballObject.posX <= racketLeftObject.posX + racketLeft.offsetWidth &&
        ballObject.posY + ball.offsetHeight >= racketLeftObject.posY &&
        ballObject.posY <= racketLeftObject.posY + racketLeft.offsetHeight
        ) {
            ballObject.speedX = -ballObject.speedX;
            ballObject.posX = racketLeft.offsetWidth;
            console.log(ballObject.posX, "stop");
        }
        if (
            ballObject.posX + ball.offsetWidth >= racketRigthObject.posX &&
            ballObject.posY + ball.offsetHeight >= racketRigthObject.posY &&
            ballObject.posY <= racketRigthObject.posY + racketRigth.offsetHeight
            ) {
                ballObject.speedX = -ballObject.speedX;
                ballObject.posX = racketRigthObject.posX - ball.offsetWidth;
                console.log(ballObject.posX, "ball");
            }
    ballObject.posX += ballObject.speedX;
    ballObject.posY += ballObject.speedY;
    ballObject.position();
    racketLeftObject.posY += racketLeftObject.speedY;
    racketLeftObject.positionLeft();
    racketRigthObject.posY += racketRigthObject.speedY;
    racketRigthObject.positionRigth();
    if (racketLeftObject.posY + racketLeft.offsetHeight >= field.offsetHeight) {
        racketLeftObject.speedY = 0;
        racketLeftObject.posY = field.offsetHeight - racketLeft.offsetHeight;
    }
    if (racketLeftObject.posY < 0) {
        racketLeftObject.speedY = 0;
        racketLeftObject.startLeft();
    }
    if (racketRigthObject.posY + racketRigth.offsetHeight >= field.offsetHeight) {
        racketLeftObject.speedY = 0;
        racketRigthObject.posY = field.offsetHeight - racketRigth.offsetHeight;
    }
    if (racketRigthObject.posY < 0) {
        racketRigthObject.speedY = 0;
        racketRigthObject.startRigth();
    }
  }
});


// racketLeftObject.posY += racketLeftObject.speedY;
//     racketLeftObject.positionLeft();
//     racketRigthObject.posY += racketRigthObject.speedY;
//     racketRigthObject.positionRigth();
//     if (racketLeftObject.posY + racketLeft.offsetHeight >= field.offsetHeight) {
//       racketLeftObject.speedY = 0;
//       racketLeftObject.posY = field.offsetHeight - racketLeft.offsetHeight;
//     }
//     if (racketLeftObject.posY < 0) {
//       racketLeftObject.speedY = 0;
//       racketLeftObject.startLeft();
//     }
//     if (
//       racketRigthObject.posY + racketRigth.offsetHeight >=
//       field.offsetHeight
//     ) {
//       racketLeftObject.speedY = 0;
//       racketRigthObject.posY = field.offsetHeight - racketRigth.offsetHeight;
//     }
//     if (racketRigthObject.posY < 0) {
//       racketRigthObject.speedY = 0;
//       racketRigthObject.startRigth();
//     }



// if (ballObject.posY + ball.offsetHeight > field.offsetHeight) {
//     ballObject.speedY = -ballObject.speedY;
//     ballObject.posY = field.offsetHeight - ball.offsetHeight;
//   }
//   if (ballObject.posY < 0) {
//     ballObject.speedY = -ballObject.speedY;
//     ballObject.posY = 0;
//   }
//   if (ballObject.posX + ball.offsetWidth > field.offsetWidth) {
//     ballObject.speedX = 0;
//     ballObject.speedY = 0;
//     ballObject.posX = field.offsetWidth - ball.offsetWidth;
//     scoreRigth.textContent = Number(scoreRigth.textContent) + 1;
//   }
//   if (ballObject.posX < 0) {
//     ballObject.speedX = 0;
//     ballObject.speedY = 0;
//     ballObject.posX = 0;
//     scoreLeft.textContent = Number(scoreLeft.textContent) + 1;
//   }
//   if (
//     ballObject.posX <= racketLeftObject.posX + racketLeft.offsetWidth &&
//     ballObject.posY + ball.offsetHeight >= racketLeftObject.posY &&
//     ballObject.posY <= racketLeftObject.posY + racketLeft.offsetHeight
//   ) {
//     ballObject.speedX = -ballObject.speedX;
//     ballObject.posX = racketLeft.offsetWidth;
//     console.log(ballObject.posX, "stop");
//   }
//   if (
//     ballObject.posX + ball.offsetWidth >= racketRigthObject.posX &&
//     ballObject.posY + ball.offsetHeight >= racketRigthObject.posY &&
//     ballObject.posY <= racketRigthObject.posY + racketRigth.offsetHeight
//   ) {
//     ballObject.speedX = -ballObject.speedX;
//     ballObject.posX = racketRigthObject.posX - ball.offsetWidth;
//     console.log(ballObject.posX, "ball");
//   }