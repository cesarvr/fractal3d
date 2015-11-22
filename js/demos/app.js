'use strict';

var Backbone = require('backbone');


var DemoRouter = Backbone.Router.extend({
    routes: {
        'xor': 'xorDemo',
        'prime': 'primeDemo',
        'cube' : 'cube',
        'blink' : 'tunel',
        'new': 'noname',
        '*path': 'index',
    },
    
    demos: [],
    
    clear: function(){
        this.demos.forEach(function(demos){
            demos.stop();
        });
    },
     
    index: function(){
        this.clear();
        var demo = require('./index');
        demo.init();
        this.demos.push(demo);
    },

    noname: function(){
        this.clear();
        var demo = require('./noname');
        demo.init();
        this.demos.push(demo);
    },


    xorDemo: function(){

       this.clear();
       var demo = require('./xor_demo')
       demo.init();
       this.demos.push(demo);
    },

    primeDemo: function(){
  
       this.clear();
      var demo =require('./thread/prime/prime');
       demo.init();
       this.demos.push(demo);
    },

    cube: function(){

       this.clear();
     var demo = require('./cube');
     demo.init();
     this.demos.push(demo);
    },

    tunel: function(){

       this.clear();
     var demo =  require('./blink');
     demo.init();
     this.demos.push(demo);
    },

});

new DemoRouter();
Backbone.history.start();
