const fs = require('fs');
const path = require('path');

const webpackerize = ()=> {
  try {
    const configFilesPath = path.join(__dirname, 'src/configFiles'); // Ruta de la carpeta con los archivos de configuración
    const configPath = path.join(__dirname, '/'); // Ruta de la carpeta para guardar los archivos de configuración

    fs.readdirSync(configFilesPath).forEach((fileName) => {
      const filePath = path.join(configFilesPath, fileName);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const newFilePath = path.join(configPath, fileName);

      fs.writeFileSync(newFilePath, fileContent, 'utf8');
    });

    // Creacion de directorios
    fs.mkdirSync('public');
    fs.mkdirSync('src');
    fs.mkdirSync('src/assets');
    fs.mkdirSync('src/styles');

    // Lista de archivos a crear
    const filesToCreate = [
      { path: 'public/index.html', content: '<html><head><title>My App</title></head><body></body></html>' },
      { path: 'src/styles/main.css', content: '@tailwind base;\n@tailwind components;\n@tailwind utilities;' },
      { path: 'src/main.js', content: 'import \'@styles/main.css\';\n\nconsole.log("Hello, world!");' },
      // ...
    ];


    // Creación de archivos
    filesToCreate.forEach(file => {
      fs.writeFile(file.path, file.content, (err) => {
        if (err) throw err;
        console.log(`File ${file.path} created successfully.`);
      });
    });

  } catch (error) {
    console.error('An error occurred while executing Webpackerize:', error.message);
  }
}

module.exports = { webpackerize };