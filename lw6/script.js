let game, keyboard, player, debug, mouse;

const playerSpeed = 3;

let score = 0;
let life = 100;

let minWidth, maxWidth, minHeight, maxHeight;

function start() {
  game = new Engine("#game", 640, 480);
  keyboard = new Keyboard();
  player = new Sprite("assets/player.png", 50, 50);
  
  debug = new Debug("#debug");
  debug.add("x", player.x);
  debug.add("y", player.y);
  debug.add("score", score);
  debug.add("life", life);

  game.add(player);

  mouse = new Mouse('#game')
  mouse.click(wallSpawnHandler);

  drawWalls()
}

let fm = false;
let rm = false;
let lm = false;
let dm = false;

function movehandler() {
  if (fm && player.y > minHeight) player.y -= playerSpeed
  if (dm && player.y < maxHeight) player.y += playerSpeed
  if (rm && player.x < maxWidth) player.x += playerSpeed
  if (lm && player.x > minWidth) player.x -= playerSpeed
}

function wallSpawnHandler(x, y) {
  let object = new Sprite("assets/wall.png");
  object.x = x;
  object.y = y;

  game.add(object, x, y);
}

function drawWalls() {
  const room = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  const ww = 36;
  const wh = 36;

  minHeight = wh
  maxHeight = wh * (room.length - 2)

  minWidth = ww
  maxWidth = ww * (room[0].length - 2)

  for (let i = 0; i < room.length; i++) {
    for (let j = 0; j < room[i].length; j++) {
      if (room[i][j]) game.add(new Sprite('assets/wall.png', j * ww, i * wh))
    }
  }
}

function draw() {
  keyboard.event(function (type, key) {
    let mv = false;
    if (type == 'up') mv = false;
    if (type == 'down') mv = true;
  
    if (key === "a") lm = mv;
  
    if (key === "d") rm = mv;

    if (key === "s") dm = mv;

    if (key === 'w') fm = mv;
  });

  movehandler()

  debug.set("x", player.x);
  debug.set("y", player.y);
  debug.init();

  game.render();
}
