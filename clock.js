// import * as ionsound from {"ion-sound"}
var canvas;
var ctx;
class Clock {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hour = 2;
        this.minute = 30;
        this.second = 50;
    }
    draw(ctx) {
        this.drawCircle(ctx);
        this.drawScale(ctx);
        this.drawHour(ctx);
        this.drawMinute(ctx);
        this.drawSecond(ctx);
        // ctx.save();
        // ctx.strokeStyle = "white";
        // ctx.lineWidth = 2;
        // ctx.beginPath();
        // let tr = 0.9*this.r;
        // for(let i=0;i<60;i++){
        //     let tha:number = (i*6/360)*2*Math.PI;
        //     let sin:number = Math.sin(tha);
        //     let cos:number = Math.cos(tha);
        //     let startX:number = tr*cos + this.x;
        //     let startY:number = tr*sin + this.y;
        //     let endX:number = this.r*cos + this.x;
        //     let endY:number = this.r*sin + this.y;
        //     ctx.moveTo(startX,startY);
        //     ctx.lineTo(endX,endY);
        // }
        // ctx.stroke();
        // ctx.restore();
    }
    drawCircle(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.x, this.y, 0.9 * this.r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.x, this.y, 0.1 * this.r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }
    drawScale(ctx) {
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.beginPath();
        let tr = 0.9 * this.r;
        for (let i = 0; i < 60; i++) {
            let tha = (i * 6 / 360) * 2 * Math.PI;
            let sin = Math.sin(tha);
            let cos = Math.cos(tha);
            let startX = tr * cos + this.x;
            let startY = tr * sin + this.y;
            let endX = this.r * cos + this.x;
            let endY = this.r * sin + this.y;
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
        }
        ctx.stroke();
        ctx.restore();
    }
    drawHour(ctx) {
        ctx.save();
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 5;
        ctx.beginPath();
        let tha = ((-30 * this.hour + 90) / 360) * 2 * Math.PI;
        let sin = Math.sin(tha);
        let cos = Math.cos(tha);
        let tr = 0.5 * this.r;
        let endX = this.x + tr * cos;
        let endY = this.y - tr * sin;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.restore();
    }
    drawMinute(ctx) {
        ctx.save();
        ctx.strokeStyle = "green";
        ctx.lineWidth = 5;
        ctx.beginPath();
        let tha = ((6 * this.minute + 90) / 360) * 2 * Math.PI;
        let sin = Math.sin(tha);
        let cos = Math.cos(tha);
        let tr = 0.7 * this.r;
        let endX = this.x - tr * cos;
        let endY = this.y - tr * sin;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.restore();
    }
    drawSecond(ctx) {
        ctx.save();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.beginPath();
        let tha = ((6 * this.second + 90) / 360) * 2 * Math.PI;
        let sin = Math.sin(tha);
        let cos = Math.cos(tha);
        let tr = 0.8 * this.r;
        let endX = this.x - tr * cos;
        let endY = this.y - tr * sin;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.restore();
    }
}
var c1 = new Clock(500, 500, 100);
function clockloop() {
    requestAnimationFrame(clockloop);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1280, 720);
    c1.draw(ctx);
    ctx.save();
    ctx.fillStyle = "white";
    ctx.font = "48px serif";
    ctx.fillText(dt.toLocaleTimeString(), 100, 100);
    ctx.restore();
}
var dt;
function timer() {
    dt = new Date();
    c1.hour = dt.getHours();
    c1.minute = dt.getMinutes();
    c1.second = dt.getSeconds();
}
window.onload = () => {
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    dt = new Date();
    setInterval(timer, 1000);
    clockloop();
};
//# sourceMappingURL=clock.js.map