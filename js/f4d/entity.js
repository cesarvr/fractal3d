'use strict';

var buffer = require('./buffer');
var shader = require('./shader');
var transform = require('./math/transform');
var matrix4 = require('./math/matrix4');

var geometry = function(gl) {

    var that = {};
    var gl = gl;
    var padding = {};

    var sho = shader(gl);
    var vbo = buffer(gl);

    var t = transform();
    var model = new matrix4().setIdentity();

    t.translate(model, {
        x: 4,
        y: 4,
        z: -30
    });


    that.draw_type = 'TRIANGLES';

    that.load_shader = function(vertex, fragment, callback) {
        sho.create(vertex, fragment, callback);
        return that;
    };

    that.vertex = function(vertex_list, options) {
        padding = options;
        vbo.save(vertex_list);
        return that;
    };

    that.shader = sho;
    that.vertex_buffer = vbo;


    that.uniform = function(var_name, value) {
        if (sho.uniforms[var_name]) {
            sho.set_uniform(var_name, value);
        }
    };

    that.rotate = function(x){
      t.rotatex(model, x);
    } 

    that.model = model;

    that.load_attrs = function() {
        var fns = sho.get_vertex_attrib();

        that.sides = vbo.len / sho.per_vertex_size;

        that.prepare = function(fns) {
            return function() {
                sho.use();
                // vbo.use();

                for (var i = -1; ++i < fns.length;)
                    fns[i]();
            }

        }(fns);
    };


    return that;
}

module.exports = geometry;
