import fs from "fs";

const rs = fs.createReadStream("sample.txt", "utf-8");

rs.on("data", (chunk) => {
    console.log("DATA:");
    console.log(chunk);
});

rs.on("end", () => {
    console.log("END");
});

rs.on("error", (err) => {
    console.log("ERROR:" + err);
});

const ws1 = fs.createWriteStream("output1.txt", "utf-8");
ws1.write("Writing binary data to stream\n");
ws1.write("END.");
ws1.end();

const ws2 = fs.createWriteStream("output2.txt");
ws2.write(Buffer.from("Writing binary data to stream\n", "utf-8"));
ws2.write(Buffer.from("End.", "utf-8"));
ws2.end();

const rs2 = fs.createReadStream("sample.txt");
const ws = fs.createWriteStream("copied.txt");

rs2.pipe(ws);
