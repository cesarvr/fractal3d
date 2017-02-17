'use strict';

/* loading HTML5 rendering API */
var nextFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            console.warn('can\'t find requestAnimationFrame, using timeout instead.');
            window.setTimeout(callback, 1000 / 60);
        };
}());


module.exports = { nextFrame: nextFrame }
