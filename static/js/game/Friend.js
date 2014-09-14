define(function(require) {
  var Urls = require('utils/Urls');

  var Friend = function(id, name) {
    this.name = name;
    this.id = id;
    this.x = this.y = 0;
  };

  Friend.prototype = {
    load : function(game) {
      game.manager.load('image', Urls.basicStick);
    },

    render : function(game) {
      var cam = game.camera,
          x = this.x - (cam.x - cam.deltawidth),
          y = this.y + cam.y - cam.deltaheight;
      game.ctx.drawImage(game.manager.get(Urls.basicStick), x, y);
      game.ctx.fillText(this.name, x, y);
    },

    update : function(game) {
    }
  };

  return Friend;
});
