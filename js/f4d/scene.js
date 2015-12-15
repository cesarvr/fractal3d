'use strict';

var transform = require('./math/transform');
var vec3 = require('./math/vector3');

var scene = function(gl) {

    var that = {};
    var entities = [];

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    var look_at = transform().look_at(new vec3(0, 0, 3), new vec3(0, 0, -60), new vec3(0, 1, -50));
    var perspective = transform().make_perspective(45.0, 4.0 / 3.0, 0.1, 300.0);
  


    that.camera = perspective.multiply(look_at).getMatrix();

    that.add_entity = function(entity) {
        entities.push(entity);
    };

    that.clean = function() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    };

    that.draw = function() {
      that.clean();

        for (var i = -1; ++i < entities.length;) {

            var e = entities[i];

            e.prepare();
            e.uniform('MV', that.camera);
            e.uniform('P',  e.model.getMatrix());

            if(that.texture)
             that.texture.prepare(); 

            if (typeof gl[e.draw_type] === 'number')
                gl.drawArrays(gl[e.draw_type], 0, e.sides);
            else
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, e.sides);
        }
    };

    return that;
};


module.exports = scene;
