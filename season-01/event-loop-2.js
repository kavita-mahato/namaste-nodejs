const fs = require("fs");
const a = 100;

setImmediate(() => console.log("setImmediate")); // Callback A

Promise.resolve("promise").then(console.log);    // Callback E (microtask)

fs.readFile("file.txt", (err, data) => {
  console.log("File Reading CB");                // Callback B
});

setTimeout(() => console.log("Timer expired"), 0); // Callback C

process.nextTick(() => console.log("Process.nextTick")); // Callback D

function printA() {
  console.log("a=", a);
}
printA();

console.log("Last line of the file.");