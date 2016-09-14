var next = null,
    prev = null,
    pause = null;

var localPlaying = ['Pause current'];

function isPlaying(){
    return localPlaying.indexOf(pause.getAttribute('title')) !== -1;
    /* 
    * When paused/stopped, SC's play/pause button has attribute {title="Play current"}
    * When playing, SC's play/pause button has attribute {title="Pause current"} 
    * That's the only way I found to check if music is playing.
    */
}

function defineControls(){
    n = document.getElementsByClassName('skipControl__next');
    p = document.getElementsByClassName('skipControl__previous');
    s = document.getElementsByClassName('playControl');

    if (n.length) next = n[0];
    if (p.length) prev = p[0];
    if (s.length) pause = s[0];
}

function Next(){
    try { next.click(); }
    catch(err) { // next probably hasn't been defined as a button.
        defineControls();
        Next();
    }
}

function Previous(){
    try { prev.click(); }
    catch(err){ // prev probably hasn't been defined as a button.
        defineControls();
        Previous();
    }
}
function PausePlay(state){
    try { if ( (state && !isPlaying()) || (!state && isPlaying()) )   pause.click(); } //If "play" command and it isn't playing: play. And viceversa.
    catch (err) { // pause probably hasn't been defined as a button.
        defineControls();
        PausePlay(state);
    }
}
function CatchMultimedia(msg){
    cmd = msg.command;
    switch(cmd){
        case "next":
            Next();
            console.log('"Next" command received.')
            break;

        case "prev":
            Previous();
            console.log('"Previous" command received.')
            break;

        case "play":
            PausePlay(1);
            console.log('"Play" command received.')
            break;

        case "pause":
            PausePlay(0);
            console.log('"Pause" command received.')
            break;
    }
}

defineControls();
var port = chrome.runtime.connect({name: "sccontrol"});
port.onMessage.addListener( CatchMultimedia );
