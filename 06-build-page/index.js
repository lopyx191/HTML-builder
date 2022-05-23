const fs = require('fs');
const {rm, mkdir, readFile, writeFile, copyFile} = require('fs/promises');
const path = require('path');
const pathProject = path.join(__dirname, 'project-dist');

async function Page() {
  //Создаем папку
  await rm(pathProject, { recursive: true, force: true });
  await mkdir(pathProject);
  //Создаем файл index.html с измененными значениями
  let template = await readFile(path.join(__dirname, 'template.html'), 'utf-8');
  const tags = template.match(/{{\s*(\w+)\s*}}/g);
  await copyFile(path.join(__dirname, 'template.html'), path.join(pathProject, 'index.html'));

  for (const tag of tags) {
    let fileName = tag.replace(/[{}]/g, '') + '.html';
    let fileContent = await readFile(path.join(__dirname, 'components', fileName), 'utf-8');
    template = template.replace(tag, fileContent);
  }
  await writeFile(path.join(pathProject, 'index.html'), template);
  //Создаем файл style.css
  const writeStream = fs.createWriteStream (path.join(__dirname, 'project-dist', 'style.css'));
      
  await fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      const filepath = path.join(path.join(__dirname, 'styles'), file.name);
      const read = fs.createReadStream(filepath, 'utf8');
      if(file.isFile() && path.extname(file.name) == '.css') 
        read.pipe(writeStream);
    }
  });

  //Создаем папку assets
  const fsPromises = fs.promises;
  const pathAssets = path.join(__dirname, 'assets');
  const pathCopyAssets = path.join(__dirname, 'project-dist/assets');
  async function copyAssets(pathAssets, pathCopyAssets){
    try{
      await mkdir(pathCopyAssets, { recursive: true });
      const files = await fsPromises.readdir(pathAssets, {withFileTypes: true});
      for(const file of files) {
        const pathAssetsFile = path.join(pathAssets, file.name);
        const pathCopyAssetsFile = path.join(pathCopyAssets, file.name);
        if(file.isDirectory()){
          await copyAssets(pathAssetsFile,pathCopyAssetsFile);
        } else {
          await fsPromises.copyFile(pathAssetsFile, pathCopyAssetsFile);
        }
      }
    }
    catch(error){
      console.error(error);
    }
  }
  copyAssets(pathAssets, pathCopyAssets);
}
Page();

