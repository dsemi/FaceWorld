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
        height = img.height;

    if (cam.x + game.canvas.width > 2*width) {
        cam.x = 2*width-game.canvas.width;
    }
    if (cam.x < -2*width) {
        cam.x = -2*width;
    }
    if (cam.y > 2*height) {
        cam.y = 2*height;
    }
    if (cam.y - game.canvas.height < -2*height) {
        cam.y = -2*height + game.canvas.height;
    }

    game.ctx.drawImage(img, (-cam.x - 2*width), (cam.y - 2*height));
    game.ctx.drawImage(img, (-cam.x - width), (cam.y - 2*height));
    game.ctx.drawImage(img, -cam.x, (cam.y - 2*height));
    game.ctx.drawImage(img, (-cam.x + width), (cam.y - 2*height));
    game.ctx.drawImage(img, (-cam.x - 2*width), (cam.y - height));
    game.ctx.drawImage(img, (-cam.x - width), (cam.y - height));
    game.ctx.drawImage(img, -cam.x, (cam.y - height));
    game.ctx.drawImage(img, (-cam.x + width), (cam.y - height));
    game.ctx.drawImage(img, (-cam.x - 2*width), cam.y);
    game.ctx.drawImage(img, (-cam.x - width), cam.y);
    game.ctx.drawImage(img, -cam.x, cam.y); 
    game.ctx.drawImage(img, (-cam.x + width), cam.y);
    game.ctx.drawImage(img, (-cam.x - 2*width), cam.y + height);
    game.ctx.drawImage(img, (-cam.x - width), cam.y + height);
    game.ctx.drawImage(img, -cam.x, cam.y + height); 
    game.ctx.drawImage(img, (-cam.x + width), cam.y + height);


  };

  game.start = function() {
      game.manager.load('image', Urls.grass).onload = function() {
        interval = setInterval(function() {
          game.update();
          game.render();
        }, GAME_SPEED);
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
  var mouseDown = false,
      px = 0,
      py = 0;

  game.canvas.addEventListener('mousedown', function(e) {
    px = e.clientX;
    py = e.clientY;
    mouseDown = true;
  });

  window.addEventListener('mouseup', function() {
    mouseDown = false;
  });

  window.addEventListener('mousemove', function(e) {
    if (mouseDown) {
      cam.x += px - e.clientX;
      cam.y += e.clientY - py;
    }

    px = e.clientX;
    py = e.clientY;
  });

  return game;
});
