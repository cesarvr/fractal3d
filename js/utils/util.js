'use strict'

/* loading HTML5 rendering API */
var getNextFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
}());

module.exports = {nextFrame: getNextFrame};
