define(['game/core/Game', 'game/core/AssetManager', 'utils/Urls'], function(Game, AssetManager, Urls) {
  var CANVAS_ID = 'game-canvas',
      faceworld = new Game(CANVAS_ID), 
      interval;
  
  var GAME_SPEED = 33;

  var cam = faceworld.camera = {
    x : 0,
    y : 0
  };

  faceworld.onRender = function() {
    // Tile draw background
    var img = faceworld.manager.get(Urls.grass),
        width = img.width,
        height = img.height;


    while (cam.x+faceworld.canvas.width > width) {
        cam.x -= width;
    }
    while (cam.x < -width) {
        cam.x += width;
    }
    while (cam.y > height) {
        cam.y -= height;
    }
    while (cam.y - faceworld.canvas.height < -height) {
        cam.y += height;
    }

    faceworld.ctx.drawImage(img, (-cam.x - width), cam.y);
    faceworld.ctx.drawImage(img, (-cam.x - width), (cam.y - height));
    faceworld.ctx.drawImage(img, -cam.x, cam.y);
    faceworld.ctx.drawImage(img, -cam.x, (cam.y - height));

//    var canvas = faceworld.canvas;
//    for (var x = -cam.x % img.width; x <= cam.x + canvas.width; x += img.width) {
//      for (var y = -cam.y % img.height; y <= cam.y + canvas.height; y += img.height) {
//        faceworld.ctx.drawImage(img, x, y);
//      }
//    }
  };

  faceworld.start = function() {
      faceworld.manager.load('image', Urls.grass).onload = function() {
        interval = setInterval(function() {
          faceworld.update();
          faceworld.render();
        }, GAME_SPEED);
      };
    };
    
    faceworld.stop = function() {
      clearInterval(interval);
    };


  // World movement
  var mouseDown = false,
      px = 0,
      py = 0;

  faceworld.canvas.addEventListener('mousedown', function(e) {
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

      console.log('x = ' + cam.x);
      console.log(cam.y);
    }

    px = e.clientX;
    py = e.clientY;
  });

  return faceworld;
});
