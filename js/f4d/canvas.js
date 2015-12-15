'use strict';

var Canvas = function(fullscreen, el) {
    var _createCanvas = function() {
        _canvas = document.getElementsByTagName('CANVAS')[0];
        if (!_canvas)
            _canvas = document.createElement('CANVAS');

        _canvas.setAttribute('width', 800);
        _canvas.setAttribute('height', 600);
        _canvas.setAttribute('style', 'position:absolute; left:0px; top:0px; border-style:none;');
        return _canvas;
    }


    var _canvas = _createCanvas();
    var $el = el || document.body;
    var that = this;
    var setFullScreen = function() {
        _canvas.style.width = window.innerWidth + "px";
        _canvas.style.height = window.innerHeight + "px";
        _canvas.width = window.innerWidth;
        _canvas.height = window.innerHeight;

        if (that.resizeViewPort)
            that.resizeViewPort(_canvas.width, _canvas.height);
    };


    $el.appendChild(_canvas);

    try {

        var gl = _canvas.getContext("experimental-webgl");

        if (!gl) {
            console.log('Error no webGL context found.');
            alert('no WebGL context found.')
        }

        if (fullscreen) {
            setFullScreen();
            window.onresize = setFullScreen;
        }


    } catch (e) {
        console.log(e);
    }

    gl.viewport(0, 0, _canvas.width, _canvas.height);

    return {
        getWebGL: function() {
            return gl;
        },

        setViewPort: function(Width, Height) {
            gl.viewport(0, 0, Width, Height);
        },

        canvas: {
            x: _canvas.width,
            y: _canvas.height
        },

        setResize: function(cb) {
            that.resizeViewPort = cb;
        },

        fullscreen: fullscreen,
    };
}

module.exports = Canvas;
