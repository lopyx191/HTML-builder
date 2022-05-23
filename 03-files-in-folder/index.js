const { readdir } = require('fs/promises');

(async function (path = require('path')) {
  try {
    const fs = require('fs');
    const files = await readdir(path.join(__dirname,'secret-folder'), {withFileTypes: true});
    for (const file of files) {
      if(file.isFile()) 
        fs.stat(path.join(__dirname,'secret-folder', file.name), (error, stats) => {
          if (error) {
            console.log(error);
          }
          else {
            return console.log(`${file.name.split('.')[0]} - ${path.extname(file.name).slice(1)} - ${stats.size + 'b'}`);
          }
        });
    }
  } catch (err) {
    console.error(err);
  }
})();

