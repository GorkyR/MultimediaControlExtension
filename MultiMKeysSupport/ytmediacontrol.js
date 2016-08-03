var next = null,
    prev = null,
    pause = null;

var localPlaying = ['Pause'];

function isPlaying(){
    return localPlaying.indexOf(pause.getAttribute('aria-label')) !== -1;
    /* 
    * When paused/stopped, YT's play/pause button has attribute {aria-label="Play"}  or {title="Replay"}
    * When playing, YT's play/pause button has attribute {aria-label="Pause"} 
    * That's the only way I found to check if video is playing.
    */
}

function Next(){
    try { next.click(); }
    catch(err) { // next probably hasn't been defined as a button.
        n = document.getElementsByClassName('ytp-next-button');
        if (n.length) {
            next = n[n.length-1];
            Next();
        }
    }
}
function Previous(){
    try { prev.click(); }
    catch(err){ // prev probably hasn't been defined as a button.
        p = document.getElementsByClassName('ytp-prev-button');
        if (p.length){
            prev = p[p.length-1];
            Previous();
        }
    }
}

function PausePlay(state){
    try { if ( (state && !isPlaying()) || (!state && isPlaying()) )   pause.click(); } //If "play" command and it isn't playing: play. And viceversa.
    catch (err) { // pause probably hasn't been defined as a button.
        p = document.getElementsByClassName('ytp-play-button');
        if (p.length) {
            pause = p[p.length-1];
            PausePlay(state);
        }
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
            console.log('"Replay/Previous" command received.')
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

var port = chrome.runtime.connect({name: "ytcontrol"});
port.onMessage.addListener( CatchMultimedia );
