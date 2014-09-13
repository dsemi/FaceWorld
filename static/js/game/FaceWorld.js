define(['game/core/Game', 'game/core/AssetManager'], function(Game, AssetManager) {
  var bearUrl = 'http://www.adfg.alaska.gov/static/species/speciesinfo/blackbear/images/blackbear.jpg';
  
  var CANVAS_ID = 'game-canvas',
      faceworld = new Game(CANVAS_ID), 
      interval;
  
  faceworld.onRender = function() {
    faceworld.ctx.drawImage(faceworld.manager.get('bear'), 0, 0);
  };

  return {
    start : function() {
      faceworld.manager.load('bear', 'image', bearUrl).onload = function() {
        interval = setInterval(function() {
          faceworld.update();
          faceworld.render();
        }, 33);
      };
    },
    
    stop : function() {
      clearInterval(interval);
    }
  };
});
