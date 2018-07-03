var context = new (AudioContext || window.webkitAudioContext)();
var analyser = context.createAnalyser();
// ...
analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);
// Get a canvas defined with ID "oscilloscope"
var canvas = document.getElementById("oscilloscope");
var canvasCtx = canvas.getContext("2d");
function playSound() {
    var osc = context.createOscillator();
    osc.frequency.value = 60;
    osc.type = 'square';
    var oscGain = context.createGain();
    oscGain.gain.value = 0.2;
    osc.start(context.currentTime);
    osc.stop(context.currentTime + 3);
    osc.connect(oscGain);
    oscGain.connect(analyser); /*Connect oscillator to analyser node*/
    analyser.connect(context.destination);
}
// draw an oscilloscope of the current audio source
function drawWave() {
    requestAnimationFrame(drawWave);
    analyser.getByteTimeDomainData(dataArray);
    canvasCtx.fillStyle = "rgb(200, 200, 200)";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0, 0, 0)";
    canvasCtx.beginPath();
    var sliceWidth = canvas.width * 1.0 / bufferLength;
    var x = 0;
    for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * canvas.height / 2;
        if (i === 0) {
            canvasCtx.moveTo(x, y);
        }
        else {
            canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
    }
    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
}
window.onload = () => {
    // draw();
    var play = document.getElementById("play");
    play.onclick = () => {
        playSound();
        drawWave();
    };
};
//# sourceMappingURL=audiovisual.js.map