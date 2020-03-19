const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const logo = document.querySelector('img');
let x, y;
let xSpeed = 3;                                             //Number of pixels moved each animation frame
let ySpeed = 3;


function animate(){
    moveIt();
    window.requestAnimationFrame(animate);
}
function init(){
    ctx.fillStyle = 'black';
    x = Math.floor(Math.random() * (canvas.width - logo.width));
    y = Math.floor(Math.random() * (canvas.height - logo.height));
}

function moveIt(){
    ctx.fillRect(0, 0, canvas.width, canvas.height);    // Paints the canvas black
    x += xSpeed;
    y += ySpeed;
    if(x + logo.width >= canvas.width || x < 0){
        xSpeed = -xSpeed;                               // Reverses direction when it hits the right / left edge of frame
    }
    if(y + logo.height >= canvas.height || y < 0){
        ySpeed = -ySpeed;                               // Reverses direction when it hits the top / bottom edge of frame
    }
    ctx.drawImage(logo, x, y);                          // Draws the logo
}

init();
window.requestAnimationFrame(animate);