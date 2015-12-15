'use strict';

module.exports = {

    init: function() {


        var tmpl = require('../template/cube.html');
        var canvas = require('../f4d/canvas');
        var entity = require('../f4d/entity');
        var utils = require('../f4d/utils/util');
        var polygon = require('./blinn/polygon');
        var poly = new polygon();


        var display = new canvas(true);
        var entity = entity(display.getWebGL());
        var scene = require('../f4d/scene')(display.getWebGL());

        var Code = utils.createEL(tmpl());

        entity.load_shader(
            Code.querySelector('#vertex-shader'),
            Code.querySelector('#fragment-shader')
        );

        entity.vertex(poly.cube(5, 1).getModel()).load_attrs();

        /* Generarting XOR Texture */
        var textureSize = 128;
        var pix = [];
        var noi = [];


        for (var x = 0; x < textureSize; x++) {
            for (var y = 0; y < textureSize; y++) {
                var xor = x ^ y;
                pix.push(xor) // r
                pix.push(xor) // g
                pix.push(xor) // b
            }
        }

        var text = require('../f4d/texture');
        var texture = text(display.getWebGL());
        texture.setTexture(new Uint8Array(pix), textureSize, textureSize);


        scene.texture = texture;

        scene.add_entity(entity);


        var rs = 0.1;

        function render() {
            rs += 0.4;
            entity.rotate(rs);

            window.requestID = window.requestAnimationFrame(render);

            scene.draw();
        }

        render();
    },

    stop: function() {
        window.cancelAnimationFrame(window.requestID);
    }

};
