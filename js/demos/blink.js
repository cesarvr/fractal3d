'use strict';

module.exports = {

    init: function() {
        var tmpl = require('../template/cube.html');
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

        shader.create(Utils.util.getshaderUsingTemplate(tmpl()));
        /*         */

        var geometry = Polygon.New();

        buffer.geometry({
            points: geometry.plane(5, 5).getModel(),
            size: 9
        });

        /* Generarting XOR Texture */
        var textureSize = 128;
        var pix = [];
        var noi = [];
        /*
        var noise = new Noise();
        for (var x = 0; x < textureSize; x++) {
            for (var y = 0; y < textureSize; y++) {
                 noi.push(  noise.perlin(x,y,4)  )*8;
            }
        }


        console.log(noi);
        noi.forEach(function(noise){
            pix.push(noise); //r
            pix.push(noise); //g
            pix.push(noise); //b
        });
        */

        for (var x = 0; x < textureSize; x++) {
            for (var y = 0; y < textureSize; y++) {
                var xor = x ^ y;
                pix.push(xor + 34) // r
                pix.push(xor) // g
                pix.push(xor) // b
            }
        }


        /* */

        texture.setTexture(new Uint8Array(pix), textureSize, textureSize);



        var dx = 0.1;
        var dz = 0.1;

        function render() {
            //Utils.getNextFrame.call(this, render);
            window.requestID = window.requestAnimationFrame(render);
            dx += 0.3;
            dz += 0.1;
            if (dz > 359) dz = 0.5;

            buffer.geometry({
                points: geometry.plane(5, dz).getModel(),
                size: 9
            });

            var T = core.MLib.Transform.New();

            var entity = {
                buffer: buffer,
                model: T.translate(0, 0, -30).rotateX(dx).rotateY(dx).getMatrix(),
                drawType: geometry.getDrawType(),
                texture: texture,
            };


            scene.clean();
            scene.render(entity);
        };

        render();

    },

    stop: function(){
        window.cancelAnimationFrame(window.requestID);
    }

};
