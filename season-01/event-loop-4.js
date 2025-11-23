const fs = require("fs");

// ✅ Scheduled in Check phase → runs after Poll phase
setImmediate(() => console.log("setImmediate")); // Callback A

// ✅ Scheduled in Timers phase → executes after 0ms delay
setTimeout(() => console.log("Timer expired"), 0); // Callback B

// ✅ Promise callbacks are microtasks → run after process.nextTick but before timers
Promise.resolve("promise").then(console.log); // Callback C

// ✅ Asynchronous I/O → callback goes to Poll phase once file read completes
fs.readFile("file.txt", (err, data) => {
  console.log("File reading CB"); // Callback D
});

// ✅ process.nextTick has highest priority → runs before Promises
process.nextTick(() => {
  console.log("Process.nextTick"); // Callback E
  // ✅ Nested nextTick runs immediately after outer nextTick
  process.nextTick(() => console.log("inner nextTick")); // Callback F
});

// ✅ Synchronous → runs immediately
console.log("Last line of the file.");