function SquareFactory() {

}

SquareFactory.create = function (type, x, y, color) {
    if(typeof SquareFactory.prototype[type] == undefined) {
        throw 'No this type!';
    }

    if(SquareFactory.prototype[type].prototype.__proto__ != SquareFactory.prototype) {
        SquareFactory.prototype[type].prototype = new SquareFactory();
    }

    var newQuare = SquareFactory.prototype[type](x, y, color);
    return newQuare;
}

SquareFactory.prototype.init = function (square, color, strategyMessage) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.left = square.x * SQUAREWIDTH + 'px';
    square.viewContent.style.top = square.y * SQUAREWIDTH + 'px';
    square.viewContent.style.backgroundColor = color;
    square.touch = function () {
        return strategyMessage;
    }
}


SquareFactory.prototype.Floor = function (x, y, color) {
    var floor = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(floor, color, STRATEGYMESSAGEENUM.MOVE);
    return floor;
}

SquareFactory.prototype.Stone = function (x, y, color) {
    var stone = new Stone(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(stone, color, STRATEGYMESSAGEENUM.DIE);
    return stone;
}

SquareFactory.prototype.Food = function (x, y, color) {
    var food = new Food(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(food, color, STRATEGYMESSAGEENUM.EAT);
    food.update(x, y);
    return food;
}

SquareFactory.prototype.snakeHead = function (x, y, color) {
    var sHead = new snakeHead(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(sHead, color, STRATEGYMESSAGEENUM.DIE);
    sHead.update(x, y);
    return sHead;
}

SquareFactory.prototype.snakeBody = function (x, y, color) {
    var sBody = new snakeBody(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(sBody, color, STRATEGYMESSAGEENUM.DIE);
    return sBody;
}