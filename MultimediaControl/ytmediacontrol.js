var next = null,
    prev = null,
    video = null;

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
    try { 
        if (state && video.paused)          video.play();  // If "play" command and it isn't playing: play.
        else if (!state && !video.paused)   video.pause(); // And viceversa.
    }
    catch (err) { // video probably hasn't been defined as a video element.
        v = document.getElementsByTagName('video');
        if (v.length) {
            video = v[v.length-1];
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