define(function(require) {
  var Ajax = require('utils/Ajax');
  
  var GRAPH_ENDPOINT = 'https://graph.facebook.com/v2.1/';
  
  var token, userId;
  
  return {
    setAuth : function(inUserId, inToken) {
      token = inToken;
      userId = inUserId;
    },
    
    getFriends : function(callback) {
      Ajax.get(GRAPH_ENDPOINT + 'me?fields=friends{name,gender}&access_token=' + token)
        .success(callback)
        .fail(console.log.bind(console, 'Friends request failed :('))
        .send();
    },

    getPicture : function(id, callback) {
       Ajax.get(GRAPH_ENDPOINT + id + '?fields=picture&access_token=' + token)
        .success(callback)
        .fail(console.log.bind(console, 'Picture request failed :('))
        .send();
    },

    getStatuses : function(id, callback) {
       Ajax.get(GRAPH_ENDPOINT + id + '?fields=statuses.limit(5)&access_token=' + token)
        .success(callback)
        .fail(console.log.bind(console, 'Posts request failed :('))
        .send();
    }
  };
});
