var canvas;
var ctx;
class Snow {
    constructor(x, y, color, linewidth, radius) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.linewidth = linewidth;
        this.radius = radius;
    }
    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.linewidth;
        // ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        let tha = Math.PI / 6;
        let dx = this.radius * Math.cos(tha);
        let dy = this.radius * Math.sin(tha);
        ctx.moveTo(this.x - dx, this.y - dy);
        ctx.lineTo(this.x + dx, this.y + dy);
        ctx.moveTo(this.x - dx, this.y + dy);
        ctx.lineTo(this.x + dx, this.y - dy);
        ctx.moveTo(this.x, this.y - this.radius);
        ctx.lineTo(this.x, this.y + this.radius);
        ctx.stroke();
        ctx.restore();
    }
}
var s = new Snow(50, 50, "white", 3, 20);
var snow_array = new Array();
function gameloop1() {
    requestAnimationFrame(gameloop1);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1280, 720);
    for (let i = 0; i < snow_array.length; i++) {
        s = snow_array[i];
        s.draw(ctx);
        let tha = 2 * Math.PI * Math.random();
        let dx = Math.abs(3 * Math.cos(tha));
        let dy = Math.abs(3 * Math.sin(tha));
        s.x = s.x + dx;
        s.y = s.y + dy;
    }
}
function init() {
    for (let i = 0; i < 100; i++) {
        let x = Math.ceil(Math.random() * 1280);
        let y = Math.ceil(Math.random() * 720);
        let r = Math.ceil(Math.random() * 20);
        snow_array.push(new Snow(x, y, "white", 3, r));
    }
}
window.onload = () => {
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    init();
    gameloop1();
};
//# sourceMappingURL=snow.js.map