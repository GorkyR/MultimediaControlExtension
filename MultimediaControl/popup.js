var port = chrome.runtime.connect({name: "popup"});
port.onMessage.addListener( Handler );
document.body.onload = Init;

function remById(id){
    document.getElementById(id).parentNode.removeChild(document.getElementById(id));
}

function Init(){
    var input = document.getElementById("lock");
    input.addEventListener('click', ReportLock);
    port.postMessage({"status": "connected"});  //Get play, connection and lock status
}

function Handler(msg){
    to = msg.connected;
    document.getElementById('Connection').innerText = to;
    document.getElementById('Status').innerText = (msg.status ? "Playing" : "Paused");
    if (to == 'Disconnected') {
        remById('Header1');
    }
    if (to != "Youtube"){
        remById('yt');
    }
    else{
        lock = msg.lock;
        document.getElementById('lock').checked = lock;
    }
}

function ReportLock(){
    var status = document.getElementById("lock").checked;
    port.postMessage({"lock": status});         //Send lock status
}