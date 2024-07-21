let socket = new WebSocket("ws://localhost:8181");

let stringData = "Hello world";
let arrayBuffer = Uint8Array.from(["f", "o", "o"]);
let blob = new Blob(["f", "o", "o"]);

socket.onerror = function (event) {
    console.log(event);
};

socket.onmessage = function (event) {
    console.log(`get ${event.data}`);
};

socket.onopen = function (event) {
    socket.send(stringData);
};
