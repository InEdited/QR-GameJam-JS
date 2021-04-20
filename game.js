D = document; D.write("<body>");
canvas = D.createElement("canvas");
canvas.fillStyle = "#FFFFFF";
D.body.appendChild(canvas);
var context = canvas.getContext("2d");
canvas.width = window.innerWidth; //document.width is obsolete
canvas.height = window.innerHeight; //document.height is obsolete
var GAME_SPEED = 16;
var speedModifier = prompt("Please enter the speed modifier you want \nLeft click to reverse gravity", "1");
var boid = {
    id: 0,
    x: getRandomInt(0, canvas.width),
    y: getRandomInt(0, canvas.height),
    speedX: 0.5,
    speedY: 0.5
}
var boids = [];
boids.push(boid);
var i = canvas.width / 2;
var j = canvas.height / 2;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
onmousemove = function (e) {
    i = e.clientX;
    j = e.clientY
}
function normalize(x, y) {
    w = Math.sqrt(x * x + y * y);
    x = x / w;
    y = y / w;
    return { x, y };
}
console.log(boid.x, boid.y);
for (let index = 1; index < 5000; index++) {
    var boinew = {
        id: index,
        x: getRandomInt(0, canvas.width),
        y: getRandomInt(0, canvas.height),
        speedX: 0.5,
        speedY: 0.5
    }
    boids.push(boinew);
}
boidsfadla = [...boids];
console.log(boids);
var gravity = true;
var x, y;
x = i;
y = j;
context.fillStyle = "#000000";
function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    boids.forEach(boi => {
        //console.log(boi);
        norm = normalize(i - boi.x, j - boi.y);
        boi.speedX = norm.x * speedModifier;
        boi.speedY = norm.y * speedModifier;
        context.beginPath();
        context.ellipse(boi.x + boi.speedX, boi.y + boi.speedY, 5, 5, Math.PI / 4, 0, 2 * Math.PI);
        context.fill();
        boi.x = boi.x + boi.speedX;
        boi.y = boi.y + boi.speedY;
    });
}
canvas.addEventListener('mousedown', function (evt) {
    if (evt.button == 0) {
        speedModifier = -speedModifier;
    }
});
setInterval(loop, GAME_SPEED);