//https://www.youtube.com/watch?v=MW8HcwHK1S0

var c = document.createElement("canvas");
var ctx = c.getContext("2d");
c.width = 500;
c.height = 350;
document.body.appendChild(c);

var perm = [];
while (perm.length < 255) {
    while (perm.includes(val = Math.floor(Math.random() * 255)));
    perm.push(val);
}

var lerp = (a, b, t) => a + (b - a) * (1 - Math.cos(t * Math.PI)) / 2;
var noise = x => {
    x = x * 0.01 % 255;
    return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
}

var player = new function () {
    this.x = c.width / 2;
    this.y = 0;
    this.ySpeed = 0;
    this.rot = 0;

    this.img = new Image();
    this.img.src = "pokeball.png";
    this.draw = function () {
        var p1 = c.height - noise(t + this.x) * 0.25;
        var p2 = c.height - noise(t + 5 + this.x) * 0.25;


        if (p1 - 15 > this.y) {
            this.ySpeed += 0.1;
        } else {
            this.ySpeed -= this.y - (p1 - 15);
            this.y = p1 - 15;
        }
        var angle = Math.atan2((p2 - 15) - this.y)
        this.y += this.ySpeed;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(this.img, -15, -15, 30, 30);
        ctx.restore();
    }
}

var t = 0;

function loop() {
    t += 1;
    ctx.fillStyle = "#19f";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0, c.height);
    for (let i = 0; i < c.width; i++)
        ctx.lineTo(i, c.height - noise(t + i) * 0.25);

    ctx.lineTo(c.width, c.height);
    ctx.fill();

    player.draw();
    requestAnimationFrame(loop);
}

loop();