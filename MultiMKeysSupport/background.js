var ytports = [];
var scports = [];

var playing = true;

function ControlHandler(command){ 
    if (scports.length) excertSCcontrol(command);
    else excertYTcontrol(command);
}

function excertYTcontrol(command){
    if (command == "playpause") {
        for (i = 0; i < ytports.length; i++){
            try {
                if (playing){
                    ytports[i].postMessage({"command": "pause"});
                }
                else{
                    ytports[i].postMessage({"command": "play"});
                }
            }
            catch(err) {
                ytports.splice(i, 1);
            }
        }
        playing = !playing;
    }
    if (command == "prev") {
        for (i = 0; i < ytports.length; i++){
            try{
                ytports[i].postMessage({"command": "prev"});
            }
            catch(err) {
                ytports.splice(i, 1);
            }
        }
    }
    if (command == "next") {
        for (i = 0; i < ytports.length; i++){
            try{
                ytports[i].postMessage({"command": "next"});
            }
            catch(err) {
                ytports.splice(i, 1);
            }
        }
    }
}

function excertSCcontrol(command){
    if (command == "playpause") {
        for (i = 0; i < scports.length; i++){
            try {
                if (playing){
                    scports[i].postMessage({"command": "pause"});
                }
                else{
                    scports[i].postMessage({"command": "play"});
                }
            }
            catch(err) {
                scports.splice(i, 1);
            }
        }
        playing = !playing;
    }
    if (command == "prev") {
        for (i = 0; i < scports.length; i++){
            try{
                scports[i].postMessage({"command": "prev"});
            }
            catch(err) {
                scports.splice(i, 1);
            }
        }
    }
    if (command == "next") {
        for (i = 0; i < scports.length; i++){
            try{
                scports[i].postMessage({"command": "next"});
            }
            catch(err) {
                scports.splice(i, 1);
            }
        }
    }
}

chrome.commands.onCommand.addListener(ControlHandler);
chrome.runtime.onConnect.addListener(function(port){
                                        console.assert(port.name.indexOf("control") !== -1, "Out of control!!!");
                                        if (port.name == "ytcontrol") ytports.push(port);
                                        else if (port.name == "sccontrol") scports.push(port);
                                    }
);