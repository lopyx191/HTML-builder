const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

fsPromises.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
  if(err) throw err;
});

fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(path.join(__dirname, 'files-copy'), file), err => {
      if (err) throw err;
    });
  }
});

fs.readdir(path.join(__dirname, 'files'), (err, files) => {
  if(err) throw err;
  files.forEach(elem => {
    fs.copyFile(path.join(__dirname, 'files', elem), path.join(__dirname, 'files-copy', elem), (err) => {
      if(err) throw err; 
    }
    );
  });
});