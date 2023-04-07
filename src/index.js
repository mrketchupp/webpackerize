const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const webpackerize = async () => {
  try {
    const path = require('path');
    const fs = require('fs');

    const emojis = {
      copied: '📝',
      created: '📁',
      successfully: '✅',
      dependencies: '📦',
      install: '⬇️',
      stdout: '🆗',
      stderr: '🚫',
    };

    function replaceWithEmojis(message) {
      Object.keys(emojis).forEach((key) => {
        const regex = new RegExp(key, 'gi');
        message = message.replace(regex, emojis[key]);
      });
      return message;
    }

    const configFilesPath = path.join(__dirname, 'configFiles');
    const configPath = process.cwd();

    fs.readdirSync(configFilesPath).forEach((fileName) => {
      const filePath = path.join(configFilesPath, fileName);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const newFilePath = path.join(configPath, fileName);

      fs.writeFileSync(newFilePath, fileContent, 'utf8');
      const message = replaceWithEmojis(`File ${fileName} copied successfully to ${path.basename(configPath)}`);
      console.log(message);
    });

    const directoriesToCreate = ['public', 'src', 'src/assets', 'src/styles'];

    directoriesToCreate.forEach((directory) => {
      fs.mkdirSync(directory);
      const message = replaceWithEmojis(`Directory ${directory} created successfully.`);
      console.log(message);
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
        const message = replaceWithEmojis(`File ${path.basename(filePath)} created successfully.`);
        console.log(message);
      });
    });

    // Install dependencies
    const dependencies = ['webpack-dev-server', '@babel/core', '@babel/plugin-transform-runtime', '@babel/preset-env', 'autoprefixer', 'babel-loader', 'copy-webpack-plugin', 'css-loader', 'css-minimizer-webpack-plugin', 'dotenv-webpack', 'html-webpack-plugin', 'mini-css-extract-plugin', 'postcss', 'postcss-loader', 'tailwindcss', 'terser-webpack-plugin', 'webpack', 'webpack-cli'];

    console.log(replaceWithEmojis(`Installing ${emojis.dependencies}: ${dependencies.join(' ')}`));

    const installProcess = exec(`npm install ${dependencies.join(' ')} --save-dev`);
    installProcess.stdout.on('data', (data) => console.log(`${replaceWithEmojis(emojis.stdout)} ${data}`));
    installProcess.stderr.on('data', (data) => console.error(`${replaceWithEmojis(emojis.stderr)} ${data}`));
    installProcess.on('exit', () => console.log(`${replaceWithEmojis(emojis.install)} Dependencies installed successfully.`));

  } catch (error) {
    console.error('An error occurred while executing Webpackerize:', error.message);
  }
};

module.exports = { webpackerize };
