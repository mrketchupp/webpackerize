#!/usr/bin/env node
const { webpackerize } = require('../src/index.js');
const { addScripts } = require('../src/copyConfig.js');

webpackerize();
addScripts();

process.on('exit', () => {
  console.log('\n')
  console.log('\n')
  console.group('🚀 Webpack configuration completed successfully!');
  console.log('All files 📝 and directories 📁 have been created✅.');
  console.log('The following scripts are now available:\n');
  console.log('  - npm run build: builds the project for production\n');
  console.log('  - npm run dev: builds the project for development\n');
  console.log('  - npm start: starts a dev server with hot reloading enabled\n');
  console.log('Happy coding! 😎\n');
  console.groupEnd();
});