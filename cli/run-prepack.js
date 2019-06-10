const { arg, npm, npx } = require('./run-utils');
const { exit } = require('process');

const prepare = () => (
    arg('minify')(true) ? [umd, min] : [umd]
).reduce(
    (p, fn) => p.then(fn), Promise.resolve()
);
const umd = () => npx('webpack',
    '--mode', 'development', '--output', 'dist/lib/index.umd.js', '--silent'
);
const min = () => npx('webpack',
    '--mode', 'production', '--output', 'dist/lib/index.min.js', '--silent'
);
if (require.main === module) {
    npm('install').then(prepare).catch(exit);
}
module.exports = prepare;
