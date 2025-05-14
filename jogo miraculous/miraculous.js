const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const sprites = {
  normal: new Image(),
  anda: new Image(),
  yoyo: new Image(),
  fundo: new Image(),
  akuma: new Image()
};

sprites.normal.src = 'sprites/normal.png';
sprites.anda.src = 'sprites/corre.png';
sprites.yoyo.src = 'sprites/yoyo.png';
sprites.fundo.src = 'sprites/fundo.png';
sprites.akuma.src = "sprites/akuma.png";

const jogador = {
  x: 50,
  y: canvas.height / 1.3,
  largura: 50,
  altura: 70,
  velocidade: 5,
  isYoyo: false,
  quadro: 0,
  atrasoQuadro: 10,
  contadorQuadro: 0,
  sprite: sprites.normal
};

const inimigos = [];
let velocidadeInimigo = 2.0;  // Inicializando como variável
let vidas = 5;
let pontos = 48;
let nivel = 1;  // Inicializando o nível
let fimDeJogo = false;
let contadorQuadro = 0;

const teclasPressionadas = {}; // Armazena teclas pressionadas

// Criar inimigo
function criarInimigo() {
  const x = Math.random() > 0.5 ? canvas.width : 0;
  const y = Math.random() * canvas.height;
  const angulo = Math.atan2(jogador.y - y, jogador.x - x);
  inimigos.push({
    x,
    y,
    largura: 30,
    altura: 30,
    velocidadeX: velocidadeInimigo * Math.cos(angulo),
    velocidadeY: velocidadeInimigo * Math.sin(angulo),
    sprite: sprites.akuma  // Usando o sprite "akuma" para o inimigo
  });
}

// Verificar colisão
function verificarColisao(a, b) {
  return (
    a.x < b.x + b.largura &&
    a.x + a.largura > b.x &&
    a.y < b.y + b.altura &&
    a.y + a.altura > b.y
  );
}

// Atualização
function atualizar() {
  if (fimDeJogo) return;

  contadorQuadro++;

  // Verificar nível e ajustar a velocidade do inimigo
  if (pontos >= 40) {
    nivel = 4;
    velocidadeInimigo = 5.0;
  } else if (pontos >= 30) {
    nivel = 3;
    velocidadeInimigo = 4.0;
  } else if (pontos >= 20) {
    nivel = 2;
    velocidadeInimigo = 3.0;
  }

  // Movimento contínuo com A e D
  if (teclasPressionadas['a']) {
    jogador.x = Math.max(0, jogador.x - jogador.velocidade);
  }
  if (teclasPressionadas['d']) {
    jogador.x = Math.min(canvas.width - jogador.largura, jogador.x + jogador.velocidade);
  }

  // Inimigos
  inimigos.forEach((inimigo, i) => {
    if (contadorQuadro % 20 === 0) {
      const angulo = Math.atan2(jogador.y - inimigo.y, jogador.x - inimigo.x);
      inimigo.velocidadeX = velocidadeInimigo * Math.cos(angulo);
      inimigo.velocidadeY = velocidadeInimigo * Math.sin(angulo);
    }

    inimigo.x += inimigo.velocidadeX;
    inimigo.y += inimigo.velocidadeY;

    if (
      inimigo.x < -inimigo.largura || inimigo.x > canvas.width + inimigo.largura ||
      inimigo.y < -inimigo.altura || inimigo.y > canvas.height + inimigo.altura
    ) {
      inimigos.splice(i, 1);
      return;
    }

    if (verificarColisao(jogador, inimigo)) {
      inimigos.splice(i, 1);  // Remove o inimigo após a colisão

      // Só aumentar a pontuação se o jogador estiver no modo Yoyo
      if (jogador.isYoyo) {
        pontos += 1;  // Aumenta a pontuação
      }

      // Se o jogador não estiver no modo Yoyo, perde vidas
      if (!jogador.isYoyo) {
        vidas--;  // Perde uma vida se não estiver no modo Yoyo
        if (vidas <= 0) {
          fimDeJogo = true; // Fim do jogo
        }
        
      }
    }
  });

  if (Math.random() < 0.02) criarInimigo();
}

// Desenhar
function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenhar o fundo
  ctx.drawImage(sprites.fundo, 0, 0, canvas.width, canvas.height);

  const sprite = jogador.sprite;
  const larguraQuadro = sprite.width / 1; // Supondo 4 frames no eixo X

  ctx.drawImage(
    sprite,
    jogador.quadro * larguraQuadro, 0,      // Corte da imagem (X, Y)
    larguraQuadro, sprite.height,         // Tamanho do corte
    jogador.x, jogador.y,                // Onde desenhar
    jogador.largura, jogador.altura        // Tamanho desenhado
  );

  inimigos.forEach(e => {
    ctx.drawImage(
      e.sprite,  // Usando o sprite "akuma" para o inimigo
      e.x, e.y,  // Posição onde desenhar o inimigo
      e.largura, e.altura // Tamanho do inimigo
    );
  });

  ctx.fillStyle = 'red';
  ctx.font = '20px Fantasy';
  ctx.fillText(`Vidas: ${vidas}`, 10, 20);
  ctx.fillText(`Pontos: ${pontos}`, 10, 40);
  ctx.fillText(`Nivel: ${nivel}`, 10, 60);

  if (fimDeJogo) {
    ctx.font = '40px Fantasy';

    if (pontos = 50) {
      // Se o jogador perder
      ctx.fillText('Você ganhou !', canvas.width / 2 - 100, canvas.height / 2);
    } else {
      // Se o jogador ganhar
      ctx.fillText('Você perdeu!', canvas.width / 2 - 100, canvas.height / 2);
    }
  }
}

// Loop principal
function loopPrincipal() {
  if (!fimDeJogo) {
    atualizar();
    const estaMovendo = teclasPressionadas['a'] || teclasPressionadas['d'];

    if (jogador.isYoyo) {
      jogador.sprite = sprites.yoyo;
    } else if (estaMovendo) {
      jogador.sprite = sprites.anda;
    } else {
      jogador.sprite = sprites.normal;
    }

    if (pontos >= 50) {
      fimDeJogo = true;
    }
    

    desenhar();
    requestAnimationFrame(loopPrincipal);
  }
}

// Armazenar teclas pressionadas
document.addEventListener('keydown', (e) => {
  teclasPressionadas[e.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (e) => {
  teclasPressionadas[e.key.toLowerCase()] = false;
});

// Ativar modo yoyo com clique no canvas
canvas.addEventListener('click', (e) => {
  e.preventDefault();
  if (!jogador.isYoyo) {
    jogador.isYoyo = true;
    setTimeout(() => jogador.isYoyo = false, 1000);
  }
});

// Iniciar
loopPrincipal();
