define(['game/core/Game', 'game/core/AssetManager', 'utils/Urls', 'Requests', 'game/Friend', 'utils/Xmath'],
       function(Game, AssetManager, Urls, Requests, Friend, Xmath) {

  var CANVAS_ID = 'game-canvas',
      GAME_SPEED = 33;
  
  window.game = new Game(CANVAS_ID);

  var mouseIsDown = false,
      interval = 0,
      cam = game.camera = { x : 0, y : 0 },
      mouse = game.mouse = {x : 0, y : 0},
      room = { width : 5000, height : 5000 };

  game.start = function() {
      var count = 0;

      game.manager.load('image', Urls.marker).onload = imageLoadHandler;
      game.manager.load('image', Urls.tileFloor).onload = imageLoadHandler;

      function imageLoadHandler() {
        if (count < 1) {
          count++;
          return;
        }

        // Start execution interval
        interval = setInterval(function() {
          game.update();
          game.render();
        }, GAME_SPEED);
      }
    
    // A Friend for Myself
    var SPEED = 15;
    game.me = new Friend({
      name : 'Me',
      id : 'me'
    });
    game.me.x = game.canvas.width / 2;
    game.me.y = game.canvas.height / 2;
    game.me.dest = { x : game.me.x, y : game.me.y };
    game.me.update = function() {
      var me = game.me,
          dx = me.dest.x - me.x,
          dy = me.dest.y - me.y,
          dist = Xmath.dist(me.dest.x, me.dest.y, me.x, me.y);
      
      if (dist > SPEED) {
        me.x += SPEED * dx / dist;
        me.y += SPEED * dy / dist;
      } else {
        me.dest.x = me.x;
        me.dest.y = me.y;
      }

      cam.x = game.me.x - game.canvas.width / 2;
      cam.y = game.me.y - game.canvas.height / 2;
    };
    
    game.addEntity(game.me);

    Requests.getFriends(function(res) {
      JSON.parse(res).friends.data.forEach(function(info) {
        var friend = new Friend(info);
        game.addEntity(friend);
      });
    });
  };

  game.stop = function() {
    clearInterval(interval);
  };
  
  game.onRender = function() {
    // Tile draw background
    var img = game.manager.get(Urls.tileFloor),
        imgWidth = img.width,
        imgHeight = img.height,
        screenXBound = cam.x + game.canvas.width,
        screenYBound = cam.y + game.canvas.height,
        da = img.height / game.canvas.height * 2;

    game.ctx.save();
    for (var x = Math.floor(cam.x / imgWidth) * imgWidth; x < screenXBound; x += imgWidth) {
      game.ctx.globalAlpha = 0.25;
      for (var y = Math.floor(cam.y / imgHeight) * imgHeight; y < screenYBound; y += imgHeight) {
          game.ctx.drawImage(img, x - cam.x, y - cam.y);
          game.ctx.globalAlpha += da;
      }
    }
    game.ctx.restore();
  };

  game.onUpdate = function() {
    // Updates the position of the player
    if (mouseIsDown) {
      game.me.dest = {
        x : cam.x + mouse.x,
        y : cam.y + mouse.y
      };
    }
  };

  // World movement
  game.canvas.addEventListener('mousedown', function(e) {
    mouseIsDown = true;
  });

  game.canvas.addEventListener('mouseup', function(e) {
    mouseIsDown = false;
  });

  // Update the mouse position
  document.addEventListener('mousemove', function(e){
      mouse.x = e.clientX || e.pageX;
      mouse.y = e.clientY || e.pageY;
  }, false);

  return game;
});