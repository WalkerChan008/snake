var snake = new Snake();
snake.head = null;
snake.tail = null;

var DIRECTIONENUM = {
    LEFT: {
        x: -1,
        y: 0
    },
    RIGHT: {
        x: 1,
        y: 0
    },
    UP: {
        x: 0,
        y: -1
    },
    DOWN: {
        x: 0,
        y: 1
    }
}

snake.init = function (ground) {
    // 创建蛇头  蛇身
    var snakeHead = SquareFactory.create('snakeHead', 3, 1, 'orange');
    var snakeBody1 = SquareFactory.create('snakeBody', 2, 1, 'blue');
    var snakeBody2 = SquareFactory.create('snakeBody', 1, 1, 'blue');

    this.head = snakeHead;
    this.tail = snakeBody2;

    // 创建链表
    snakeHead.prev = null;
    snakeHead.next = snakeBody1;

    snakeBody1.prev = snakeHead;
    snakeBody1.next = snakeBody2;

    snakeBody2.prev = snakeBody1;
    snakeBody2.next = null;

    this.direction = DIRECTIONENUM.RIGHT;

    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead);

    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1);
    
    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2);
}

snake.strategies = {
    MOVE: function (snake, square, ground, fromEat) {
        var newBody = SquareFactory.create('snakeBody', snake.head.x, snake.head.y, 'blue');

        newBody.next = snake.head.next;
        newBody.next.prev = newBody;
        newBody.prev = null;

        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);

        var newHead = SquareFactory.create('snakeHead', square.x, square.y, 'orange');

        newHead.next = newBody;
        newHead.prev = null;
        newBody.prev = newHead;

        ground.remove(newHead.x, newHead.y);
        ground.append(newHead);

        if(!fromEat) {
            var newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, '#dedede');
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(newFloor);
            snake.tail = snake.tail.prev;
        }
        snake.head = newHead;
    },
    EAT: function (snake, square, ground) {
        this.MOVE(snake, square, ground, true);
        game.score ++;
        createFood(ground);
    },
    DIE: function () {
        game.over();
    }
}

snake.move = function (ground) {
    var square = ground.squareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];

    if(typeof square.touch === 'function') {
        this.strategies[square.touch()](this, square, ground);
    }
}