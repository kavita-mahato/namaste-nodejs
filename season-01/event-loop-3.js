const fs = require("fs"); // ✅ Import fs module

// ✅ Scheduled in Check phase → runs after Poll phase
setImmediate(() => console.log("setImmediate")); // Callback A

// ✅ Scheduled in Timers phase → executes after 0ms delay
setTimeout(() => console.log("Timer expired"), 0); // Callback B

// ✅ Promise callbacks are microtasks → run after process.nextTick but before timers
Promise.resolve("promise").then(console.log);

// ✅ Asynchronous I/O → callback goes to Poll phase once file read completes
fs.readFile("file.txt", (err, data) => {
  // Inside Poll phase callback:
  setTimeout(() => console.log("2nd timer"), 0); // Scheduled in Timers phase
  process.nextTick(() => console.log("2nd nextTick")); // Runs before Promise
  setImmediate(() => console.log("2nd setImmediate")); // Scheduled in Check phase

  console.log("File reading CB"); // ✅ Executes immediately inside Poll callback
  process.nextTick(() => console.log("Process.nextTick")); // Runs before Promise
});

// ✅ Synchronous → runs immediately
console.log("Last line of the file.");
