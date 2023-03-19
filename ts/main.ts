(function () {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const cactusArray = [];
  const cactusSpeed = 2;
  const jumpSpeed = 2;
  const dinoInitPosition = { x: 10, y: 200, width: 50, height: 50 };
  let isJumping = false;
  let timer = 0;
  let jumpTimer = 0;
  let animation = null;

  canvas.width = window.innerWidth - 100;
  canvas.height = window.innerHeight - 100;

  function collisionDetection(dino, cactus) {
    const xDiffPosition = cactus.x - (dino.x + dino.width);
    const yDiffPosition = cactus.y - (dino.y + dino.height);

    if (xDiffPosition < 0 && yDiffPosition < 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animation);
    }
  }

  class Dino {
    x: number;

    y: number;

    width: number;

    height: number;

    color: string;

    constructor({
      x,
      y,
      width,
      height,
      color = 'green',
    }: {
      x?: number;
      y?: number;
      width?: number;
      height?: number;
      color?: string;
    }) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    jumping(position: number) {
      this.y = position;
    }
  }

  class Cactus {
    x: number;

    y: number;

    width: number;

    height: number;

    color: string;

    constructor() {
      this.x = 500;
      this.y = 200;
      this.width = 50;
      this.height = 50;
      this.color = 'tomato';
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move(position: number) {
      this.x = position;
    }
  }

  const dino = new Dino(dinoInitPosition);

  function onFrameHandler() {
    animation = requestAnimationFrame(onFrameHandler);
    timer += 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (timer % 120 === 0) {
      const cactus = new Cactus();
      cactusArray.push(cactus);
    }

    cactusArray.forEach((cactus, index, prevArray) => {
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
      if (dino.y < dinoInitPosition.y) dino.jumping((dino.y += jumpSpeed));
    }

    if (jumpTimer > 60) {
      isJumping = false;
      jumpTimer = 0;
    }

    dino.draw();
  }

  onFrameHandler();

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
      if (dino.y === dinoInitPosition.y) isJumping = true;
    }
  });
})();
