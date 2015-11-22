'use strict';

module.exports = {

    init: function() {
        var tmpl = require('../template/cube.html');
        var Core = require('../vr8/core');
        var Noise = require('./noise');


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

        var geometry = core.createGeometry();

        buffer.geometry({
            points: geometry.cube(5, 5).getModel(),
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
                pix.push(xor) // r
                pix.push(xor) // g
                pix.push(xor) // b
            }
        }


        /* */

        texture.setTexture(new Uint8Array(pix), textureSize, textureSize);

        var entity = {
            buffer: buffer,
            drawType: 'TRIANGLE_STRIP',
            texture: texture,
        };


        var dx = 1;

        function render() {
            //Utils.getNextFrame.call(this, render);
            window.requestID = window.requestAnimationFrame(render);
        dx+= 0.5;


        var Transform = core.MLib.Transform.New();
        var entity = {
            buffer: buffer,
            model: Transform.translate(4,4,-30).rotateY(dx).rotateX(dx).getMatrix(),
            drawType: 'TRIANGLE_STRIPS',
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
