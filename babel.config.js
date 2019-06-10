const plugins = [
    "@babel/plugin-transform-runtime"
];
const presets = [
    "@babel/env"
];
const ignore = [
    "*.min.js", "*.umd.js"
];
module.exports = function (api) {
    api.cache(true);
    return {
        plugins, presets, ignore
    };
};
