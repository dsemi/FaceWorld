define(function(require) {
  var Ajax = require('utils/Ajax');
  
  var token, userId;
  
  return {
    setAuth : function(inUserId, inToken) {
      userId = inUserId;
      token = inToken;
    },
    
    getFriends : function(callback) {
      Ajax.post('fb/friends')
        .success(callback)
        .fail(console.log.bind(console, 'Friends request failed :('))
        .send(JSON.stringify({
          token : token,
          userId : userId
        }));
    },
  };
});