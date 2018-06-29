var testdiv;
var nodetable = {};
var actx;
var select;
var rangeInput;
var attenuationInput;
var delayInput;
var span;
var dd;
var ad;
var toneTable = {};
var testmusic = ["A4", "B4", "C5", "B4", "C5", "E5", "B4", "", "", "E4", "E4",
    "A4", "G4", "A4", "C5", "G4", "", "", "E4", "F4", "E4", "F4", "C5",
    "E4", "", "C5", "C5", "C5", "B4", "F4", "F4", "B4", "B4"];
var testmusic1 = [0, 0, 0, 6, 7, 51, 7, 51, 53, 7, 0, 0, 3, 3,
    6, 5, 6, 51, 5, 0, 0, 3, 4, 3, 4, 51,
    3, 0, 0, 51, 51, 51, 7, 4, 4, 7, 7, 0, 0, 6, 7,
    51, 7, 51, 53, 7, 0, 0, 3, 3, 6, 5, 6, 51,
    5, 0, 0, 2, 3, 4, 51, 7, 7, 51, 51, 52, 52, 53, 51, 51, 0,
    51, 7, 6, 6, 7, 5, 6, 0, 0, 51, 52, 53, 52, 53, 55,
    52, 0, 0, 5, 5, 51, 7, 51, 53, 53, 0, 0, 0,
    6, 7, 51, 7, 52, 52, 51, 5, 5, 0, 54, 53, 52, 51,
    53, 0, 0, 53, 56, 0, 55, 55, 53, 52, 51, 0, 51,
    52, 51, 52, 52, 55, 53, 0, 0, 53, 56, 0, 55, 0,
    53, 52, 51, 0, 0, 51, 52, 51, 52, 52, 7, 6];
function convert(data) {
    let ret = [];
    let t = ["", "C", "D", "E", "F", "G", "A", "B"];
    for (let d of data) {
        if (d == 0) {
            ret.push("");
            continue;
        }
        if (d < 10) {
            ret.push(t[d] + "4");
            continue;
        }
        let high = Math.floor(d / 10);
        let low = d % 10;
        ret.push(t[low] + high);
    }
    return ret;
}
var btn;
class Music {
    constructor(data) {
        this.data = data;
    }
    play(speed) {
        let i = 0;
        for (let d of this.data) {
            i = i + 1;
            let tone = toneTable[d];
            if (tone === undefined) { //处理停顿
                setTimeout(() => { }, 500 * i);
                continue;
            }
            let sound = tone.sound;
            let keydiv = tone.keydiv;
            setTimeout(() => {
                sound.playAttenuation("sine");
                keydiv.className = "press";
            }, 500 * (i - 1));
            setTimeout(() => {
                sound.stop();
                keydiv.className = "";
            }, 500 * i);
            //这个代码是有问题的，因为setTimeout不会阻塞，那么也就是说，同时会有多个延时
            //这里的难点就是要顺序执行
        }
    }
    playnums(nums) {
        this.data = convert(nums);
        this.play(0);
    }
}
class Sound {
    constructor(frequency) {
        this.isplay = false;
        this.frequency = frequency;
    }
    play(type, value = 1) {
        if (!this.isplay) {
            this.isplay = true;
            this.os = actx.createOscillator();
            this.gain = actx.createGain();
            this.os.type = type;
            this.gain.gain.setValueAtTime(value, actx.currentTime);
            this.gain.connect(actx.destination);
            this.os.frequency.setValueAtTime(this.frequency, actx.currentTime);
            this.os.connect(this.gain);
            this.os.start();
        }
    }
    //上面的代码存在一个问题，声音很单调，在实际的弦乐器弹奏中，声音是越来越小的。
    playAttenuation(type) {
        if (!this.isplay) {
            this.os = actx.createOscillator();
            this.gain = actx.createGain();
            this.os.type = type;
            this.gain.connect(actx.destination);
            this.os.frequency.setValueAtTime(this.frequency, actx.currentTime);
            this.os.connect(this.gain);
            this.gain.gain.setTargetAtTime(0, actx.currentTime, 0.2);
            this.os.start();
            this.isplay = true;
        }
    }
    stop() {
        if (this.isplay) {
            // this.os.stop();
            this.os.stop(actx.currentTime + 0.5); //延迟关闭
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
        // console.log(rangeInput.valueAsNumber)
        // sound.play(select.value||"sine",rangeInput.valueAsNumber/100);
        sound.playAttenuation(select.value || "sine");
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
    rangeInput = document.getElementById("soundValue");
    span = document.getElementById("dsv");
    delayInput = document.getElementById("delay");
    attenuationInput = document.getElementById("attenuation");
    dd = document.getElementById("dd");
    ad = document.getElementById("ad");
    btn = document.getElementById("play");
    let btn1 = document.getElementById("play1");
    let btnplay = document.getElementById("playinput");
    let ta = document.getElementById("inputmusic");
    dd.innerHTML = delayInput.value;
    ad.innerHTML = attenuationInput.value;
    span.innerHTML = rangeInput.value;
    rangeInput.onchange = (event) => {
        let target = event.target;
        // let span = <HTMLSpanElement>document.getElementById("dsv");
        span.innerHTML = target.value;
    };
    delayInput.onchange = (event) => {
        let target = event.target;
        dd.innerHTML = target.value;
    };
    attenuationInput.onchange = (event) => {
        let target = event.target;
        ad.innerHTML = target.value;
    };
    btn.onclick = () => {
        let m = new Music(testmusic);
        m.play(0);
        // m.playnums(testmusic1);
    };
    btn1.onclick = () => {
        let m = new Music(testmusic);
        m.playnums(testmusic1);
    };
    btnplay.onclick = () => {
        let notes = ta.value.split(/\s+/);
        let nn = notes.map((v) => parseInt(v));
        let m = new Music(testmusic); //testmusic没有任何作用；
        m.playnums(nn);
    };
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
        toneTable[name] = { 'frequency': frequency, 'name': name, 'keydiv': item, 'sound': new Sound(frequency) };
        // console.log(toneTable);
    }
}
window.onload = () => {
    init_piano();
};
//# sourceMappingURL=piano.js.map