const { arg, npm, npx } = require('./run-utils');
const { exit } = require('process');

const test = cover => !cover
    ? npx('mocha', 'dist/test')
    : npx('nyc', 'mocha', 'dist/test');

if (require.main === module) {
    let p = npm('install').then(() => {
        p = arg('lint')(true) ? p.then(require('./run-lint')) : p;
        p = arg('build')(true) ? p.then(require('./run-build')) : p;
        p.then(test.bind(null, arg('cover')(false))).catch(exit);
    });
}
module.exports = test;
