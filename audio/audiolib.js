class OscillatorPlay {
    constructor(actx, frequency, constTime, type, delay) {
        this.actx = actx;
        this.frequency = frequency;
        this.constTime = constTime;
        this.type = type;
        this.delay = delay;
    }
    play() {
        let gainNode = this.actx.createGain();
        let os = this.actx.createOscillator();
        os.type = this.type;
        os.frequency.value = this.frequency;
        gainNode.connect(this.actx.destination);
        gainNode.gain.setTargetAtTime(0, this.actx.currentTime, this.constTime);
        os.connect(gainNode);
        os.start();
        os.stop(this.actx.currentTime + 5 * this.constTime); //5个周期后自动停止播放   
    }
}
class MusicPlay {
    constructor(path, audioBuffer, actx) {
    }
    load() {
        if (this.audioBuffer === undefined) {
            fetch(this.path)
                .then((response) => response.arrayBuffer())
                .then((v) => actx.decodeAudioData(v))
                .then((buffer) => this.audioBuffer = buffer)
                .catch((error) => console.log(error.message));
        }
    }
    play() {
        if (this.audioBuffer === undefined) {
            this.load();
        }
        else {
            this.source = actx.createBufferSource();
            this.source.buffer = this.audioBuffer;
            this.source.connect(actx.destination);
            this.source.start(0);
            // this.source.stop
        }
    }
}
//# sourceMappingURL=audiolib.js.map