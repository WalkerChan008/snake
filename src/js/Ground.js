var ground = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN * SQUAREWIDTH, YLEN * SQUAREWIDTH);

ground.init = function () {
    // 渲染广场
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.backgroundColor = '#0ff';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    document.body.appendChild(this.viewContent);

    // 填充广场
    this.squareTable = [];

    for(var i = 0; i < YLEN; i++) {
        this.squareTable[i] = new Array(XLEN);
        for(var j = 0; j < XLEN; j++) {
            var newSquare;
            if(j == 0 || i == 0 || j == XLEN - 1 || i == YLEN - 1) {
                newSquare = SquareFactory.create('Stone', j, i, '#666');
            } else {
                newSquare = SquareFactory.create('Floor', j, i, '#dedede');
            }

            this.squareTable[i][j] = newSquare;
            this.viewContent.appendChild(newSquare.viewContent);
        }
    }
}

// 拆地板
ground.remove = function (x, y) {
    this.viewContent.removeChild(this.squareTable[y][x].viewContent);
    this.squareTable[y][x] = null;
}

// 装地板
ground.append = function (square) {
    this.squareTable[square.y][square.x] = square;
    this.viewContent.appendChild(square.viewContent);
}