const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Configurações do jogador
const player = {
  x: 100,
  y: 300,
  width: 32,   // largura do quadro
  height: 32,  // altura do quadro
  frame: 0,    // quadro atual
  frameMax: 3, // número de quadros - 1
  frameDelay: 10,
  frameTimer: 0,
  speed: 3,
  moving: false,
  direction: 1 // 1 = direita, -1 = esquerda
};

// Carregar spritesheet
const spriteSheet = new Image();
spriteSheet.src = "sprites/normal.png"; // sua imagem com animação

const keys = {
  left: false,
  right: false
};

// Controle de teclas
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    keys.right = true;
    player.direction = 1;
    player.moving = true;
  }
  if (e.key === "ArrowLeft") {
    keys.left = true;
    player.direction = -1;
    player.moving = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") {
    keys.right = false;
    player.moving = keys.left; // continua movendo se a outra tecla estiver pressionada
  }
  if (e.key === "ArrowLeft") {
    keys.left = false;
    player.moving = keys.right;
  }
});

// Atualização da lógica
function update() {
  if (keys.right) player.x += player.speed;
  if (keys.left) player.x -= player.speed;

  // Limites da tela
  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));

  // Animação
  if (player.moving) {
    player.frameTimer++;
    if (player.frameTimer >= player.frameDelay) {
      player.frame = (player.frame + 1) % (player.frameMax + 1);
      player.frameTimer = 0;
    }
  } else {
    player.frame = 0;
  }
}

// Desenho do jogador
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Inverter o sprite se andando para esquerda
  ctx.save();
  if (player.direction === -1) {
    ctx.scale(-1, 1);
    ctx.translate(-player.x - player.width, 0);
  }

  ctx.drawImage(
    spriteSheet,
    player.frame * player.width, 0,      // Corte do quadro
    player.width, player.height,        // Tamanho do quadro
    player.x, player.y,                 // Posição na tela
    player.width, player.height         // Tamanho para desenhar
  );

  ctx.restore();
}

// Loop principal
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

spriteSheet.onload = () => {
  gameLoop();
};
