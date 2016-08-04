var ytPorts = [],
    scPorts = [],
    popup = null;

var playing = true,
    locked = true;

function CheckPorts(ports){
    for (i = 0; i < ports.length; i++){
        try { ports[i].postMessage({"command": "checking"}); }
        catch(err) { 
            ports.splice(i, 1); //If port is disconnected (tab closed) remove port from ports[].
            i--;
        }
    }
}

function ControlHandler(command){ 
    if (scPorts.length){                            //If there are soundcloud ports open, pause YT and control only SC.
        ExcertControl(command, scPorts);
        tmp = playing;
        ExcertControl("playpause", ytPorts, true);
        playing = tmp;
    }
    else ExcertControl(command, ytPorts);
}

function PopupHandler(msg){
    if (msg.lock !== undefined) locked = msg.lock;
    CheckPorts(scPorts);
    CheckPorts(ytPorts);
    if (scPorts.length) popup.postMessage({"status":playing, "connected": "Soundcloud", "lock": false});
    else if (ytPorts.length) {
        popup.postMessage({"status":playing, "connected": "Youtube", "lock": locked});
        ControlHandler( (locked && "lock") || "unlock");
    }
    else {
        chrome.browserAction.disable();
        popup.postMessage({"status":playing, "connected": "Disconnected", "lock":false});
    }
}

function ExcertControl(command, ports, state=playing){
    CheckPorts(ports);
    if (command == "playpause"){
            for (i = 0; i < ports.length; i++){                         //Send command to every port in ports[].
                if (state)  ports[i].postMessage({"command": "pause"}); //If playing: pause.
                else        ports[i].postMessage({"command": "play"});
            }
            playing = !state;                                           //Toogle "playing" state.
            return;
    }
    for (i = 0; i < ports.length; i++) ports[i].postMessage({"command": command});
    playing = true;                                                     //Is now playing.
}

chrome.commands.onCommand.addListener( ControlHandler );
chrome.runtime.onConnect.addListener(
    function(port){
        chrome.browserAction.enable();
        switch (port.name){
            case "ytcontrol": ytPorts.push(port); break;
            case "sccontrol": scPorts.push(port); break;
            case "popup":
                popup = port;
                popup.onMessage.addListener( PopupHandler );
                break;
        }
    }
);