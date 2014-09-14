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
      game.manager.load('image', Urls.statusBubble);
    },

    render : function(game) {
      var stickImg = game.manager.get(Urls.basicStick);

      // Calculates drawing location
      var cam = game.camera,
          x = this.x - cam.x - stickImg.width / 2,
          y = this.y + cam.y - stickImg.height / 2;


      // Draws the base stick figure
      game.ctx.drawImage(stickImg, x, y);

      // Draws the profile picture face
      if (this.faceLoaded) {
        var faceImg = game.manager.get(this.faceUrl);
        game.ctx.drawImage(faceImg, x + (stickImg.width - faceImg.width) / 2, y + 5);
      }

      // Draws the friend's name
      game.ctx.fillText(this.name, x, y + stickImg.height + 25);

      // Statuses
      if (this.sayingStatus) {
        game.ctx.drawImage(game.manager.get(Urls.statusBubble), x, y - 70);
        game.ctx.fillText(this.message, x, y - 50);
      }
    },

    sayStatus : function() {
      var self = this;
      Requests.getStatuses(this.id, function(res) {
        self.message = JSON.parse(res).statuses.data[Math.floor(Math.random() * 5)].messages
            .replace(/(.{80})/g, function(v) { return v + '\r\n'; });
        self.sayingStatus = true;
      });
      setTimeout(function() {
        self.sayingStatus = false;
      }, 10000);
    },

    update : function(game) {
      if (!this.sayingStatus) {
        var dist = Math.sqrt(Math.pow(game.me.x - this.x, 2) + Math.pow(game.me.y - this.y, 2));
        if (dist < game.canvas.height / 2) {
          this.sayStatus();
        }
      }
    }
  };

  return Friend;
});

