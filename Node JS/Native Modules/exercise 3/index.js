const fs = require('fs');
  
let text = "Hello World!";
  
fs.writeFile("file1.txt", text, (err) => {
  if (err)
    console.log(err);
  else {
    console.log("File written properly\n");
  }
});

