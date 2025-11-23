const fs = require("fs");
const a = 100;

// ✅ Scheduled in the Check phase (runs after Poll phase)
setImmediate(() => console.log("setImmediate"));

// ✅ Promise callbacks are microtasks → run after process.nextTick but before timers
Promise.resolve("promise").then(console.log);

// ✅ Asynchronous I/O → callback goes to Poll phase once file read completes
fs.readFile("file.txt", (err, data) => {
  console.log("File Reading CB");
});

// ✅ Scheduled in Timers phase (executes after 0ms delay)
setTimeout(() => console.log("Timer expired"), 0);

// ✅ process.nextTick has highest priority → runs before Promises
process.nextTick(() => console.log("Process.nextTick"));

function printA() {
  // ✅ Synchronous → runs immediately
  console.log("a=", a);
}
printA();

// ✅ Synchronous → runs immediately
console.log("Last line of the file.");