const { arg, npm, npx } = require('./run-utils');
const { exit } = require('process');

const test = () => arg('cover')(false)
    ? npx('nyc', 'mocha', 'dist/test', '--recursive')
    : npx('mocha', 'dist/test', '--recursive');

if (require.main === module) {
    let p = npm('install').then(() => {
        p = arg('lint')(true) ? p.then(() => require('./run-lint')()) : p;
        p = arg('clean')(true) ? p.then(() => require('./run-clean')()) : p;
        p = arg('build')(true) ? p.then(() => require('./run-build')()) : p;
        p.then(test).catch(exit);
    });
}
module.exports = test;
