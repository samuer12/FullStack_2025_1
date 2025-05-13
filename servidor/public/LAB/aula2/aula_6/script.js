let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// Corpo da casa
ctx.fillStyle = 'saddlebrown';
ctx.fillRect(100, 150, 200, 200);

// Telhado
ctx.beginPath();
ctx.fillStyle = 'coral';
ctx.moveTo(100, 150);
ctx.lineTo(200, 50);
ctx.lineTo(300, 150);
ctx.closePath();
ctx.fill();

// Porta
ctx.fillStyle = 'black';
ctx.fillRect(180, 250, 40, 100);

// Janela
ctx.fillStyle = 'cornflowerblue';
ctx.fillRect(130, 200, 50, 50);
ctx.fillRect(220, 200, 50, 50);

ctx.fillStyle = 'grey';
ctx.fillRect(0, 350, 1000, 100);
