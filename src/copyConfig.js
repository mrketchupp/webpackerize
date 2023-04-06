const fs = require('fs');
const path = require('path');

const scriptsPath = path.join(__dirname, 'src/webpackScipts/scripts.json');
const packagePath = path.join(__dirname, '/package.json');

const scriptsContent = fs.readFileSync(scriptsPath, 'utf8');
const packageContent = fs.readFileSync(packagePath, 'utf8');

const packageJson = JSON.parse(packageContent);
const scriptsJson = JSON.parse(scriptsContent);

packageJson.scripts = scriptsJson.scripts;

fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2), 'utf8');
