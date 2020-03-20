const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const logo = document.querySelector('img');
let x, y;                                                   // Location of DVD logo on page
let xSpeed = 3;                                             //Number of pixels moved each animation frame
let ySpeed = 3;

function animate(){
    moveIt();
    window.requestAnimationFrame(animate);
}

function init(){
    ctx.fillStyle = 'black';
    x = Math.floor(Math.random() * (canvas.width - logo.width));            // Random starting location
    y = Math.floor(Math.random() * (canvas.height - logo.height));
    ctx.drawImage(logo, x, y);
    animate();
}

function moveIt(){
    ctx.fillRect(0, 0, canvas.width, canvas.height);    // Resets the blank canvas
    ctx.drawImage(logo, x, y);
    x += xSpeed;                                        // Establishes new position
    y += ySpeed;
    if(x + logo.width >= canvas.width || x < 0){
        xSpeed = -xSpeed;                               // Reverses direction when it hits the right / left edge of frame
        nextLogo();                                     // Draws new logo in buffer to change colors
    }
    if(y + logo.height >= canvas.height || y < 0){
        ySpeed = -ySpeed;                               // Reverses direction when it hits the top / bottom edge of frame
        nextLogo();                                     // Draws new logo in buffer to change colors
    }
}

function nextLogo(){
    const buffer = document.createElement('canvas');                    // Creates new canvas for altering the logo
    [buffer.width, buffer.height] = [logo.width, logo.height]           // Sets canvas size to logo size
    const bx = buffer.getContext('2d');
    bx.drawImage(logo, 0, 0);
    
    const imageData = bx.getImageData(0, 0, logo.width, logo.height);   // Retrieves pixel data for logo
    const data = imageData.data;
    let colorScheme = randomColor();
    for (var i = 0; i < data.length; i += 4){           // Accounts for R, G, B & alpha
        if(data[i] !== 0){                              // Ignores black pixels
            data[i]       = colorScheme[0];            
            data[i+1]     = colorScheme[1];     
            data[i+2]     = colorScheme[2];
        }
    }
    bx.putImageData(imageData, 0, 0);                   // Loads new colors into image
    logo.src = buffer.toDataURL();                      // Sets logo source to canvas element
}

function randomColor(){                                 // RGB color schemes
    const colors = [
        [255, 1 , 1],
        [255, 128, 1],
        [255, 255, 1],
        [128, 255, 1],
        [1, 255, 255],
        [255, 1, 255],
        [128, 128, 128]
    ];
    const randomRGB = Math.floor(Math.random() * colors.length);
    return colors[randomRGB];
}

init();