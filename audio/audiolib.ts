class OscillatorPlay{
    actx:AudioContext;//音频上下文
    frequency:number;//振动频率
    constTime:number;//衰减单位时间，大约5个单位时间之后，振幅会达到目标值
    type:any;//波形
    delay:number;//延迟播放时间

    constructor(actx:AudioContext,frequency:number,constTime:number,type,delay:number){
        this.actx = actx;
        this.frequency = frequency;
        this.constTime = constTime;
        this.type = type;
        this.delay = delay;
    }
    play(){
        let gainNode = this.actx.createGain();
        let os:OscillatorNode = this.actx.createOscillator();
        os.type = this.type;
        os.frequency.value = this.frequency;
        gainNode.connect(this.actx.destination);
        gainNode.gain.setTargetAtTime(0,this.actx.currentTime,this.constTime);
        os.connect(gainNode);
        os.start();
        os.stop(this.actx.currentTime+5*this.constTime);//5个周期后自动停止播放   
    }
}

class MusicPlay{
    path:string;//资源路径
    audioBuffer:AudioBuffer;//音源数据
    actx:AudioContext;//上下文音频管理器
    private source:AudioBufferSourceNode;
    constructor(path:string,audioBuffer:AudioBuffer,actx:AudioContext){

    }
    load(){
        if(this.audioBuffer === undefined){
            fetch(this.path)
                .then((response)=>response.arrayBuffer())
                .then((v)=>actx.decodeAudioData(v))
                .then((buffer)=>this.audioBuffer=buffer)
                .catch((error)=>console.log(error.message));
        }
    }

    play(){
        if(this.audioBuffer === undefined){
            this.load();
        }else{
            this.source = actx.createBufferSource();
            this.source.buffer = this.audioBuffer;
            this.source.connect(actx.destination);
            this.source.start(0);
            // this.source.stop
        }
        
    }
}