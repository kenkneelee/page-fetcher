const request = require("request");
const fs = require("fs");
const readline = require("readline");
// Store command line arguments
const args = process.argv.slice(2);
const URL = args[0];
const path = args[1];
// Setup user input listening
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

request(URL, (error, response, body) => {
  if (error) {
    console.log("error:", error);
  }
  console.log(response.statusCode);
  if (response.statusCode === 404) {
    console.log("Invalid URL!");
    process.exit();
  }
  // Check if file exists. Returns error if it *doesn't*
  fs.access(path, fs.F_OK, (err) => {
    if (err) {
      writeAndExit(path, body);
    } else {
      // User prompt: overwrite or not
      rl.question("File already exists! Overwrite? (Y/N)  ", (answer) => {
        if (answer.toLowerCase() === "y") {
          writeAndExit(path, body);
        }
        if (answer.toLowerCase() === "n") {
          console.log("you said na");
          process.exit();
        }
      });
    }
  });
});

const writeAndExit = (path, body) => {
  fs.writeFile(path, body, (err) => {
    if (err) {
      if (err.errno === -2) {
        console.log("Invalid path!");
      }
      process.exit();
    }
    console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
    process.exit();
  });
};
