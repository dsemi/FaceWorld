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

    getFriends2 : function(callback) {
      Ajax.get('https://graph.facebook.com/v2.1/' + userId + '/friends?access_token=' + token + '&fields=name,id')
        .success(callback)
        .fail(console.log.bind(console, 'Friends request failed :('))
        .send();
    }
  };
});
