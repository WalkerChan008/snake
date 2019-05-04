// 游戏场景 广场   宽度系数和高度系数
var XLEN = 30;
var YLEN = 30;

// 每个方格的宽度
var SQUAREWIDTH = 20;

// 广场的位置
var BASE_X_POINT = 100;
var BASE_Y_POINT = 100;

// 定义一个基类方块
function Square(x, y, width, height, dom) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.viewContent = dom || document.createElement('div');
}

Square.prototype.touch = function () {}
Square.prototype.update = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * SQUAREWIDTH + 'px';
    this.viewContent.style.top = y * SQUAREWIDTH + 'px';
} 

var Floor = tool.extends(Square);

var Stone = tool.extends(Square);

var Food = tool.single(Square);

var snakeHead = tool.single(Square);

var snakeBody = tool.extends(Square);

var Snake = tool.single(Square);

var Ground = tool.single(Square);

var Game = tool.single();

var STRATEGYMESSAGEENUM = {
    MOVE: 'MOVE',
    EAT: 'EAT',
    DIE: 'DIE'
}