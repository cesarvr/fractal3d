'use strict';

module.exports = {

    init: function() {
        var tmpl = require('../template/simple_blur_texture.html');
        var Core = require('../vr8/core');
        var Polygon = require('./blinn/polygon');
        var Render = require('../vr8/v2/render');
        var Buffer = require('../vr8/v2/buffer');
        var Shader = require('../vr8/v2/shader');
        var Texture = require('../vr8/v2/texture');

        var core = new Core({
            fullscreen: true,
            element: document.getElementById('webgl-div')
        });

        var box_shader = new Shader(core.getWebGL());
        var buffer = new Buffer(core.getWebGL());
        var texture = new Texture(core.getWebGL());

        var Vec3 = core.MLib.Vec3;
        var Utils = core.getUtils();

        /* config */

        core.canvas.setResize(function(x, y) {
          core.getWebGL().viewport(0, 0, x, y);
        });

        var camera = Utils.camera.MakeLookAt(Vec3.New(0, 10, 6), Vec3.New(0, 0, -80), Vec3.New(0, 1, -50));
        var perspective = Utils.camera.MakePerspective(45.0, 4.0 / 3.0, 0.1, 300.0);

        box_shader.create(tmpl());

        var geometry = new Polygon();

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

        /* */
        texture.setTexture(new Uint8Array(pix), textureSize, textureSize);

        var dx = 0.1;
        var dz = 0.001;
        var t = 0.1;

        buffer.save(geometry.cube(4, dz).getModel());
        var _buff = buffer.prepare(box_shader.vertex_info())

        var rdr = new Render({
            gl: core.getWebGL(),
            shader: box_shader,
            camera: perspective.multiply(camera).getMatrix()
        });

        function render() {
            window.requestID = window.requestAnimationFrame(render);

            dx += 0.3;
            dz += 0.001;
            if (dz > 359) dz = 0.1;
            var Transform = core.MLib.Transform.New();

            var entity = {
                model: Transform.translate(0, 10, -20).rotateX(dx).rotateY(dx).getMatrix(),
                drawType: geometry.getDrawType(),
                texture: texture,
            };

            box_shader.use();

            rdr
                .clear()
                .prepare(entity.model, _buff);

            box_shader.set_value('blurify', Math.sin(dz));

            rdr.draw(geometry.getDrawType(), buffer.sides)
        };


        render();

    },

    stop: function() {
        window.cancelAnimationFrame(window.requestID);
    }

};
