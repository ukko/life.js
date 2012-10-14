require.config ({
    baseUrl: 'js',
    paths: {
        'kinetic': '/js/kinetic.min',
        'life': 'app/life'
    },
    shim: {
        'kinetic' : {
            deps: [],
            exports: 'Kinetic'
        }
    }
});
require(["life"], function(life) {});
