/* globals define, soundManager, Image */

/**
 *  The AssetManager is a utility for loading and managing external assets
 *  such as images and sounds.  All loading is done asynchronously and execution
 *  relies on callbacks.  After an asset has been loaded once, it can be used as
 *  many times as needed.
 */
define(function(require) {
  var ScriptLoader = require('game/core/ScriptLoader');

  var AssetManager = function(onready) {
    this._assets = {};
    this.onready = onready;
    this._setupSoundManager();
  };

  AssetManager.prototype = {
    _setupSoundManager : function() {
      var manager = this;
      soundManager.setup({
          url : '/thirdparty/soundmanager2/swf/',

          onready : manager.onready ? manager.onready : function() {
              throw 'AssetManager should be used with an onready callback!';
          }
      });
    },

    /**
     *  Gets the asset with the given url.
     * @return {Object} The asset with the given url.  If the asset has
     * not started to be loaded, then it will return undefined.
     * If the asset is in progress of being loaded, then it will return the
     * asset, but functionality will not work until it has completed.
     */
    get : function(url) {
        return this._assets[url];
    },

    /**
     *  Loads a single asset.
     * @param {String} type The type of asset to load (image or sound).
     * @param {String} url The url that this assset can be retrieved from.
     * @return {Object} asset An asset that has not yet been loaded.
     * Attach an onload to know when loading is complete.
     */
    load : function(type, url) {
        if (arguments.length === 1) {
            var arg = arguments[0];
            type = arg.type;
            url = arg.url;
        }

        var asset = this._assets[url];

        if (asset === undefined) {
            if (type === 'image') {
                asset = this._loadImage(url);
            } else if (type === 'sound') {
                asset = this._loadSound(url);
            }
        }

        return asset;
    },

    _loadImage : function(url) {
        var image = this._assets[url] = new Image();

        image.addEventListener('error', function() {
            throw new Error('Unable to load image ' + url);
        });

        image.src = url;

        return image;
    },

    _loadSound : function(url) {
        var sound = this._assets[url] = soundManager.createSound({
            id : url,
            url : url,
            onload : function(e) {
                if (sound.onload) {
                  sound.onload(e);
                }
            }
        });

        soundManager.load(url);

        return sound;
    },

    /**
     * Removes references to all assets so that the garbage collector can
     * delete the memory used by the assets.  This is a temporary solution.
     */
    reset : function() {
        this._assets = [];
        this._loadingQueue = [];
    }
  };

  return AssetManager;
});
