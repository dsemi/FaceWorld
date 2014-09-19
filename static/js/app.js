/* globals requirejs, require */

require.config({
  shim : {
    'facebook' : {
      exports: 'FB'
    }
  },
  
   paths : {
    'baseUrl' : '/js',
    'facebook': '//connect.facebook.net/en_US/all'
   }
});

require(['game/FaceWorld', 'Requests', 'facebook'], function(FaceWorld, Requests) {
  var canvas = document.getElementById('game-canvas');
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;

  FB.init({
    appId      : '681230368635503',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.1' // use version 2.1
  });
  
  FB.getLoginStatus(statusChangeCallback);
  
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    if (response.status === 'connected') {
      document.getElementById('fb-login').style.display = 'none';
      Requests.setAuth(response.authResponse.userID, response.authResponse.accessToken);
      FaceWorld.start();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('fb-login').style.display = '';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('fb-login').style.display = '';
    }
  }
  
  window.checkFBLoginState = function() {
    FB.getLoginStatus(statusChangeCallback);
  };
});
