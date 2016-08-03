var ytPorts = [],
    scPorts = [];

var playing = true;

function ControlHandler(command){ 
    if (scPorts.length){                            //If there are soudncloud ports open, pause YT and control only SC.  
        ExcertControl(command, scPorts);
        ExcertControl("playpause", ytPorts, true);
    }
    else ExcertControl(command, ytPorts);
}

function ExcertControl(command, ports, state=playing){
    switch (command){
        case "playpause":
            for (i = 0; i < ports.length; i++){                             //Send command to every port in ports[].
                try {
                    if (state)  ports[i].postMessage({"command": "pause"}); //If playing: pause.
                    else        ports[i].postMessage({"command": "play"});
                }
                catch(err) {    ports.splice(i, 1); }                       //If port is disconnected (tab closed) remove port from ports[].
            }
            playing = !state;                                               //Toogle "playing" state.
            break;

        case "next":
            for (i = 0; i < ports.length; i++){
                try {           ports[i].postMessage({"command": "next"}); }
                catch(err) {    ports.splice(i, 1); }
            }
            playing = true;                                                 //Is now playing.
            break;
            
        case "prev":
            for (i = 0; i < ports.length; i++){
                try {           ports[i].postMessage({"command": "prev"}); } 
                catch(err) {    ports.splice(i, 1); }
            }
            playing = true;                                                 
            break;
    }
}

chrome.commands.onCommand.addListener( ControlHandler );
chrome.runtime.onConnect.addListener(
    function(port){
        console.assert(port.name.indexOf("control") !== -1, "Out of control!!!"); // :3
        switch (port.name){
            case "ytcontrol": ytPorts.push(port); break;
            case "sccontrol": scPorts.push(port); break;
        }
    }
);
