const dependable = require('dependable'),
    path = require('path'),
    container = dependable.container(),
    simpleDependecies = [
        ['_', 'lodash'],
        ['passport', 'passport']
    ];

simpleDependecies.forEach(function (val) {
    container.register(val[0], function () {
        return require(val[1])
    })
});

container.load(path.join(__dirname, '/controllers'));
container.load(path.join(__dirname, '/helpers'));

container.register('container', function () {
    return container;
});

module.exports = container;