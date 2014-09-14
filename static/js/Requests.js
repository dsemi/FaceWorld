define(function(require) {
  var Ajax = require('utils/Ajax');
  
  var token, userId;
  
  return {
    setAuth : function(inUserId, inToken) {
      token = inToken;
      userId = inUserId;
    },
    
    getFriends : function(callback) {
      Ajax.post('fb/friends')
        .setHeader('Content-Type', 'application/json')
        .success(callback)
        .fail(console.log.bind(console, 'Friends request failed :('))
        .send(JSON.stringify({
          token : token,
          userId : userId
        }));
    },

    getPicture : function(id, callback) {
       Ajax.get('https://graph.facebook.com/v2.1/' + id + '?fields=picture&access_token=' + token)
        .success(callback)
        .fail(console.log.bind(console, 'Picture request failed :('))
        .send();
    },

    getPosts : function(id, callback) {
       Ajax.get('https://graph.facebook.com/v2.1/' + id + '/posts?limit=(5)&access_token=' + token)
        .success(callback)
        .fail(console.log.bind(console, 'Posts request failed :('))
        .send();
    }
  };
});
