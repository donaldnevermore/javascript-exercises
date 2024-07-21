let blob = new Blob();
const BYTES_PER_CHUNK = 1024 * 1024;
const SIZE = blob.size;
let start = 0;
let end = BYTES_PER_CHUNK;

while (start < SIZE) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload");
    xhr.onload = function () {
        console.log("OK.");
    };
    xhr.setRequestHeader("Content-Range", `${start}-${end}/${SIZE}`);
    xhr.send(blob.slice(start, end));
    start = end;
    end = start + BYTES_PER_CHUNK;
}
