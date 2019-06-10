const { exit } = require('process');
const fs = require('fs').promises;
const { join } = require('path');

const clean = async (
    base = './dist', skip = /\.(git|npm)ignore$/
) => {
    try {
        await fs.access(base);
    } catch (ex) {
        return false;
    }
    for (const filename of await fs.readdir(base)) {
        if (skip && filename.match(skip)) {
            continue;
        }
        const path = join(base, filename);
        const stat = await fs.lstat(path);
        if (stat.isDirectory()) {
            if (await clean(path, skip)) {
                await fs.rmdir(path);
            }
        } else {
            await fs.unlink(path);
        }
    }
    return true;
};
if (require.main === module) {
    clean().catch(exit);
}
module.exports = clean;
