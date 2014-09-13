/* globals define, console */

define(function(require) {
  var AssetManager = require('game/core/AssetManager');

  var Game = function(canvasId) {
    var self = this;
    this._entities = [];
    this._canvas = document.getElementById(canvasId);
    this._manager = new AssetManager(function() {
        self.onLoad();
    });
  };

  Game.prototype = {
    addEntity : function(entity) {
      this._entities.push(entity);
      entity.load(this._manager);
    },

    getCanvas : function() {
      return this.canvas;
    },

    setCanvas : function(canvas) {
      this.canvas = canvas;
    },

    getManager : function() {
      return this._manager;
    },

    getEntities : function() {
      return this._entities;
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
      this.canvas.clear();
      this.onRender();

      var entities = this.getEntities();
      var length = entities.length;

      for (var i = 0; i < length; i++) {
          entities[i].render(this.canvas.getContext());
      }
    },

    update : function() {
      this.onUpdate();

      var entities = this._entities;
      var length = entities.length;

      for (var i = 0; i < length; i++) {
          entities[i].update(this);
      }
    }
  };

  return Game;
})();
