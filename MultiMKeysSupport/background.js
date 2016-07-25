var ports = [];

function excertcontrol(command, port){
    if (command == "playpause") {
        for (i = 0; i < ports.length; i++){
            try {
                ports[i].postMessage({"command": "playpause"});
            }
            catch(err) {
                ports.splice(i, 1);
            }
        }
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