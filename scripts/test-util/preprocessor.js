var babelJest = require('babel-jest');

module.exports = {
    process(src, filename) {
        if (filename.match(/\.[css|less|scss]/)) {
            return '';
        }

        return babelJest.process(src, filename);
    }
};
