const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const webpackerize = async () => {
  try {
    const configFilesPath = path.join(__dirname, 'configFiles');
    const configPath = path.join(__dirname, '/');

    fs.readdirSync(configFilesPath).forEach((fileName) => {
      const filePath = path.join(configFilesPath, fileName);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const newFilePath = path.join(configPath, fileName);

      fs.writeFileSync(newFilePath, fileContent, 'utf8');
      console.log(`File ${fileName} copied successfully to ${configPath}`);
    });

    const directoriesToCreate = ['public', 'src', 'src/assets', 'src/styles'];

    directoriesToCreate.forEach((directory) => {
      fs.mkdirSync(directory);
      console.log(`Directory ${directory} created successfully.`);
    });

    const filesToCreate = [
      {
        path: 'public/index.html',
        content: '<html><head><title>My App</title></head><body></body></html>',
      },
      {
        path: 'src/styles/main.css',
        content: '@tailwind base;\n@tailwind components;\n@tailwind utilities;',
      },
      {
        path: 'src/main.js',
        content: 'import \'@styles/main.css\';\n\nconsole.log("Hello, world!");',
      },
    ];

    filesToCreate.forEach((file) => {
      fs.writeFile(file.path, file.content, (err) => {
        if (err) throw err;
        console.log(`File ${file.path} created successfully.`);
      });
    });

    // Install dependencies
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    const dependencies = Object.keys(JSON.parse(packageJsonContent).dependencies).join(' ');

    console.log(`Installing dependencies: ${dependencies}`);

    const installProcess = exec(`npm install ${dependencies} --prefix ${__dirname}`);
    installProcess.stdout.on('data', (data) => console.log(data));
    installProcess.stderr.on('data', (data) => console.error(data));

  } catch (error) {
    console.error('An error occurred while executing Webpackerize:', error.message);
  }
};

module.exports = { webpackerize };
