const { arg, npm, npx } = require('./run-utils');
const { exit } = require('process');

const lint = () => npx('eslint', '--config', '.eslintrc.json',
    '"lib/**/*.ts"', '"test/**/*.ts"', arg('fix', '--fix')(false)
);
if (require.main === module) {
    npm('install').then(lint).catch(exit);
}
module.exports = lint;
