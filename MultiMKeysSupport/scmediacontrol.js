var next = null;
var prev = null;
var pause = null;

var localPlay = ['Play current'];
var localPause = ['Pause current'];

function contains(list, string){
    if (list.indexOf(string) != -1) return true;
    else{ return false; }
}

function Next(){
    try {
        next.click();
    }
    catch(err) {
        n = document.getElementsByClassName('skipControl__next');
        if (n.length) {
            next = n[0];
            Next();
        }
    }
}
function Previous(){
    try {
        prev.click();
    }
    catch(err){
        p = document.getElementsByClassName('skipControl__previous');
        if (p.length){
            prev = p[0];
            Previous();
        }
    }
}
function PausePlay(state){
    try{
        if ( (state && contains(localPlay, pause.getAttribute('title'))) || 
             (state == 0 && contains(localPause, pause.getAttribute('title')))
           ){
            pause.click();
        }
    }
    catch (err) {
        if (err instanceof TypeError){
            p = document.getElementsByClassName('playControl');
            if (p.length) {
                pause = p[0];
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

var port = chrome.runtime.connect({name: "sccontrol"});
port.onMessage.addListener(CatchMultimedia);