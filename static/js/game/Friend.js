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

    render : function(ctx) {
      ctx.drawImage(game.manager.get(Urls.basicStick), this.x, this.y);
      ctx.fillText(this.name, this.x, this.y);
    }
  };

  return Friend;
});
