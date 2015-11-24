'use strict';

module.exports = {

    init: function() {
        var tmpl = require('../template/new.html');
        var Core = require('../vr8/core');
        var Noise = require('./noise');
        var Polygon = require('./blinn/polygon');


        var core = new Core({
            fullscreen: true,
            element: document.getElementById('webgl-div')
        });

        var buffer = core.createBuffer();
        var shader = core.createShader();
        var texture = core.createTexture();
        var Vec3 = core.MLib.Vec3;

        var scene = core.createScene();
        var Utils = core.getUtils();



        /* config */

        core.canvas.setResize(function(x, y) {
            scene.setViewPort(x, y);
        });
        scene.shader = shader;
        var camera = Utils.camera.MakeLookAt(Vec3.New(0, 0, 3), Vec3.New(0, 0, -60), Vec3.New(0, 1, -50));
        var perspective = Utils.camera.MakePerspective(45.0, 4.0 / 3.0, 0.1, 300.0);

        scene.camera = perspective.multiply(camera).getMatrix();

        var shaderCode = Utils.util.getshaderUsingTemplate(tmpl());

        shaderCode.init = function(shader) {
            shader.use();
            shader
                .attribute('position')
                .attribute('texture')
                .attribute('colors')
                .uniform('MV')
                .uniform('uSampler')
                .uniform('blurify')
                .uniform('P');
        }


        shader.create(shaderCode);

        /*         */

        var geometry = Polygon.New();

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
        var dz = 0.1;
        var t = 0.1; 

        function render() {
            //Utils.getNextFrame.call(this, render);
            window.requestID = window.requestAnimationFrame(render);
            dx += 0.3;
            dz += 0.1;
            if (dz > 359) dz = 0.5;

            buffer.geometry({
                points: geometry.cube(5, dz).getModel(),
                size: 9
            });

            var T = core.MLib.Transform.New();

            var entity = {
                buffer: buffer,
                model: T.translate(0, 0, -20).rotateX(dx).rotateY(dx).getMatrix(),
                drawType: geometry.getDrawType(),
                texture: texture,
            };

            shader.prepare({
                'blurify': Math.sin(dz)
            });

            scene.clean();
            scene.render(entity);
        };

        render();

    },

    stop: function() {
        window.cancelAnimationFrame(window.requestID);
    }

};
