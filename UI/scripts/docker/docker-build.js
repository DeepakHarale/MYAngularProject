const version = require('../version.js');
const sh = require('shelljs');

const imageName = 'hr-admin';

sh.exec(`docker build -t ${imageName}:latest -t ${imageName}:${version} .`);

