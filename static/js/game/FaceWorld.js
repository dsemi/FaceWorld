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

    cam.deltawidth = 0;
    cam.deltaheight = 0;

    while (cam.x+game.canvas.width > width) {
        cam.x -= width;
        cam.deltawidth = -width;
    }
    while (cam.x < -width) {
        cam.x += width;
        cam.deltawidth = width;
    }
    while (cam.y > height) {
        cam.y -= height;
        cam.deltaheight = -height;
    }
    while (cam.y - game.canvas.height < -height) {
        cam.y += height;
        cam.deltaheight = height;
    }

    game.ctx.drawImage(img, (-cam.x - width), cam.y);
    game.ctx.drawImage(img, (-cam.x - width), (cam.y - height));
    game.ctx.drawImage(img, -cam.x, cam.y);
    game.ctx.drawImage(img, -cam.x, (cam.y - height));

//    var canvas = game.canvas;
//    for (var x = -cam.x % img.width; x <= cam.x + canvas.width; x += img.width) {
//      for (var y = -cam.y % img.height; y <= cam.y + canvas.height; y += img.height) {
//        game.ctx.drawImage(img, x, y);
//      }
//    }
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
          friend.x = Math.random() * 1000;
          friend.y = Math.random() * 1000;
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
