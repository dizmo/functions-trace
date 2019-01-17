const { arg, npm, npx } = require('./run-utils');
const { exit } = require('process');

const prepare = () => (
    arg('minify')(true) ? [browserify, terser] : [browserify]
).reduce(
    (p, fn) => p.then(fn), Promise.resolve()
);
const browserify = () => npx(
    'browserify', 'dist/lib/index.js', '-ds', 'dizmo-functions-trace',
        '|', 'exorcist', 'dist/lib/index.umd.js.map',
        '>', 'dist/lib/index.umd.js'
);
const terser = () => npx(
    'terser', 'dist/lib/index.umd.js',
        '--compress', '--mangle', '--module',
        '--output', 'dist/lib/index.min.js',
        '--source-map', 'content="dist/lib/index.umd.js.map"',
        '--source-map', 'url="index.min.js.map"'
);
if (require.main === module) {
    npm('install').then(prepare).catch(exit);
}
module.exports = prepare;
