/* globals requirejs, require */

requirejs.config({
   paths : {
     'game' : '/static/js/game',
     'utils' : '/static/js/utils',
     'res' : '/static/res'
   }
});

require(['game/FaceWorld'], function(FaceWorld) {
  FaceWorld.start();
});
