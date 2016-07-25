var next = null;
var prev = null;
var pause = null;
function Next(){
    try {
        next.click();
    }
    catch(err) {
        a = document.getElementsByTagName('a');
        for (i = 0; i < a.length; i++){
            if (a[i].getAttribute('title') == 'Next') {
                var next = a[i];
                a[i].click();
            }
        }
    }
}
function Previous(){
    try {
        prev.click();
    }
    catch(err){
        a = document.getElementsByTagName('a');
        for (i = 0; i < a.length; i++){
            if (a[i].getAttribute('title') == 'Replay' || a[i].getAttribute('title') == 'Previous') {
                var prev = a[i];
                a[i].click();
            }
        }
    }
}
function PausePlay(){
    try{
        pause.click();
    }
    catch (err) {
        b = document.getElementsByTagName('button');
        for (i = 0; i < b.length; i++){
            if (b[i].getAttribute('aria-label') == 'Play' || b[i].getAttribute('aria-label') == 'Pause') {
                var pause = b[i];
                b[i].click();
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
    if (cmd == "playpause") {
        PausePlay();
        console.log('"Pause/Play" command received.')
    }
}

var port = chrome.runtime.connect({name: "control"});
port.onMessage.addListener(CatchMultimedia);