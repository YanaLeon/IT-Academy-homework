function ControllerGame (model) {
    let self = this;
    self.myModel = model;
    console.log(self.myModel);
}
ControllerGame.prototype.moveNodeClick = function () {
    let self = this;
    self.myModel.element;
    self.myModel.field.addEventListener('click', eventForElementClick);
    function eventForElementClick (ev) {
        ev = ev || window.event;
        console.log(ev);
        self.myModel.element = Number(ev.target.dataset.number);
        self.myModel.move (self.myModel.element);
    }
}
ControllerGame.prototype.moveNodeTouch = function () {
    let self = this;
    self.myModel.element;
    self.myModel.field.addEventListener('touchstart', eventForElementTouch, false);
    function eventForElementTouch (ev) {
        ev = ev || window.event;
        ev.preventDefault();
        console.log(ev);
        self.myModel.element = Number(ev.touches[0].target.dataset.number);
        self.myModel.move (self.myModel.element);
    }
}
ControllerGame.prototype.moveNodeArrow = function () {
    let self = this;
    document.body.addEventListener('keydown', eventForElementArrow);
    function eventForElementArrow (ev) {
        ev = ev || window.event;
        ev.preventDefault();
        console.log(ev.key);
        self.myModel.lastElement = self.myModel.itemNodeList.length;
        self.myModel.positionLastElement = self.myModel.getPosition(self.myModel.lastElement);
        self.myModel.positionElement = {
            x: self.myModel.positionLastElement.x,
            y: self.myModel.positionLastElement.y
        };
        if (ev.key === 'ArrowDown') {
            self.myModel.positionLastElement.x += 1;
        };
        if (ev.key === 'ArrowUp') {
            self.myModel.positionLastElement.x -= 1;
        };
        if (ev.key === 'ArrowLeft') {
            self.myModel.positionLastElement.y -= 1;
        };
        if (ev.key === 'ArrowRight') {
            self.myModel.positionLastElement.y += 1;
        };
        self.myModel.moveArrow(self.myModel.positionElement, self.myModel.positionLastElement)
    }
}
