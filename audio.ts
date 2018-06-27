
var actx:AudioContext;
var buffer:AudioBuffer;
var loader:AudioBufferLoader;
function init_audio(){
    // window.AudioContext = window.AudioContext || window.webkitAudioContext;
    // let bufferLoad:BufferLoader = new BufferLoader();
    AudioContext = AudioContext || webkitAudioContext;
    actx = new AudioContext();
    
    // let buf:AudioBuffer = actx.decodeAudioData()
    loader = new AudioBufferLoader("./test/sounds/beer_can_opening.mp3",decodeBuffer);
    loader.load();
}
class AudioBufferLoader{
    path:string;
    abuf:AudioBuffer;
    callback:(Response)=>Promise<AudioBuffer>;
    constructor(path,callback:(Response)=>Promise<AudioBuffer>){
        this.path = path;
        this.callback = callback;
    }
    load(){
        fetch(this.path)
            .then((response)=>response.arrayBuffer())
            .then(this.callback)
            .then((value:AudioBuffer)=>buffer=value);
    }
}
function playMusic(){
    let source:AudioBufferSourceNode= actx.createBufferSource();
    source.buffer = buffer;
    source.connect(actx.destination);
    source.start(0);
}
function decodeBuffer(ab:ArrayBuffer){
    console.log('decodeBuffer');
    return actx.decodeAudioData(ab);
}
window.onload=()=>{
    let play:HTMLButtonElement = <HTMLButtonElement>document.getElementById("play");
    let stop:HTMLButtonElement = <HTMLButtonElement> document.getElementById("stop");
    // play.
    init_audio();
    play.addEventListener("click",playMusic);

}