define(['game/core/Game', 'game/core/AssetManager', 'utils/Urls', 'Requests', 'game/Friend'],
       function(Game, AssetManager, Urls, Requests, Friend) {
  var CANVAS_ID = 'game-canvas',
      game = new Game(CANVAS_ID), 
      interval;
  
  window.game = game;

  var GAME_SPEED = 33;

  var cam = game.camera = {
    x : 0,
    y : 0
  };

  game.onRender = function() {
    // Tile draw background
    var img = game.manager.get(Urls.grass),
        width = img.width,
        height = img.height,
        size = 4, // Number of imgs in one side of square, make an even number
        half = size / 2;

    if (cam.x + game.canvas.width > half*width) {
        cam.x = half*width-game.canvas.width;
    }
    if (cam.x < -half*width) {
        cam.x = -half*width;
    }
    if (cam.y > half*height) {
        cam.y = half*height;
    }
    if (cam.y - game.canvas.height < -half*height) {
        cam.y = -half*height + game.canvas.height;
    }

    for (var i=-half; i < half; i++) {
        for (var j=-half; j < half; j++) {
            game.ctx.drawImage(img, (-cam.x + j*width), (cam.y + i*height));
        }
    }
  };

  game.start = function() {
      game.manager.load('image', Urls.grass).onload = function() {
        interval = setInterval(function() {
          game.update();
          game.render();
        }, GAME_SPEED);
      };
    
    // A Friend for Myself
    var SPEED = 15;
    game.me = new Friend('me', 'Me');
    game.me.x = game.canvas.width / 2;
    game.me.y = game.canvas.height / 2;
    game.me.dest = {
      x : game.me.x,
      y : game.me.y
    };
    game.addEntity(game.me);

    game.me.update = function() {
      var me = game.me,
          dy = me.dest.y - me.y,
          dx = me.dest.x - me.x,
          dist = Math.sqrt(Math.pow(dy, 2) + Math.pow(dx, 2));

      if (dist > SPEED) {
        me.x += SPEED * dx / dist;
        me.y += SPEED * dy / dist;
      }

      cam.x = game.me.x - game.canvas.width / 2;
      cam.y = game.canvas.height / 2 - game.me.y;
    };

      Requests.getFriends(function(res) {
        JSON.parse(res).friends.forEach(function(data) {
          var friend = new Friend(data.id, data.name);
          game.addEntity(friend);
        });
      });
  };

  game.stop = function() {
    clearInterval(interval);
  };

  // World movement
  game.canvas.addEventListener('click', function(e) {
    game.me.dest = {
      x : cam.x + e.clientX,
      y : e.clientY - cam.y - 150
    };
  });

  return game;
});
