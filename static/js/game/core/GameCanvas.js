/* globals define, document */

define(function(require) {
    var GameCanvas = function(id) {
        this._canvas = document.getElementById(id);
        this._context = this._canvas.getContext('2d');
    };

    GameCanvas.prototype = {
        clear : function() {
            var ctx = this.getContext();
            ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        },

        getContext : function() {
            return this._context;
        },

        getHeight : function() {
            return this._canvas.height;
        },

        getWidth : function() {
            return this._canvas.width;
        },

        setHeight : function(height) {
            this._canvas.height = height;
        },

        setWidth : function(width) {
            this._canvas.width = width;
        }
    };

  return GameCanvas;
});
