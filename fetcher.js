const request = require("request");
const fs = require("fs");
// Store command line arguments
const args = process.argv.slice(2);

request(args[0], (error, response, body) => {
  // Print the error if one occurred
  if (error) {
    console.log("error:", error);
  }

  // Print the response status code if a response was received
  console.log("statusCode:", response && response.statusCode);

  // Write the file to given path
  fs.writeFile(args[1], body, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`Downloaded and saved ${body.length} bytes to ${args[1]}`);
  });
});
