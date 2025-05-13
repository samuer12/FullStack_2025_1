const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
  x: 50,
  y: canvas.height / 2,
  width: 30,
  height: 30,
  speed: 5,
  isYoyo: false
};

const enemies = [];
const enemySpeed = 2.0;
let lives = 3;
let isGameOver = false;
let frameCounter = 0;

const keysPressed = {}; // Armazena teclas pressionadas

// Criar inimigo
function spawnEnemy() {
  const x = Math.random() > 0.5 ? canvas.width : 0;
  const y = Math.random() * canvas.height;
  const angle = Math.atan2(player.y - y, player.x - x);
  enemies.push({
    x,
    y,
    width: 30,
    height: 30,
    speedX: enemySpeed * Math.cos(angle),
    speedY: enemySpeed * Math.sin(angle)
  });
}

// Verificar colisão
function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// Atualização
function update() {
  if (isGameOver) return;

  frameCounter++;

  // Movimento contínuo com A e D
  if (keysPressed['a']) {
    player.x = Math.max(0, player.x - player.speed);
  }
  if (keysPressed['d']) {
    player.x = Math.min(canvas.width - player.width, player.x + player.speed);
  }

  // Inimigos
  enemies.forEach((enemy, i) => {
    if (frameCounter % 20 === 0) {
      const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
      enemy.speedX = enemySpeed * Math.cos(angle);
      enemy.speedY = enemySpeed * Math.sin(angle);
    }

    enemy.x += enemy.speedX;
    enemy.y += enemy.speedY;

    if (
      enemy.x < -enemy.width || enemy.x > canvas.width + enemy.width ||
      enemy.y < -enemy.height || enemy.y > canvas.height + enemy.height
    ) {
      enemies.splice(i, 1);
      return;
    }

    if (isColliding(player, enemy)) {
      enemies.splice(i, 1);
      if (!player.isYoyo) {
        lives--;
        if (lives <= 0) isGameOver = true;
      }
    }
  });

  if (Math.random() < 0.02) spawnEnemy();
}

// Desenhar
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = player.isYoyo ? 'blue' : 'green';
  ctx.fillRect(player.x, player.y, player.width, player.height);

  ctx.fillStyle = 'red';
  enemies.forEach(e => ctx.fillRect(e.x, e.y, e.width, e.height));

  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Vidas: ${lives}`, 10, 20);

  if (isGameOver) {
    ctx.font = '40px Arial';
    ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
  }
}

// Loop principal
function gameLoop() {
  update();
  draw();
  if (!isGameOver) requestAnimationFrame(gameLoop);
}

// Armazenar teclas pressionadas
document.addEventListener('keydown', (e) => {
  keysPressed[e.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (e) => {
  keysPressed[e.key.toLowerCase()] = false;
});

// Ativar modo yoyo com clique no canvas
canvas.addEventListener('click', (e) => {
  e.preventDefault();
  if (!player.isYoyo) {
    player.isYoyo = true;
    setTimeout(() => player.isYoyo = false, 1000);
  }
});

// Iniciar
gameLoop();
