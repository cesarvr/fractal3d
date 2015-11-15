'use strict';

var Backbone = require('backbone');


var DemoRouter = Backbone.Router.extend({
    routes: {
        'xor': 'xorDemo',
        'prime': 'primeDemo',
        'cube' : 'cube',
    },

    xorDemo: function(){
        console.log('xor demo');
        require('./xor_demo').init();
    },

    primeDemo: function(){
        require('./thread/prime/prime').init();
    },

    cube: function(){
      require('./cube').init();
    },

});

new DemoRouter();
Backbone.history.start();
