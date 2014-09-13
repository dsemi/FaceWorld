define(function(requires) {
  var Game = requires('game/core/Game'),
      faceworld = new Game(canvasId);

  var CANVAS_ID = 'game-canvas';

  var interval;

  return {
    start : function() {
      faceworld.play();
      interval = setInterval(function() {
        faceworld.update();
        faceworld.render();
      }, 100 / 3);
    },

    stop : function() {
      clearInterval(interval);
    }
  };
});
