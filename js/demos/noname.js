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

        //var planeBuffer = core.createBuffer();
        var buffer = core.createBuffer();

        var shader = core.createShader();
        var post = core.createShader();

        var texture = core.createTexture();

        var Vec3 = core.MLib.Vec3;

        var scene = core.createScene();
        var Utils = core.getUtils();
        var framebuffer = core.createFrameBuffer();



        /* config */

        scene.setViewPort(window.innerWidth, window.innerHeight);
        core.canvas.setResize(function(x, y) {
            scene.setViewPort(x, y);
        });

        var camera = Utils.camera.MakeLookAt(Vec3.New(0, 10, 6), Vec3.New(0, 0, -80), Vec3.New(0, 1, -50));
        var perspective = Utils.camera.MakePerspective(45.0, 4.0 / 3.0, 0.1, 300.0);


        var shaderCode = Utils.util.getshaderUsingTemplate(tmpl());
      /*  var postCode = Utils.util.loadCode(tmpl(), ['post-vs', 'post-fs']);

        post.create({
            vertex: postCode['post-vs'],
            fragment: postCode['post-fs'],
            init: function(shader) {
                shader.use();
                shader
                    .attribute('position')
                    .attribute('texture')
                    .uniform('uSampler')
                    .uniform('blurify');
            }
        });
*/
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
        var dz = 0.001;
        var t = 0.1;



        /* planeBuffer.load([-0.5, 0, 0, 0, 0,
            0.5, 0, 0, 1, 0, -0.5, 0.5, 0, 0, 1,
            0.5, 0.5, 0, 1, 1,
        ]).order(post.vars, {
            'position': 3,
            'texture': 2
        });
*/

        buffer
            .load(geometry.cube(5, dz).getModel())
            .order(shader.vars, {
                'position': 3,
                'colors': 4,
                'texture': 2
            });



        // framebuffer.create(512, 512)


        var renderEntities = function() {
            dx += 0.3;
            dz += 0.1;
            if (dz > 359) dz = 0.5;

            var T = core.MLib.Transform.New();
            var entity1 = {
                buffer: buffer,
                model: T.translate(0, 0, -40).rotateX(dx).rotateY(dx).getMatrix(),
                drawType: geometry.getDrawType(),
                texture: texture,
                shader: shader,
            };


            shader.prepare({
                'blurify': 0.2,
                'MV': camera.getMatrix(),
                'P': entity1.model
            });

            scene.clean();
            scene.render(entity1);
        }

        function render() {
            //Utils.getNextFrame.call(this, render);
            window.requestID = window.requestAnimationFrame(render);
            //framebuffer.render(renderEntities);

            renderEntities();
            // scene.render(entity);
        }

        render();

    },

    stop: function() {
        window.cancelAnimationFrame(window.requestID);
    }

};
