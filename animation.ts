

var animation:HTMLCanvasElement;
var ctx:CanvasRenderingContext2D;
var canvas:HTMLCanvasElement;

class Sine{
    angle:number;//初始角度
    frequency:number;//频率
    color: string | CanvasGradient | CanvasPattern;//线条颜色
    linewidth:number;
    _x:Array<number>;
    _y:Array<number>;
    _offset:number;
    _i:number;
    xlen:number;//横坐标的宽度
    constructor(angle:number,frequency:number,color:string | CanvasGradient | CanvasPattern,linewidth:number,xlen:number){
        this.angle = angle;
        this.frequency = frequency;
        this.color = color;
        this.linewidth = linewidth;
        // this._last = 0;
        this._i = 0;
        this.xlen = xlen;
        this._offset = 0;
    }
    draw(ctx:CanvasRenderingContext2D){
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
        
        for(let i = 0;i<this._x.length-1;i++){
            let x0 = this._x[i];
            let y0 = this._y[i];
            let x1 = this._x[i+1];
            let y1 = this._y[i+1];
            ctx.moveTo(x0,y0);
            ctx.lineTo(x1,y1);
            ctx.stroke();
        }
        ctx.stroke();
        ctx.restore();
    }
    calc(num:number){//num 要比2大 比1000小
        let sv = [];
        let si = [];
        // let offset = 0;
        this._i = this._i + num;
        if(this._i>this.xlen){
            this._offset = this._offset+this._i-this.xlen;
            this._i = this.xlen;
        //     offset = 0;
        // }else{
        //     offset = this._i - this.xlen;
        //     this._i = this.xlen;
        }
        this._x = new Array<number>();
        this._y = new Array<number>();
        for(let i = 0;i<this._i;i++){//当数据点不足xlen时，起始点都从0开始，但当数据点大于xlen时，应该考虑移动相位
            let tha = (2*Math.PI*(i+this._offset)*this.frequency/this.xlen);//+this.angle;
            let amp = Math.sin(tha);
            let y = Math.floor(200-200*amp);//这个也要修改
            // sv.push(amp);
            // si.push(i);
            this._x.push(i);
            this._y.push(y)
        }
       
  
    }
}


function animationInit(){
    canvas = <HTMLCanvasElement>document.getElementById("animation");
    ctx = canvas.getContext("2d");
}
var sin:Sine = new Sine(0,1,"blue",1,400);
// sin.calc();
function draw(){
    requestAnimationFrame(draw);
    ctx.clearRect(0,0,400,400);
    sin.draw(ctx);
    // 
}

window.onload=()=>{
    animationInit();
    sin.calc(2);
    setInterval(()=>{
        sin.calc(10);
    },100);
    draw();
}