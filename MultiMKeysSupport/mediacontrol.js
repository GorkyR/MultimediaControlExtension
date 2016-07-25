var next = null;
var prev = null;
var pause = null;
function Next(){
    try {
        next.click();
    }
    catch(err) {
        n = document.getElementsByClassName('ytp-next-button');
        if (n.length) {
            next = n[n.length-1];
            next.click();
        }
    }
}
function Previous(){
    try {
        prev.click();
    }
    catch(err){
        p = document.getElementsByClassName('ytp-prev-button');
        if (p.length){
            prev = p[p.length-1];
            prev.click();
        }
    }
}
function PausePlay(){
    try{
        pause.click();
    }
    catch (err) {
        p = document.getElementsByClassName('ytp-play-button');
        if (p.length) {
            pause = p[p.length-1];
            pause.click();
        }
    }
}
function CatchMultimedia(msg){
    cmd = msg.command;
    if (cmd == "next") {
        Next();
        console.log('"Next" command received.')
    }
    if (cmd == "prev") {
        Previous();
        console.log('"Replay/Previous" command received.')
    }
    if (cmd == "playpause") {
        PausePlay();
        console.log('"Pause/Play" command received.')
    }
}

var port = chrome.runtime.connect({name: "control"});
port.onMessage.addListener(CatchMultimedia);