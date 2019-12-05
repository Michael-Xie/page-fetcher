const request = require('request');
const fs = require('fs');
const arguments = process.argv;
[,,website, location] = arguments;

const callback = function (loc) {
  const stats = fs.statSync(loc);
  const fileSizeInBytes = stats.size;
  //Convert the file size to megabytes (optional)
  console.log(`Download and saved ${fileSizeInBytes} bytes to ${location}`);

}

fs.access(location, fs.F_OK, (err) => {
  if (err) {
    console.error(err)
    return
  } else {
    request(website, (error, response, body) => {
      fs.writeFile(location, body, (err) => {
        if(error) {
          console.log("Error accessing website");
        } else {
          if (err) {
            throw err;
          }
          callback(location);
      
        }
      });
    });
  }

  //file exists
})

