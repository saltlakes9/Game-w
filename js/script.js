const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20; // size of each cell
const rows = canvas.height / gridSize;
const cols = canvas.width / gridSize;

let snake = [{x: 5, y:5}];
let food = {x: 10, y:10};
let dx = 1;
let dy = 0;
let score = 0;
let gameInterval;

function drawCell(x, y, color){
  ctx.fillStyle = color;
  ctx.fillRect(x*gridSize, y*gridSize, gridSize-1, gridSize-1);
}

function draw(){
  ctx.fillStyle = '#222';
  ctx.fillRect(0,0,canvas.width, canvas.height);

  // draw food
  drawCell(food.x, food.y, 'red');

  // draw snake
  snake.forEach((segment, i)=>{
    drawCell(segment.x, segment.y, i===0 ? 'lime' : 'green');
  });
}

function moveSnake(){
  const head = {x: (snake[0].x + dx + cols)%cols, y: (snake[0].y + dy + rows)%rows};

  // check self collision
  if(snake.some(segment => segment.x===head.x && segment.y===head.y)){
    clearInterval(gameInterval);
    alert('Game Over! Score: ' + score);
    snake = [{x:5, y:5}];
    dx=1; dy=0;
    score=0;
    document.getElementById('score').textContent = score;
    gameInterval = setInterval(gameLoop, 150);
    return;
  }

  snake.unshift(head);

  // eat food
  if(head.x === food.x && head.y === food.y){
    score++;
    document.getElementById('score').textContent = score;
    placeFood();
  } else {
    snake.pop();
  }
}

function placeFood(){
  let x, y;
  do {
    x = Math.floor(Math.random()*cols);
    y = Math.floor(Math.random()*rows);
  } while(snake.some(seg => seg.x===x && seg.y===y));
  food = {x,y};
}

function gameLoop(){
  moveSnake();
  draw();
}

// controls
window.addEventListener('keydown', e=>{
  switch(e.key){
    case 'ArrowUp': if(dy===0){dx=0; dy=-1;} break;
    case 'ArrowDown': if(dy===0){dx=0; dy=1;} break;
    case 'ArrowLeft': if(dx===0){dx=-1; dy=0;} break;
    case 'ArrowRight': if(dx===0){dx=1; dy=0;} break;
  }
});

// start game
gameInterval = setInterval(gameLoop, 150);


