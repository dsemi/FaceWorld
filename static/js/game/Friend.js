define(function(require) {
  var Urls = require('utils/Urls'),
      Requests = require('Requests');

  var Friend = function(id, name) {
    this.name = name;
    this.id = id;
    this.x = this.y = 0;
  };

  Friend.prototype = {
    load : function(game) {
      game.manager.load('image', Urls.basicStick);
      Requests.getPicture(this.id, function(res) {
        this.url = res.picture.data.url;
        game.manager.load('image', res.picture.data.url);
      });
    },

    render : function(game) {
      var cam = game.camera,
          x = this.x - cam.x,
          y = this.y - cam.y;
      game.ctx.drawImage(game.manager.get(Urls.basicStick), x, y);
      game.ctx.drawImage(game.manager.get(this.url), x, y);
      game.ctx.fillText(this.name, x, y);
    },

    update : function(game) {
    }
  };

  return Friend;
});
