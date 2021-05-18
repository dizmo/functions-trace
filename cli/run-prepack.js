const { arg, npm, npx } = require('./run-utils');
const { exit } = require('process');

const prepare = () => (
    arg('minify')(true) ? [umd, min] : [umd]
).reduce(
    (p, fn) => p.then(fn), Promise.resolve()
);
const umd = () => npx('webpack',
    '--output-filename', 'index.umd.js',
    '--output-path', 'dist/lib',
    '--mode', 'development',
    '--stats', 'errors-only'
);
const min = () => npx('webpack',
    '--output-filename', 'index.min.js',
    '--output-path', 'dist/lib',
    '--mode', 'production',
    '--stats', 'errors-only'
);
if (require.main === module) {
    npm('install').then(prepare).catch(exit);
}
module.exports = prepare;
