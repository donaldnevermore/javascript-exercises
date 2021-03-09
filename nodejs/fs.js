const fs = require("fs")

// Read a file.
fs.readFile("sample.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})

// Read an image.
fs.readFile("swift.png", (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
        console.log(data.length + "bytes")
    }
})

// Write to a file.
const data = "Hello,Node.js"
fs.writeFile("output.txt", data, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("ok!")
    }
})

// Get file info.
fs.stat("output.txt", (err, stat) => {
    if (err) {
        console.log(err)
    } else {
        console.log("isFile: " + stat.isFile())
        console.log("isDirectory: " + stat.isDirectory())
        if (stat.isFile()) {
            console.log("size: " + stat.size)
            console.log("birth  time: " + stat.birthtime)
            console.log("modified time: " + stat.mtime)
        }
    }
})
