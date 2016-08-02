var next = null;
var prev = null;
var pause = null;

var localPlay = ['Play', 'Replay'];
var localPause = ['Pause'];

function contains(list, string){
    if (list.indexOf(string) != -1) return true;
    else{ return false; }
}

function Next(){
    try {
        next.click();
    }
    catch(err) {
        n = document.getElementsByClassName('ytp-next-button');
        if (n.length) {
            next = n[n.length-1];
            Next();
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
            Previous();
        }
    }
}
function PausePlay(state){
    try{
        if (state && (contains(localPlay, pause.getAttribute('aria-label')) || contains(localPlay, pause.getAttribute('title')) ) ){
            pause.click();
        }
        else if (state == 0 && localPause.indexOf(pause.getAttribute('aria-label')) != -1)
        {
            pause.click();
        }
    }
    catch (err) {
        if (err instanceof TypeError){
            p = document.getElementsByClassName('ytp-play-button');
            if (p.length) {
                pause = p[p.length-1];
                PausePlay(state);
            }
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
    if (cmd == "play") {
        PausePlay(1);
        console.log('"Play" command received.')
    }
    if (cmd == "pause") {
        PausePlay(0);
        console.log('"Pause" command received.')
    }
}

var port = chrome.runtime.connect({name: "control"});
port.onMessage.addListener(CatchMultimedia);