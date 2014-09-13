/* globals define, document */

define(function(require) {
    var GameCanvas = function(id) {
        this._canvas = document.getElementById(id);
        this._context = this.element.getContext('2d');
    };

    GameCanvas.prototype = {
        clear : function() {
            var ctx = this.getContext();
            ctx.clearRect(0, 0, this.element.width, this.element.height);
        },

        getContext : function() {
            return this._context;
        },

        getHeight : function() {
            return this.element.height;
        },

        getWidth : function() {
            return this.element.width;
        },

        setHeight : function(height) {
            this.element.height = height;
        },

        setWidth : function(width) {
            this.element.width = width;
        }
    };

  return GameCanvas;
});
