const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const audio = new Audio('sprites/musica.mp3');
audio.loop = true;
audio.volume = 1;

const sprites = {
  normal: carregarImagem('sprites/normal.png'),
  anda: carregarImagem('sprites/corre.png'),
  yoyo: carregarImagem('sprites/yoyo.png'),
  fundo: carregarImagem('sprites/fundo.png'),
  akuma: carregarImagem('sprites/akuma.png')
};

function carregarImagem(src) {
  const img = new Image();
  img.src = src;
  return img;
}

const jogador = {
  x: 50,
  y: canvas.height / 1.3,
  largura: 50,
  altura: 70,
  velocidade: 5,
  isYoyo: false,
  sprite: sprites.normal
};

let inimigos = [];
let velocidadeInimigo = 2;
let vidas = 5;
let pontos = 0;
let nivel = 1;
let fimDeJogo = false;
const teclasPressionadas = {};

function criarInimigo() {
  const x = Math.random() > 0.5 ? canvas.width : 0;
  const y = Math.random() * canvas.height;
  const angulo = Math.atan2(jogador.y - y, jogador.x - x);

  inimigos.push({
    x, y,
    largura: 30, altura: 30,
    velocidadeX: velocidadeInimigo * Math.cos(angulo),
    velocidadeY: velocidadeInimigo * Math.sin(angulo),
    sprite: sprites.akuma
  });
}

function verificarColisao(a, b) {
  return a.x < b.x + b.largura &&
         a.x + a.largura > b.x &&
         a.y < b.y + b.altura &&
         a.y + a.altura > b.y;
}

function atualizar() {
  if (fimDeJogo) return;

  if (pontos >= 40) { nivel = 4; velocidadeInimigo = 5; }
  else if (pontos >= 30) { nivel = 3; velocidadeInimigo = 4; }
  else if (pontos >= 20) { nivel = 2; velocidadeInimigo = 3; }

  if (teclasPressionadas['a']) jogador.x = Math.max(0, jogador.x - jogador.velocidade);
  if (teclasPressionadas['d']) jogador.x = Math.min(canvas.width - jogador.largura, jogador.x + jogador.velocidade);

  inimigos.forEach((inimigo, i) => {
    const angulo = Math.atan2(jogador.y - inimigo.y, jogador.x - inimigo.x);
    inimigo.velocidadeX = velocidadeInimigo * Math.cos(angulo);
    inimigo.velocidadeY = velocidadeInimigo * Math.sin(angulo);

    inimigo.x += inimigo.velocidadeX;
    inimigo.y += inimigo.velocidadeY;

    if (verificarColisao(jogador, inimigo)) {
      inimigos.splice(i, 1);
      jogador.isYoyo ? pontos++ : vidas--;
      if (vidas <= 0) fimDeJogo = true;
    }

    if (
      inimigo.x < -inimigo.largura || inimigo.x > canvas.width + inimigo.largura ||
      inimigo.y < -inimigo.altura || inimigo.y > canvas.height + inimigo.altura
    ) {
      inimigos.splice(i, 1);
    }
  });

  if (Math.random() < 0.02) criarInimigo();

  if (pontos >= 50) fimDeJogo = true;
}

function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(sprites.fundo, 0, 0, canvas.width, canvas.height);

  jogador.sprite = jogador.isYoyo ? sprites.yoyo :
                   (teclasPressionadas['a'] || teclasPressionadas['d']) ? sprites.anda :
                   sprites.normal;

  ctx.drawImage(jogador.sprite, jogador.x, jogador.y, jogador.largura, jogador.altura);

  inimigos.forEach(inimigo => {
    ctx.drawImage(inimigo.sprite, inimigo.x, inimigo.y, inimigo.largura, inimigo.altura);
  });

  ctx.fillStyle = 'red';
  ctx.font = '20px Fantasy';
  ctx.fillText(`Vidas: ${vidas}`, 10, 20);
  ctx.fillText(`Pontos: ${pontos}`, 10, 40);
  ctx.fillText(`Nivel: ${nivel}`, 10, 60);

  if (fimDeJogo) {
    ctx.font = '40px Fantasy';
    ctx.fillText(pontos < 50 ? 'Você perdeu!' : 'Você ganhou!', canvas.width / 2 - 100, canvas.height / 2);
  }
}

function loopPrincipal() {
  atualizar();
  desenhar();
  if (!fimDeJogo) {
    requestAnimationFrame(loopPrincipal);
  }
}

document.addEventListener('keydown', e => teclasPressionadas[e.key.toLowerCase()] = true);
document.addEventListener('keyup', e => teclasPressionadas[e.key.toLowerCase()] = false);

canvas.addEventListener('click', () => {
  if (!jogador.isYoyo) {
    jogador.isYoyo = true;
    setTimeout(() => jogador.isYoyo = false, 1000);
  }
});

document.getElementById('botaoIniciar').addEventListener('click', () => {
  inimigos = [];
  vidas = 5;
  pontos = 0;
  nivel = 1;
  fimDeJogo = false;
  audio.play().catch(() => {});
  loopPrincipal();
});
