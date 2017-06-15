'use strict';

module.exports = ['$q', '$log', '$window', '$http', 'authService', messageService];

function messageService($q, $log, $window, $http, authService){
  $log.debug('messageService');

  let service = {};

  service.createMsg = function(roomID, msgData){
    $log.debug('service.createMsg');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/msg/newmsg/${roomID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      console.log('MSG', msgData);
      return $http.post(url, msgData , config);
    })
    .then( res => {
      $log.log('created a message');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to create a message',err);
      return $q.reject(err);
    });
  };

  service.deleteMsg = function(roomID, msgID){
    $log.debug('service.createMsg');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/msg/newmsg/${roomID}/${msgID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        }
      };
      return $http.delete(url, config);
    })
    .then( res => {
      $log.log('created a message', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to create a message',err);
      return $q.reject(err);
    });
  };

  return service;
}