'use strict';

var Backbone = require('backbone');


var DemoRouter = Backbone.Router.extend({
    routes: {
        'new': 'noname',
        '*path': 'index',
    },

    demos: [],

    index: function(){
      console.log('boom?');
    },

    clear: function(){
        this.demos.forEach(function(demos){
            demos.stop();
        });
    },

    noname: function(){
      debugger;
        this.clear();
        var demo = require('./noname');
        demo.init();
        this.demos.push(demo);
    },


});

new DemoRouter();
Backbone.history.start();
