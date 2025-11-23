const fs = require("fs");

const a = 100;

// ✅ Scheduled in the Check phase (after Poll phase)
setImmediate(() => console.log("setImmediate"));

// ✅ Asynchronous I/O → callback goes to Poll phase
fs.readFile("file.txt", (err, data) => {
  console.log("File Reading CB");
});

// ✅ Scheduled in Timers phase (executes after 0ms delay)
setTimeout(() => console.log("Timer expired"), 0);

function printA() {
  // ✅ Synchronous → runs immediately
  console.log("a=", a);
}
printA();

// ✅ Synchronous → runs immediately
console.log("Last line of the file.");
