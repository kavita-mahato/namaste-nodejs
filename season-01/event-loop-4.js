const fs = require("fs");

// Schedule asynchronous tasks
setImmediate(() => console.log("setImmediate")); // Callback A

setTimeout(() => console.log("Timer expired"), 0); // Callback B

Promise.resolve("promise").then(console.log); // Callback C (microtask)

fs.readFile("file.txt", (err, data) => {
  console.log("File reading CB"); // Callback D
});

process.nextTick(() => {
  console.log("Process.nextTick"); // Callback E
  process.nextTick(() => console.log("inner nextTick")); // Callback F
});

console.log("Last line of the file.");
