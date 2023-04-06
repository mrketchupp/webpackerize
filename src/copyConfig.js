const fs = require('fs');
const path = require('path');

function addScripts() {
  const scriptsPath = path.join(__dirname, '../src/webpackScipts/scripts.json'); // Ruta de la carpeta con el json de configuración
  const packagePath = path.join(process.cwd(), 'package.json'); // Ruta del archivo package.json del usuario

  const scriptsContent = fs.readFileSync(scriptsPath, 'utf8');
  const packageContent = fs.readFileSync(packagePath, 'utf8');

  const packageJson = JSON.parse(packageContent);
  const scriptsJson = JSON.parse(scriptsContent);

  packageJson.scripts = Object.assign({}, packageJson.scripts, scriptsJson.scripts); // Combina los scripts existentes con los nuevos

  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2), 'utf8');
  console.log('Scripts added successfully to package.json!');
}

module.exports = { addScripts };