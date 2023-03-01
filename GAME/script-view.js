function ViewGame (model) {
    let self = this;
    self.myModel = model;
    console.log(self.myModel)
}
ViewGame.prototype.setStyleBackground = function () {
    let self = this;
    console.log(self.myModel)
    self.myModel.background = {};
    let backgroundPositionFourX = 33; // 100/3 = 33 позиция по x всегда начинается с 0, для следующих 3 клеток остаётся 100
    let backgroundPositionFourY = 33; // 100/3 = 33 позиция по x всегда начинается с 0, для следующих 3 клеток остаётся 100
    let backgroundPositionFiveX = 25; // 100/4 = 25 позиция по x всегда начинается с 0, для следующих 4 клеток остаётся 100
    let backgroundPositionFiveY = 25; // 100/4 = 25 позиция по x всегда начинается с 0, для следующих 4 клеток остаётся 100
    let posY = 0;
    let posX = 0;
    for (let y = 0; y < self.myModel.matrix.length; y++) {
        for (let x = 0; x < self.myModel.matrix[y].length; x++) {
            let value = self.myModel.matrix[y][x];
            let node = self.myModel.itemNodeList[value - 1];
            if (value === self.myModel.size) {
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
            self.myModel.background[self.myModel.matrix[y][x]] = {x: posX, y: posY}
        }
    }
}
ViewGame.prototype.setStyleTransform = function (time) {
    let self = this;
    self.myModel.transform = {};
    for (let y = 0; y < self.myModel.matrix.length; y++) {
        for (let x = 0; x < self.myModel.matrix[y].length; x++) {
            let value = self.myModel.matrix[y][x];
            let node = self.myModel.itemNodeList[value - 1];
            let shiftTransform = 100;
            node.style.transitionDuration = `${time}s`;
            setTimeout( function() {
                node.style.transform = `translate3D(${x * shiftTransform}%, ${y * shiftTransform}%, 0)`;
                self.myModel.transform[self.myModel.matrix[y][x]] = {x: x * shiftTransform, y: y * shiftTransform};
            },0);
        }
    }
}