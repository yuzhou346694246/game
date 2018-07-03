var animation;
var ctx;
var canvas;
class Sine {
    constructor(angle, frequency, color, linewidth, xlen) {
        this.angle = angle;
        this.frequency = frequency;
        this.color = color;
        this.linewidth = linewidth;
        // this._last = 0;
        this._i = 0;
        this.xlen = xlen;
        this._offset = 0;
    }
    draw(ctx) {
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.linewidth;
        ctx.beginPath();
        // let y = [];
        // for(let i=0;i<1000;i++){
        //     let xx = (2*Math.PI*this.frequency*i/1000.0);//+this.angle;
        //     let amp = Math.sin(xx);
        //     y.push(amp);
        // }
        // // console.log(y);
        // for(let i=0;i<999;i++){
        //     let x0 = Math.floor(400*i/1000);// 400*i/1000
        //     let y0 = Math.floor(200-200*y[i]);
        //     let x1 = Math.floor(400*(i+1)/1000);// 400*i/1000
        //     let y1 = Math.floor(200-200*y[i+1]);
        //     ctx.moveTo(x0,y0);
        //     ctx.lineTo(x1,y1);
        //     ctx.stroke();
        //     console.log(y0,y1);
        // }
        for (let i = 0; i < this._x.length - 1; i++) {
            let x0 = this._x[i];
            let y0 = this._y[i];
            let x1 = this._x[i + 1];
            let y1 = this._y[i + 1];
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.stroke();
        }
        ctx.stroke();
        ctx.restore();
    }
    calc(num) {
        let sv = [];
        let si = [];
        // let offset = 0;
        this._i = this._i + num;
        if (this._i > this.xlen) {
            this._offset = this._offset + this._i - this.xlen;
            this._i = this.xlen;
            //     offset = 0;
            // }else{
            //     offset = this._i - this.xlen;
            //     this._i = this.xlen;
        }
        this._x = new Array();
        this._y = new Array();
        for (let i = 0; i < this._i; i++) { //当数据点不足xlen时，起始点都从0开始，但当数据点大于xlen时，应该考虑移动相位
            let tha = (2 * Math.PI * (i + this._offset) * this.frequency / this.xlen); //+this.angle;
            let amp = Math.sin(tha);
            let y = Math.floor(200 - 200 * amp); //这个也要修改
            // sv.push(amp);
            // si.push(i);
            this._x.push(i);
            this._y.push(y);
        }
    }
}
function animationInit() {
    canvas = document.getElementById("animation");
    ctx = canvas.getContext("2d");
}
var sin = new Sine(0, 1, "blue", 1, 400);
// sin.calc();
function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, 400, 400);
    sin.draw(ctx);
    // 
}
window.onload = () => {
    animationInit();
    sin.calc(2);
    setInterval(() => {
        sin.calc(10);
    }, 100);
    draw();
};
//# sourceMappingURL=animation.js.map