const { npm, npx } = require('./run-utils');
const { exit } = require('process');

const typedoc = () => npx('typedoc',
    'lib/index.ts', '--disableOutputCheck',
    '--options', 'typedoc.json'
);
if (require.main === module) {
    npm('install')
        .then(() => require('./run-clean')('docs'))
        .then(typedoc).catch(exit);
}
module.exports = typedoc;
