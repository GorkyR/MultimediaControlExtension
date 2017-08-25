function s4() { return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1); }
var GUID = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

///////////////////////////////////////////////////////////////////////////////////////

var next = null,
    prev = null,
    video = null;

var locked = true;

var onPlaying = function() {
        localStorage.setItem('playing', GUID);
    };
var onStorage = function(event){
        key = event.key;
        if ((locked && key == 'playing') && localStorage.playing !== GUID){
            defineControls();
            video.pause();
        }
    };

function isUnlocked(){
    if (locked)
        return localStorage.getItem('playing') == GUID;
    return true;
}

function defineControls(){
    n = document.getElementsByClassName('ytp-next-button');
    p = document.getElementsByClassName('ytp-prev-button');
    v = document.getElementsByTagName('video');
    if (n.length) next = n[n.length-1];
    if (p.length) prev = p[p.length-1];
    if (v.length) {
        video = v[v.length-1];
        video.onplaying = onPlaying;
    }
}

function Next(){
    try {
        if (isUnlocked())
            next.click();
    }
    catch(err) { // next probably hasn't been defined.
        defineControls();
        Next();
    }
}

function Previous(){
    try {
        if (isUnlocked())
            prev.click();
    }
    catch(err){ // prev probably hasn't been defined.
        defineControls();
        Previous();
    }
}

function PausePlay(newState){
    try {
        if (newState && isUnlocked())
            video.play();  // If "play" command and it isn't playing: play.
        else if (!newState)
            video.pause(); // And viceversa.
    }
    catch (err) { // video probably hasn't been defined.
        defineControls();
        PausePlay(newState);
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

        case "lock":
            locked = true;
            if (!isUnlocked()) PausePlay(0); //On lock, paused if not main
            console.log('Multiple tab playback locked');
            break;

        case "unlock":
            locked = false;
            console.log('Multiple tab playback unlocked');
            break;
    }
}

defineControls();
var mutObserver = new MutationObserver(function (mutations) { defineControls(); });
mutObserver.observe(document.body, { characterData: true, subtree: true });

window.addEventListener('storage', onStorage);

var port = chrome.runtime.connect({name: "ytcontrol"});
port.onMessage.addListener( CatchMultimedia );
