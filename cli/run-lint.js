const { arg, npm, npx } = require('./run-utils');
const { exit } = require('process');

const lint = () => npx('tslint',
    '--config', 'tslint.json', '--format', 'stylish',
    '"lib/**/*.ts"', '"test/**/*.ts"', arg('fix', '--fix')(false)
);
if (require.main === module) {
    npm('install').then(lint).catch(exit);
}
module.exports = lint;
