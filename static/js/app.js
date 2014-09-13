/* globals requirejs, require */

requirejs.config({
   paths : {
     'game' : '/static/js/game',
     'utils' : '/static/js/utils'
   }
});

require(['game/FaceWorld'], function(FaceWorld) {
  FaceWorld.start();
});
