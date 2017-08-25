var youtubePorts = [],
    soundcloudPorts = [],
    popup = null;

var playing = true,
    locked = true;

function CheckPorts(ports){
    for (i = ports.length - 1; i >= 0; --i){
        try {
            ports[i].postMessage({"command": "checking"});
        }
        catch(err) {
            ports.splice(i, 1); //If port is disconnected (tab closed) remove port from ports[].
        }
    }
}

function ControlHandler(command){
    if (soundcloudPorts.length){  //If there are soundcloud ports open, pause YT and control only SC.
        SendCommand(command, soundcloudPorts);
        tmp = playing;
        SendCommand("playpause", youtubePorts, true);
        playing = tmp;
    }
    else SendCommand(command, youtubePorts);
}

function PopupHandler(msg){
    if (msg.lock !== undefined) locked = msg.lock;
    CheckPorts(soundcloudPorts);
    CheckPorts(youtubePorts);
    if (soundcloudPorts.length) popup.postMessage({"status":playing, "connected": "Soundcloud", "lock": false});
    else if (youtubePorts.length) {
        popup.postMessage({"status":playing, "connected": "Youtube", "lock": locked});
        ControlHandler( (locked && "lock") || "unlock");
    }
    else {
        chrome.browserAction.disable();
        popup.postMessage({"status":playing, "connected": "Disconnected", "lock":false});
    }
}

function SendCommand(command, ports, state=playing){
    CheckPorts(ports);
    if (command == "playpause"){
            for (i = 0; i < ports.length; i++){
                if (state)
                    ports[i].postMessage({"command": "pause"}); //If playing: pause.
                else
                    ports[i].postMessage({"command": "play"});
            }
            playing = !state; //Toogle "playing" state.
    }
    else
    {
        for (i = 0; i < ports.length; i++)
            ports[i].postMessage({"command": command});
        playing = true; //Is now playing.
    }
}

chrome.commands.onCommand.addListener( ControlHandler );
chrome.runtime.onConnect.addListener(
    function(port){
        chrome.browserAction.enable();
        switch (port.name){
            case "ytcontrol":
                youtubePorts.push(port);
                break;
            case "sccontrol":
                soundcloudPorts.push(port);
                break;
            case "popup":
                popup = port;
                popup.onMessage.addListener( PopupHandler );
                break;
        }
    }
);
