/* globals requirejs, require */

require.config({
   paths : {
     '/' : '/static/js',
     'game' : '/static/js/game',
     'utils' : '/static/js/utils'
   }
});

require(['game/FaceWorld'], function(FaceWorld) {
  FaceWorld.start();
});
