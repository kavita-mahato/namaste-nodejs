const fs = require("fs"); // Imports the fs module

setImmediate(() => console.log("setImmediate")); // Callback A

setTimeout(() => console.log("Timer expired"), 0); // Callback B

Promise.resolve("promise").then(console.log); // Promise callback

fs.readFile("file.txt", (err, data) => {
  setTimeout(() => console.log("2nd timer"), 0); // Callback C
  process.nextTick(() => console.log("2nd nextTick")); // Callback D
  setImmediate(() => console.log("2nd setImmediate")); // Callback E

  console.log("File reading CB");
  process.nextTick(() => console.log("Process.nextTick")); // Callback F
});

console.log("Last line of the file.");