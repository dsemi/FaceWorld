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
        .success(callback)
        .fail(console.log.bind(console, 'Friends request failed :('))
        .send({
          token : token,
          userId : userId
        });
    },
  };
});