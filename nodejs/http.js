import http from "http";
import url from "url";
import path from "path";

const server = http.createServer((req, res) => {
    console.log(req.method + ":" + req.url);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Hello world!</h1>");
});

server.listen(8080);

console.log("Server is running at http://127.0.0.1:8080/");
console.log(url.parse("http://user.pass@host.com:8080/path/to/file?query=string#hash"));

const workDir = path.resolve(".");
const filePath = path.join(workDir, "pub", "index.html");

console.log(filePath);
