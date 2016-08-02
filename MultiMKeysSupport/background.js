var ytports = [];
var scports = [];

var playing = true;
var SCActive = false;

function excertcontrol(command, port){
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
        if (playing){ playing = false; }
        else{ playing = true; }
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

chrome.commands.onCommand.addListener(excertcontrol);
chrome.runtime.onConnect.addListener(function(port){
                                        console.assert(port.name.indexOf("control") !== -1);
                                        if (port.name == "ytcontrol") ytports.push(port);
                                        else if (port.name == "sccontrol") {
                                            scports.push(port);
                                            SCActive = true;
                                        }
                                    }
);