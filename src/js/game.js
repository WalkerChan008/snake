var game = new Game();
game.timer = null;
game.score = 0;
game.iSpeed = 200;

game.init = function () {
    ground.init();
    snake.init(ground);
    createFood(ground);

    document.onkeydown = function (e) {
        if(e.which == 13) {
            if(game.timer) {
                game.pause();
            } else {
                game.start();
            }
        }

        if(e.which == 37 && snake.direction != DIRECTIONENUM.RIGHT) {
            snake.direction = DIRECTIONENUM.LEFT;
        } else if(e.which == 38 && snake.direction != DIRECTIONENUM.DOWN) {
            snake.direction = DIRECTIONENUM.UP;
        } else if(e.which == 39 && snake.direction != DIRECTIONENUM.LEFT) {
            snake.direction = DIRECTIONENUM.RIGHT;
        } else if(e.which == 40 && snake.direction != DIRECTIONENUM.UP) {
            snake.direction = DIRECTIONENUM.DOWN;
        }
    }
}

game.start = function () {
    game.timer = setInterval(function () {
        snake.move(ground);
    }, game.iSpeed)
}

game.pause = function () {
    clearInterval(game.timer);
    game.timer = null;
}

game.over = function () {
    clearInterval(game.timer);
    alert(game.score);
}

function createFood(ground) {
    var x = null;
    var y = null;
    var flag = true;

    while(flag) {
        x = 1 + Math.floor(Math.random() * 28);
        y = 1 + Math.floor(Math.random() * 28);
        
        var ok = true;

        for(var i = snake.head; i; i = snake.next) {
            if(x == i.x && y == i.y) {
                ok = false;
                break;
            }
        }
        if(ok) {
            flag = false;
        }
    }
    var food = SquareFactory.create('Food', x, y, 'deeppink');
    ground.remove(food.x, food.y);
    ground.append(food);
}

game.init();