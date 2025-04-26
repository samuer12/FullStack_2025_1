const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const image = new Image();
image.src = 'sobble.png'

const canvasRect = canvas.getBoundingClientRect();
const imgSize = 50; 
let imgX = canvas.width / 2 - imgSize / 2;
let imgY = canvas.height / 2 - imgSize / 2;

canvas.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX - canvasRect.left;
    const mouseY = event.clientY - canvasRect.top;

    imgX = Math.max(0, Math.min(canvas.width - imgSize, mouseX - imgSize / 2));
    imgY = Math.max(0, Math.min(canvas.height - imgSize, mouseY - imgSize / 2));
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, imgX, imgY, imgSize, imgSize);
    requestAnimationFrame(draw);
}

image.onload = draw;
