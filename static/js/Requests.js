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
    }
  };
});
