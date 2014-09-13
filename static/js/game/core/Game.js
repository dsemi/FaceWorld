/* globals define, console */

define(function(require) {
  var AssetManager = require('game/core/AssetManager');

  var Game = function(canvasId, onload) {
    var self = this;
    this.onLoad = onload;
    this.entities = [];
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.manager = new AssetManager(function() {
        if (self.onload) {
          self.onLoad();
        }
    });
  };

  Game.prototype = {
    addEntity : function(entity) {
      this.entities.push(entity);
    },

    onLoad : function() {
      console.log('Game#onLoad called!');
    },

    onPause : function() {
      console.log('Game#onPause called!');
    },

    onPlay : function() {
      console.log('Game#onPlay called!');
    },

    onRender : function() {
      console.log('Game#onRender called!');
    },

    onUpdate : function() {
      console.log('Game#onUpdate called!');
    },

    pause : function() {
      this.paused = true;
      this.onPause();
    },

    play : function() {
      this.paused = false;
      this.onPlay();
    },

    render : function() {
      // Clears the canvas
      var ctx = this.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.onRender();

      var entities = this.entities;
      var length = entities.length;

      for (var i = 0; i < length; i++) {
          entities[i].render(ctx);
      }
    },

    update : function() {
      this.onUpdate();

      var entities = this.entities;
      var length = entities.length;

      for (var i = 0; i < length; i++) {
          entities[i].update(this);
      }
    }
  };

  return Game;
});
