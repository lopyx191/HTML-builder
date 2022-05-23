const fs = require('fs');
const path = require('path');
      
const writeStream = fs.createWriteStream (path.join(__dirname, 'project-dist', 'bundle.css'));
      
fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  for (const file of files) {
    const filepath = path.join(path.join(__dirname, 'styles'), file.name);
    const read = fs.createReadStream(filepath, 'utf8');
    if(file.isFile() && path.extname(file.name) == '.css') 
      read.pipe(writeStream);
  }
});