var actx;
var buffer;
var loader;
function init_audio() {
    // window.AudioContext = window.AudioContext || window.webkitAudioContext;
    // let bufferLoad:BufferLoader = new BufferLoader();
    AudioContext = AudioContext || webkitAudioContext;
    actx = new AudioContext();
    // let buf:AudioBuffer = actx.decodeAudioData()
    loader = new AudioBufferLoader("./test/sounds/beer_can_opening.mp3", decodeBuffer);
    loader.load();
}
class AudioBufferLoader {
    constructor(path, callback) {
        this.path = path;
        this.callback = callback;
    }
    load() {
        fetch(this.path)
            .then((response) => response.arrayBuffer())
            .then(this.callback)
            .then((value) => buffer = value);
    }
}
function playMusic() {
    let source = actx.createBufferSource();
    source.buffer = buffer;
    source.connect(actx.destination);
    source.start(0);
}
function decodeBuffer(ab) {
    console.log('decodeBuffer');
    return actx.decodeAudioData(ab);
}
window.onload = () => {
    let play = document.getElementById("play");
    let stop = document.getElementById("stop");
    // play.
    init_audio();
    play.addEventListener("click", playMusic);
};
//# sourceMappingURL=audio.js.map