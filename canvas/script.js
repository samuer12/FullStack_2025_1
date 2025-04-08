// Utility Functions to Draw Shapes
function desenharQuadrado(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
}

function desenharLinha(ctx, x1, y1, x2, y2, color, width) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function desenharArco(ctx, x, y, radius, startAngle, endAngle, color, fill = false) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    if (fill) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
}

function escrever(ctx, text, x, y, font, color) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(text, x, y);
}

// Abstract Canvas Drawing
function drawAbstract() {
    const canvas = document.getElementById("abstractCanvas");
    const ctx = canvas.getContext("2d");

    // Blue square
    desenharQuadrado(ctx, 0, 0, 100, "blue");

    // Red square
    desenharQuadrado(ctx, 300, 0, 100, "red");

    // Yellow square
    desenharQuadrado(ctx, 0, 300, 100, "yellow");

    // Black steps
    desenharQuadrado(ctx, 300, 300, 50, "black");
    desenharQuadrado(ctx, 350, 350, 50, "black");

    // Cyan semi-circle
    desenharArco(ctx, 200, 350, 50, 0, Math.PI, "cyan", true);

    // Center shapes
    desenharQuadrado(ctx, 175, 175, 50, "red");
    desenharArco(ctx, 200, 200, 15, 0, Math.PI * 2, "cyan", true);

    // Yellow circles
    desenharArco(ctx, 100, 200, 15, 0, Math.PI * 2, "yellow", true);
    desenharArco(ctx, 300, 200, 15, 0, Math.PI * 2, "yellow", true);

    // Green lines and arcs
    desenharLinha(ctx, 100, 200, 300, 200, "green", 2);
    desenharArco(ctx, 200, 200, 50, 0, Math.PI * 2, "green");
    desenharArco(ctx, 200, 200, 100, 0, Math.PI * 2, "green");
    desenharLinha(ctx, 0, 0, 200, 200, "green", 2);
    desenharLinha(ctx, 200, 200, 400, 0, "green", 2);
}

// Landscape Canvas Drawing
function drawLandscape() {
    const canvas = document.getElementById("landscapeCanvas");
    const ctx = canvas.getContext("2d");

    // Sky
    desenharQuadrado(ctx, 0, 0, 400, "#90EE90");

    // Sun
    desenharArco(ctx, 300, 80, 40, 0, Math.PI * 2, "yellow", true);

    // Ground
    desenharQuadrado(ctx, 0, 300, 400, "gray");

    // River
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(0, 300);
    ctx.quadraticCurveTo(100, 250, 200, 300);
    ctx.lineTo(0, 400);
    ctx.closePath();
    ctx.fill();

    // Trees
    desenharQuadrado(ctx, 100, 250, 20, "brown");
    desenharQuadrado(ctx, 300, 250, 20, "brown");
    desenharArco(ctx, 110, 240, 20, 0, Math.PI * 2, "green", true);
    desenharArco(ctx, 310, 240, 20, 0, Math.PI * 2, "green", true);

    // House
    desenharQuadrado(ctx, 180, 200, 40, "brown");
    desenharQuadrado(ctx, 195, 220, 10, "darkbrown");
    desenharQuadrado(ctx, 185, 210, 10, "blue");
    desenharQuadrado(ctx, 205, 210, 10, "blue");
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(180, 200);
    ctx.lineTo(220, 200);
    ctx.lineTo(200, 180);
    ctx.closePath();
    ctx.fill();
}

// Execute the drawings
drawAbstract();
drawLandscape();
