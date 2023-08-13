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
  // Print the error if one occurred
  if (error) {
    console.log("error:", error);
  }
  console.log(response.statusCode);
  if (response.statusCode === 404) {
    console.log("Invalid URL!");
    process.exit();
  }
  fs.access(path, fs.F_OK, (err) => {
    if (err) {
      fs.writeFile(path, body, (err) => {
        if (err) {
          if (err.errno === -2) {
            console.log("Invalid path!");
          }
          process.exit();
        }
        console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
      });
    } else {
      console.log("File already exists! Overwrite? Y/N");
      process.exit();
    }
    // return;
    // Write the file to given path
  });
});
