const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const webpackerize = () => {
  try {
    const configFilesPath = path.join(__dirname, 'configFiles');
    const configPath = path.join(process.cwd(), './');

    fs.readdirSync(configFilesPath).forEach((fileName) => {
      const filePath = path.join(configFilesPath, fileName);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const newFilePath = path.join(configPath, fileName);

      fs.writeFileSync(newFilePath, fileContent, 'utf8');
      console.log(`File ${fileName} copied successfully to ${configPath}`);
    });

    fs.mkdirSync('public');
    fs.mkdirSync('src');
    fs.mkdirSync('src/assets');
    fs.mkdirSync('src/styles');

    const filesToCreate = [
      {
        path: 'public/index.html',
        content:
          '<html><head><title>My App</title></head><body></body></html>',
      },
      {
        path: 'src/styles/main.css',
        content:
          '@tailwind base;\n@tailwind components;\n@tailwind utilities;',
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

    const packagePath = path.join(process.cwd(), './package.json');
    const packageContent = fs.readFileSync(packagePath, 'utf8');
    const packageJson = JSON.parse(packageContent);

    const dependencies = [
      'webpack',
      'webpack-cli',
      'webpack-dev-server',
      '@babel/core',
      '@babel/preset-env',
      '@babel/preset-react',
      'babel-loader',
      'html-webpack-plugin',
      'css-loader',
      'style-loader',
      'postcss',
      'postcss-loader',
      'tailwindcss',
      'autoprefixer',
    ];

    dependencies.forEach((dependency) => {
      console.log(`Installing ${dependency}`);
      exec(`npm install --save-dev ${dependency}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error installing ${dependency}: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Error installing ${dependency}: ${stderr}`);
          return;
        }
        console.log(`Dependency ${dependency} installed successfully.`);
      });
    });

    packageJson.scripts = {
      start: 'webpack-dev-server --open',
      build: 'webpack --mode production',
    };

    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2), 'utf8');
    console.log('Scripts added to package.json.');
  } catch (error) {
    console.error('An error occurred while executing Webpackerize:', error.message);
  }
};

module.exports = { webpackerize };
