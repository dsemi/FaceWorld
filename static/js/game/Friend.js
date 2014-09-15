define(function(require) {
  var Urls = require('utils/Urls'),
      Requests = require('Requests'),
      Xmath = require('utils/Xmath');

  var Friend = function(id, name) {
    this.name = name;
    this.id = id;
    this.x = Math.random() * 2000 - 1000;
    this.y = Math.random() * 2000 - 1000;
    this.canSayNewStatus = true;
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
        drawMultilineText(this.message, x, y - 50);
      }
    },

    sayStatus : function() {
      var self = this;
      this.canSayNewStatus = false;

      // Retrieves the status
      Requests.getStatuses(this.id, function(res) {
        self.sayingStatus = true;
        self.message = JSON.parse(res).statuses.data[Math.floor(Math.random() * 5)].message;
        meSpeak.speak(self.message);
      });

      setTimeout(function() {
        self.sayingStatus = false;
        setTimeout(function() {
          self.canSayNewStatus = true;
        }, 5000);
      }, 10000);
    },

    update : function(game) {
      if (this.canSayNewStatus) {
        if (Xmath.dist(game.me.x, game.me.y, this.x, this.y) < game.canvas.height / 2) {
          this.sayStatus();
        }
      }
    }
  };

  function drawMultilineText(text, x, y) {
      var textvalArr = toMultiLine(text);
      var linespacing = 15;

      // draw each line on canvas.
      for(var i = 0; i < textvalArr.length; i++){
          game.ctx.fillText(textvalArr[i], x + 15, y - 5);
          y += linespacing;
      }
  }

  // Creates an array where the <br/> tag splits the values.
  function toMultiLine(text) {
     var textArr = [];
     text = text.replace(/(.{40})/g, function(v) {return v + '<br/>';});
     textArr = text.split("<br/>");
     return textArr;
  }

  return Friend;
});

