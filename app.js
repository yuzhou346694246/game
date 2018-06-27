var canvas;
var ctx;
class Circle {
    constructor(x, y, linewidth, radius, color) {
        this.x = x;
        this.y = y;
        this.linewidth = linewidth;
        this.radius = radius;
        this.color = color;
    }
    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.linewidth;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }
}
class Rect {
    constructor(x, y, linewidth, width, height, color) {
        this.x = x;
        this.y = y;
        this.linewidth = linewidth;
        this.color = color;
        this.width = width;
        this.height = height;
    }
    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.linewidth;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.restore();
    }
}
var paint_array = new Array();
var c = new Circle(50, 50, 5, 30, "blue");
var r = new Rect(200, 200, 3, 200, 200, "red");
paint_array.push(c);
paint_array.push(r);
var i = 0;
function gameloop() {
    requestAnimationFrame(gameloop);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1280, 720);
    // ctx.save();
    // ctx.beginPath();
    // ctx.strokeStyle = "red";
    // ctx.lineWidth = 5;
    // ctx.arc(400,400,100,0,2*Math.PI)
    // ctx.stroke();
    // ctx.restore();
    for (var i = 0; i < paint_array.length; i++) {
        let shape = paint_array[i];
        shape.draw(ctx);
        // shape.x++;
    }
}
function timer_callback() {
    for (var i = 0; i < paint_array.length; i++) {
        let shape = paint_array[i];
        // shape.draw(ctx);
        shape.x = shape.x + 20;
    }
}
function moveXY(dx, dy) {
    for (var i = 0; i < paint_array.length; i++) {
        let shape = paint_array[i];
        // shape.draw(ctx);
        shape.x = shape.x + dx;
        shape.y = shape.y + dy;
    }
}
function keypress(event) {
    let key = event.key;
    let dx = 0;
    let dy = 0;
    switch (key) {
        case "ArrowDown":
            dy = 20;
            break;
        case "ArrowUp":
            dy = -20;
            break;
        case "ArrowLeft":
            dx = -20;
            break;
        case "ArrowRight":
            dx = 20;
            break;
        default:
            break;
    }
    moveXY(dx, dy);
}
function myTimer() {
    var d = new Date();
    var t = d.toLocaleTimeString();
    document.getElementById("demo").innerHTML = t;
}
window.onload = () => {
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    // var myVar = setInterval(myTimer, 1000);
    // setInterval(timer_callback,1000);
    document.addEventListener('keydown', keypress);
    gameloop();
};
//# sourceMappingURL=app.js.map