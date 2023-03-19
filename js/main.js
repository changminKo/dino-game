(function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var cactusArray = [];
    var cactusSpeed = 2;
    var jumpSpeed = 2;
    var dinoInitPosition = { x: 10, y: 200, width: 50, height: 50 };
    var isJumping = false;
    var timer = 0;
    var jumpTimer = 0;
    var animation = null;
    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 100;
    function collisionDetection(dino, cactus) {
        var xDiffPosition = cactus.x - (dino.x + dino.width);
        var yDiffPosition = cactus.y - (dino.y + dino.height);
        if (xDiffPosition < 0 && yDiffPosition < 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(animation);
        }
    }
    var Dino = /** @class */ (function () {
        function Dino(_a) {
            var x = _a.x, y = _a.y, width = _a.width, height = _a.height, _b = _a.color, color = _b === void 0 ? 'green' : _b;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
        }
        Dino.prototype.draw = function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };
        Dino.prototype.jumping = function (position) {
            this.y = position;
        };
        return Dino;
    }());
    var Cactus = /** @class */ (function () {
        function Cactus() {
            this.x = 500;
            this.y = 200;
            this.width = 50;
            this.height = 50;
            this.color = 'tomato';
        }
        Cactus.prototype.draw = function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };
        Cactus.prototype.move = function (position) {
            this.x = position;
        };
        return Cactus;
    }());
    var dino = new Dino(dinoInitPosition);
    function onFrameHandler() {
        animation = requestAnimationFrame(onFrameHandler);
        timer += 1;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (timer % 120 === 0) {
            var cactus = new Cactus();
            cactusArray.push(cactus);
        }
        cactusArray.forEach(function (cactus, index, prevArray) {
            if (cactus.x < 0) {
                prevArray.splice(index, 1);
            }
            cactus.move(cactus.x - cactusSpeed);
            cactus.draw();
            collisionDetection(dino, cactus);
        });
        if (isJumping) {
            dino.jumping((dino.y -= jumpSpeed));
            jumpTimer += 1;
        }
        if (!isJumping) {
            if (dino.y < dinoInitPosition.y)
                dino.jumping((dino.y += jumpSpeed));
        }
        if (jumpTimer > 60) {
            isJumping = false;
            jumpTimer = 0;
        }
        dino.draw();
    }
    onFrameHandler();
    document.addEventListener('keydown', function (event) {
        if (event.code === 'Space') {
            if (dino.y === dinoInitPosition.y)
                isJumping = true;
        }
    });
})();
//# sourceMappingURL=main.js.map