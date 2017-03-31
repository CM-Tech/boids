var w = window.innerWidth;
var h = window.innerHeight;
var c = document.getElementById("c");
c.width = w;
c.height = h;
var ctx = c.getContext("2d");

var boids = [];
var avoids = [];

var maxSpeed = 2;
var friendRadius = 20;
var crowdRadius = 10;
var avoidRadius = 30;
var coheseRadius = friendRadius;

function Avoid(x, y) {
    this.pos = new Vec(x, y);
    this.draw = function() {
        ctx.fillStyle = "rgba(244, 64, 52, 0.75)";
        ctx.strokeStyle = "#323232";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    };
}

for (var i = 0; i < window.innerWidth * window.innerHeight / 9000; i++) {
    boids.push(new Boid(Math.random() * w, Math.random() * h));
}
for (var i = 0; i < window.innerWidth * window.innerHeight / 11000; i++) {
    avoids.push(new Avoid(Math.random() * w, Math.random() * h));
}

function tick() {
    ctx.clearRect(0, 0, w, h);
ctx.beginPath();
ctx.fillStyle="rgba(255,255,255,0.75)";
ctx.fillRect(0,0,w,h);
    for (var i = 0; i < h; i += 15) {
        ctx.strokeStyle = "#5892d8";
        ctx.beginPath();
        ctx.lineWidth = (i % 30) / 30 + 1;
        ctx.moveTo(0, i+0.5);
        ctx.lineTo(w, i+0.5);
        ctx.stroke();
    }

    ctx.strokeStyle = "#f0615b";
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(40.5, 0);
    ctx.lineTo(40.5, h);
    ctx.stroke();

    boids.map(function(bo) {
        bo.update(boids, avoids);
        bo.draw(ctx);
    });
    avoids.map(function(av) {
        av.draw();
    });

    window.requestAnimationFrame(tick);
}
window.requestAnimationFrame(tick);

window.addEventListener("resize", function() {
    w = window.innerWidth;
    h = window.innerHeight;
    c.width = w;
    c.height = h;

    avoids = [];
    for (var i = 0; i < window.innerWidth * window.innerHeight / 11000; i++) {
        avoids.push(new Avoid(Math.random() * w, Math.random() * h));
    }
}, false);

window.addEventListener("mousedown", function(e) {
    boids.push(new Boid(e.clientX, e.clientY));
}, false);
window.addEventListener("keydown", function(e) {
    if (e.keyCode == 32) {
        boids = boids.map(function(bo) {
            bo.hue = new Vec(Math.random() * Math.PI * 2 - Math.PI,
                             Math.random() * Math.PI * 2 - Math.PI).normalize(1);
            return bo;
        });
    }
}, false);