const fs = require('fs');
const {stdin} = process;

let writeFile = fs.createWriteStream ('./02-write-file/text.txt');

stdin.on('data', data => {
  const str = data.toString().trim();
  if(str === 'exit') {
    console.log('By');
    process.exit();
  }   writeFile.write(str);
});

process.on('SIGINT', () =>{
  console.log('By');
  process.exit();
});

console.log('Write text');

