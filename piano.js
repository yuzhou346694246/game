var testdiv;
var nodetable = {};
var actx;
var select;
class Sound {
    constructor(frequency) {
        this.isplay = false;
        this.frequency = frequency;
    }
    play(type) {
        if (!this.isplay) {
            this.isplay = true;
            this.os = actx.createOscillator();
            this.os.type = type;
            this.os.frequency.setValueAtTime(this.frequency, actx.currentTime);
            this.os.connect(actx.destination);
            this.os.start();
        }
    }
    stop() {
        if (this.isplay) {
            this.os.stop();
            this.isplay = false;
        }
    }
}
function keydown(event) {
    testdiv.innerHTML = event.key;
    let key = event.key.toUpperCase();
    if (nodetable[key] != undefined) {
        let node = nodetable[key];
        let keydiv = node['keydiv'];
        // let os:OscillatorNode = actx.createOscillator();
        // os.type = 'square';
        // os.frequency.setValueAtTime(node['frequency'], actx.currentTime); // value in hertz
        // os.connect(actx.destination);
        // os.start();
        let sound = node['sound'];
        sound.play(select.value || "sine");
        keydiv.className = "press";
    }
}
function keyup(event) {
    testdiv.innerHTML = event.key;
    let key = event.key.toUpperCase();
    if (nodetable[key] != undefined) {
        let node = nodetable[key];
        let keydiv = node['keydiv'];
        keydiv.className = "";
        let sound = node['sound'];
        sound.stop();
    }
}
function init_piano() {
    testdiv = document.getElementById("test");
    select = document.getElementById("soundType");
    AudioContext = AudioContext || webkitAudioContext;
    actx = new AudioContext();
    window.addEventListener("keydown", keydown);
    window.addEventListener("keyup", keyup);
    let keys = document.querySelectorAll(".row>div");
    for (let item of keys) {
        let key = item.getAttribute('data-key');
        let frequency = parseFloat(item.getAttribute('data-frequency'));
        let name = item.getAttribute('data-name');
        nodetable[key] = { 'frequency': frequency,
            'name': name, 'keydiv': item, 'sound': new Sound(frequency) };
    }
}
window.onload = () => {
    init_piano();
};
//# sourceMappingURL=piano.js.map