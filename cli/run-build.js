const { arg, npm, npx } = require('./run-utils');
const { exit } = require('process');

const script = () => npx('tsc').then(() => npx('babel',
    '--source-maps=true', '--verbose',
    '--out-dir', 'dist', 'dist'
));
if (require.main === module) {
    let p = npm('install').then(() => {
        p = arg('lint')(true) ? p.then(() => require('./run-lint')()) : p;
        p = arg('clean')(true) ? p.then(() => require('./run-clean')()) : p;
        p = p.then(script);
        p = arg('prepack')(false) ? p.then(() => require('./run-prepack')()) : p;
        p = p.catch(exit);
    });
}
module.exports = script;
