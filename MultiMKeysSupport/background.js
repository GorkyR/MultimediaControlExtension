var ports = [];

var playing = true;

function excertcontrol(command, port){
    if (command == "playpause") {
        for (i = 0; i < ports.length; i++){
            try {
                if (playing){
                    ports[i].postMessage({"command": "pause"});
                }
                else{
                    ports[i].postMessage({"command": "play"});
                }
            }
            catch(err) {
                ports.splice(i, 1);
            }
        }
        if (playing){ playing = false; }
        else{ playing = true; }
    }
    if (command == "prev") {
        for (i = 0; i < ports.length; i++){
            try{
                ports[i].postMessage({"command": "prev"});
            }
            catch(err) {
                ports.splice(i, 1);
            }
        }
    }
    if (command == "next") {
        for (i = 0; i < ports.length; i++){
            try{
                ports[i].postMessage({"command": "next"});
            }
            catch(err) {
                ports.splice(i, 1);
            }
        }
    }
}

chrome.commands.onCommand.addListener(excertcontrol);
chrome.runtime.onConnect.addListener(function(port){
                                        console.assert(port.name == "control");
                                        ports.push(port);
                                    }
);