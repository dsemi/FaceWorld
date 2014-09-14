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
      var self = this;
      // Loads the stick image
      game.manager.load('image', Urls.basicStick);
      // Loads the profile picture
      Requests.getPicture(this.id, function(res) {
        self.faceUrl = JSON.parse(res).picture.data.url;
        game.manager.load('image', self.faceUrl).onload = function() {
          self.faceLoaded = true;
        };
      });
    },

    render : function(game) {
      // Calculates drawing location
      var cam = game.camera,
          x = this.x - (cam.x - cam.deltawidth),
          y = this.y + cam.y - cam.deltaheight;

      // Draws the base stick figure
      game.ctx.drawImage(game.manager.get(Urls.basicStick), x, y);

      // Draws the profile picture face
      if (this.faceLoaded) {
        game.ctx.drawImage(game.manager.get(this.faceUrl), x, y);
      }

      // Draws the friend's name
      game.ctx.fillText(this.name, x, y);
    },

    update : function(game) {
    }
  };

  return Friend;
});
