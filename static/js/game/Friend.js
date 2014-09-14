define(function(require) {
  var Urls = require('utils/Urls'),
      Requests = require('Requests');

  var Friend = function(id, name) {
    this.name = name;
    this.id = id;
    this.x = Math.random() * 2000 - 1000;
    this.y = Math.random() * 2000 - 1000;
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
          x = this.x - cam.x,
          y = this.y + cam.y;

      // Draws the base stick figure
      var stickImg = game.manager.get(Urls.basicStick);
      game.ctx.drawImage(stickImg, x, y);

      // Draws the profile picture face
      if (this.faceLoaded) {
        var faceImg = game.manager.get(this.faceUrl);
        game.ctx.drawImage(faceImg, x + (stickImg.width - faceImg.width) / 2, y + 5);
      }

      // Draws the friend's name
      game.ctx.fillText(this.name, x, y + stickImg.height + 25);
    },

    update : function(game) {
    }
  };

  return Friend;
});

