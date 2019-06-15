const nbMovers = 5;
const accelerationScale = 0.2;
const moverTopspeed = 10;
const nbLastLocations = 50;

let canvas, ctx, mouse;
let movers = [];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static add(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
    }

    static sub(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
    }

    static mult(v1, n) {
        return new Vector(v1.x * n, v1.y * n);
    }
    mult(n) {
        this.x *= n;
        this.y *= n;
    }

    static div(v1, n) {
        return new Vector(v1.x / n, v1.y / n);
    }
    div(n) {
        this.x /= n;
        this.y /= n;
    }

    get mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        let m = this.mag;
        if (m != 0) {
            this.div(m);
        }
    }

    limit(n) {
        if (this.mag > n) {
            this.normalize();
            this.mult(n);
        }
    }
}

class Mover {
    constructor(topspeed) {
        this.location = new Vector(
            getRandomInt(0, window.innerWidth),
            getRandomInt(0, window.innerHeight)
        );
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.topspeed = topspeed;
        this.lastLocations = [];
    }

    update() {
        this.acceleration = Vector.sub(mouse, this.location);
        this.acceleration.normalize();
        this.acceleration.mult(accelerationScale);

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topspeed);
        this.lastLocations.unshift(new Vector(this.location.x, this.location.y));
        this.lastLocations = this.lastLocations.slice(0, nbLastLocations);
        this.location.add(this.velocity);
    }

    display() {
        let img = new Image();
        img.src = "./images/raluca.png";
        ctx.drawImage(img, this.location.x, this.location.y);

        ctx.beginPath();
        // ctx.fillStyle = "#ecf0f1";
        // ctx.arc(this.location.x, this.location.y, 12, 0, 2 * Math.PI, false);
        // ctx.fill();
        this.lastLocations.forEach(location => {
            ctx.fillStyle = "#e74c3c";
            ctx.fillRect(location.x, location.y, 1, 1);
        });

        ctx.stroke();
    }

    checkEdges() {
        if (this.location.x > window.innerWidth) {
            this.location.x = 0;
        } else if (this.location.x < 0) {
            this.location.x = window.innerWidth;
        }
        // Check y location
        if (this.location.y > window.innerHeight) {
            this.location.y = 0;
        } else if (this.location.y < 0) {
            this.location.y = window.innerHeight;
        }
    }
}

let draw = timestamp => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = "#2c3e50";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    movers.forEach(mover => {
        mover.update();
        mover.checkEdges();
        mover.display();
    });
    requestAnimationFrame(draw);
};

window.onload = function() {
    canvas = document.getElementById("canvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    ctx = canvas.getContext("2d");

    for (let i = 0; i < nbMovers; i++) {
        movers[i] = new Mover(moverTopspeed);
    }
    mouse = new Vector(window.innerWidth / 2, window.innerHeight / 2);

    window.requestAnimationFrame(draw);
};

window.onmousemove = event => {
    mouse = new Vector(event.clientX, event.clientY);
};