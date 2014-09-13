define(function(requires) {
  var ScriptLoader = function(onload) {
    this.onload = onload;
  };

  ScriptLoader.prototype = {
     load : function(src) {
         var script = document.createElement('script');
         script.onload = this.onload;
         script.setAttribute('src', src);
         document.body.appendChild(script);
     }
  };
    
  return ScriptLoader;
});