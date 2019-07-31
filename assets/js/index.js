URL = window.URL || window.webkitURL;
var gumStream; 
var rec;
var input;
var AudioContext;
var audioContext;
window.addEventListener('load',bindEvents);
function bindEvents() {
    document.querySelector('#reset').disabled=true;
    document.querySelector('#recordButton').addEventListener('click',startRecording);
    document.querySelector('#stopButton').addEventListener('click',stopRecording);
    document.querySelector('#pauseButton').addEventListener('click',pauseRecording);
    document.querySelector('#reset').addEventListener('click',resetAll);
}
function resetAll() {
    window.location.reload();
}
let countDown;
function decrementCounter() {
    --countDown;
    if(countDown!=0){
    document.querySelector('#showCountDown').innerText=countDown;
    }
}
function startRecording() { console.log("recordButton clicked");
    countDown=(config.timeDelay)/1000;
    document.querySelector('#reset').disabled=false;
    document.querySelector('#showCountDown').classList.remove('d-none');
    AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
    document.querySelector('#showCountDown').innerText=countDown;
    let initialInterval=setInterval(()=> {
        decrementCounter();
    },1000);
    setTimeout(()=> {
        clearInterval(initialInterval);
        document.querySelector('#showCountDown').classList.add('d-none');
        audioContext.resume().then(()=> {
            var constraints = {
                audio: true,
                video: false
            } 
            recordButton.disabled = true;
            stopButton.disabled = false;
            pauseButton.disabled = false;
            navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
                console.log("getUserMedia() success, stream created, initializing Recorder.js ..."); 
                gumStream = stream;
                input = audioContext.createMediaStreamSource(stream);
                rec = new Recorder(input, {
                    numChannels: 1
                }) 
                rec.record()
                console.log("Recording started");
            }).catch(function(err) {
                recordButton.disabled = false;
                stopButton.disabled = true;
                pauseButton.disabled = true
        })  
        })
    },config.timeDelay);
}
function pauseRecording() {
    console.log("pauseButton clicked rec.recording=", rec.recording);
    if (rec.recording) {
        rec.stop();
        pauseButton.innerHTML = "Resume";
    } else {
        rec.record()
        pauseButton.innerHTML = "Pause";
    }
}
function stopRecording() {
    console.log("stopButton clicked");
    stopButton.disabled = true;
    recordButton.disabled = false;
    pauseButton.disabled = true;
    pauseButton.innerHTML = "Pause";
    rec.stop();
    gumStream.getAudioTracks()[0].stop();
    rec.exportWAV(createDownloadLink);
}
function createDownloadLink(blob) {
    var url = URL.createObjectURL(blob);
    var au = document.createElement('audio');
    var li = document.createElement('li');
    var link = document.createElement('a');
    au.controls = true;
    au.src = url;
    link.href = url;
    link.download = new Date().toISOString() + '.wav';
    console.log(link.download);
    link.innerHTML = link.download; 
    li.appendChild(au);
    // li.appendChild(link); 
    recordingsList.appendChild(li);
}
