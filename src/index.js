const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const webpackerize = async () => {
  try {
    const configFilesPath = path.join(__dirname, 'configFiles');
    const configPath = process.cwd();

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

    // Lista de archivos a crear
    const filesToCreate = [
      { path: 'public/index.html', content: '<html><head><title>My App</title></head><body></body></html>' },
      { path: 'src/styles/main.css', content: '@tailwind base;\n@tailwind components;\n@tailwind utilities;' },
      { path: 'src/index.js', content: 'import \'@styles/main.css\';\n\nconsole.log("Hello, world!");' },
      // ...
    ];

    // Creación de archivos
    filesToCreate.forEach(file => {
      const filePath = path.join(process.cwd(), file.path);
      fs.writeFile(filePath, file.content, (err) => {
        if (err) throw err;
        console.log(`File ${filePath} created successfully.`);
      });
    });

// Install dependencies
    const dependencies = ['webpack-dev-server', '@babel/core', '@babel/plugin-transform-runtime', '@babel/preset-env', 'autoprefixer', 'babel-loader', 'copy-webpack-plugin', 'css-loader', 'css-minimizer-webpack-plugin', 'dotenv-webpack', 'html-webpack-plugin', 'mini-css-extract-plugin', 'postcss', 'postcss-loader', 'tailwindcss', 'terser-webpack-plugin', 'webpack', 'webpack-cli'];

    console.log(`Installing dependencies: ${dependencies.join(' ')}`);

    const installProcess = exec(`npm install ${dependencies.join(' ')} --save-dev`);
    installProcess.stdout.on('data', (data) => console.log(data));
    installProcess.stderr.on('data', (data) => console.error(data));

  } catch (error) {
    console.error('An error occurred while executing Webpackerize:', error.message);
  }
};

module.exports = { webpackerize };
